import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createWorkOrder,
  deleteWorkOrder,
  updateWorkOrderAPI,
} from "@src/api/workOrdersApi";
import {
  NewOrderType,
  UpdateOrderApi,
  UpdateOrderProps,
  WorkOrder,
} from "@src/props/types";
import { BASE_URL } from "@src/utils/const";
import uuid from "react-native-uuid";
import { UpdateMode } from "realm";
import { create } from "zustand";
import { realm } from "../database/realm";

type WorkOrderState = {
  workOrders: WorkOrder[];
  initialSync: () => Promise<void>;
  loadFromRealm: () => void;
  addWorkOrder: (data: AddWorkOrderData) => void;
  updateWorkOrder: (order: UpdateOrderProps) => void;
  deleteWorkOrder: (id: string) => void;
  getOrder: (id: string) => WorkOrder | null;
};

type AddWorkOrderData = Pick<WorkOrder, keyof NewOrderType>;

export const useWorkOrderStore = create<WorkOrderState>((set, get) => ({
  workOrders: [],

  initialSync: async () => {
    const lastSyncAt = await AsyncStorage.getItem("lastSyncAt");

    if (!lastSyncAt) {
      const response = await fetch(`${BASE_URL}/work-orders`);

      if (response.ok) {
        const data = await response.json();
        realm.write(() => {
          data.forEach((order: any) => {
            const mappedOrder: WorkOrder = {
              localId: order.id,
              serverId: order.id,
              title: order.title,
              description: order.description,
              assignedTo: order.assignedTo,
              status: order.status,
              createdAt: order.createdAt,
              updatedAt: order.updatedAt,
              completed: order.completed,
              deleted: order.deleted,
              deletedAt: undefined,
              pendingSync: false,
              localDeleted: false,
            };

            realm.create("WorkOrder", mappedOrder);
          });
        });
        const orders = realm.objects<WorkOrder>("WorkOrder");
        set({ workOrders: [...orders] });

        await AsyncStorage.setItem("lastSyncAt", new Date().toISOString());
      }
    }
  },

  loadFromRealm: () => {
    const orders = realm.objects<WorkOrder>("WorkOrder");
    set({ workOrders: [...orders] });
  },

  addWorkOrder: async (data: AddWorkOrderData) => {
    const now = new Date().toISOString();
    const newId = uuid.v4() as string;
    const newOrder: WorkOrder = {
      localId: newId,
      serverId: undefined,
      createdAt: now,
      updatedAt: now,
      status: "Pending",
      completed: false,
      deleted: false,
      deletedAt: undefined,
      pendingSync: true,
      localDeleted: false,
      ...data,
    };

    realm.write(() => {
      realm.create("WorkOrder", newOrder);
    });

    set((state) => ({
      workOrders: [...state.workOrders, newOrder],
    }));

    try {
      const createOrder = await createWorkOrder(newOrder);
      get().updateWorkOrder({
        localId: newId,
        serverId: createOrder.id,
        assignedTo: createOrder.assignedTo,
        description: createOrder.description,
        status: createOrder.status,
        title: createOrder.title,
        pendingSync: false,
      });
    } catch (error: any) {
      console.log("Não foi possível fazer o sync POST");
    }
  },

  updateWorkOrder: async (
    updatedOrder: Partial<WorkOrder> & { localId: string },
  ) => {
    realm.write(() => {
      realm.create("WorkOrder", updatedOrder, UpdateMode.Modified);
    });

    set((state) => ({
      workOrders: state.workOrders.map((order) =>
        order.localId === updatedOrder.localId
          ? { ...order, ...updatedOrder }
          : order,
      ),
    }));
    try {
      const fullOrder = realm.objectForPrimaryKey<WorkOrder>(
        "WorkOrder",
        updatedOrder.localId,
      );
      if (!fullOrder) throw new Error("Ordem não encontrada no Realm");
      const payload: UpdateOrderApi = {
        title: fullOrder.title,
        description: fullOrder.description,
        status: fullOrder.status,
        assignedTo: fullOrder.assignedTo,
      };

      const apiResponse = await updateWorkOrderAPI(payload, fullOrder.serverId);

      set((state) => ({
        workOrders: state.workOrders.map((order) =>
          order.localId === fullOrder.localId
            ? {
                ...order,
                serverId: apiResponse.id,
                assignedTo: apiResponse.assignedTo,
                description: apiResponse.description,
                status: apiResponse.status,
                title: apiResponse.title,
                pendingSync: false,
              }
            : order,
        ),
      }));
    } catch (error: any) {
      console.log("Não foi possível fazer o sync PUT", error);
    }
  },

  deleteWorkOrder: async (id) => {
    const now = new Date().toISOString();
    try {
      const fullOrder = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id);
      if (!fullOrder) throw new Error("Ordem não encontrada no Realm");

      await deleteWorkOrder(fullOrder.serverId);

      realm.write(() => {
        const order = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id);
        if (order) {
          order.localDeleted = true;
          order.deletedAt = now;
          order.updatedAt = now;
          order.pendingSync = false;
        }
      });

      set((state) => ({
        workOrders: state.workOrders.filter((order) => order.localId !== id),
      }));
    } catch (error: any) {
      console.log("Não foi possível fazer o sync DELETE", error);
    }
  },
  getOrder: (id: string): WorkOrder | null => {
    try {
      const order = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id);
      if (!order) return null;

      return {
        localId: order.localId,
        serverId: order?.serverId,
        title: order.title,
        description: order.description,
        status: order.status,
        deleted: order.deleted,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        assignedTo: order.assignedTo,
        pendingSync: order.pendingSync,
        completed: order.completed,
        localDeleted: false,
      };
    } catch (err) {
      console.error("Erro ao buscar Order:", err);
      return null;
    }
  },
}));
