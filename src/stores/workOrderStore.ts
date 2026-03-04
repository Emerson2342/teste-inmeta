import { NewOrderType, UpdateOrderProps, WorkOrder } from "@src/props/types";
import uuid from "react-native-uuid";
import { UpdateMode } from "realm";
import { create } from "zustand";
import { realm } from "../database/realm";

type WorkOrderState = {
  workOrders: WorkOrder[];
  loadFromRealm: () => void;
  addWorkOrder: (data: AddWorkOrderData) => void;
  updateWorkOrder: (order: UpdateOrderProps) => void;
  deleteWorkOrder: (id: string) => void;
  getOrder: (id: string) => WorkOrder | null;
};

type AddWorkOrderData = Pick<WorkOrder, keyof NewOrderType>;

export const useWorkOrderStore = create<WorkOrderState>((set) => ({
  workOrders: [],

  loadFromRealm: () => {
    const orders = realm.objects<WorkOrder>("WorkOrder");
    set({ workOrders: [...orders] });
  },

  addWorkOrder: (data: AddWorkOrderData) => {
    const now = new Date().toISOString();
    const newId = uuid.v4() as string;
    const newOrder: WorkOrder = {
      _id: newId,
      createdAt: now,
      updatedAt: now,
      status: "Pending",
      completed: false,
      deleted: false,
      deletedAt: undefined,
      ...data,
    };

    realm.write(() => {
      realm.create("WorkOrder", newOrder);
    });

    set((state) => ({
      workOrders: [...state.workOrders, newOrder],
    }));
  },

  updateWorkOrder: (updatedOrder: Partial<WorkOrder> & { _id: string }) => {
    realm.write(() => {
      realm.create("WorkOrder", updatedOrder, UpdateMode.Modified);
    });

    set((state) => ({
      workOrders: state.workOrders.map((order) =>
        order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order,
      ),
    }));
  },

  deleteWorkOrder: (id) => {
    const now = new Date().toISOString();
    realm.write(() => {
      const order = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id);
      if (order) {
        order.deleted = true;
        order.deletedAt = now;
        order.updatedAt = now;
      }
    });

    set((state) => ({
      workOrders: state.workOrders.filter((order) => order._id !== id),
    }));
  },
  getOrder: (id: string): WorkOrder | null => {
    try {
      const order = realm.objectForPrimaryKey<WorkOrder>("WorkOrder", id);
      if (!order) return null;

      return {
        _id: order._id,
        title: order.title,
        description: order.description,
        status: order.status,
        deleted: order.deleted,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        assignedTo: order.assignedTo,
        completed: false,
      };
    } catch (err) {
      console.error("Erro ao buscar Order:", err);
      return null;
    }
  },
}));
