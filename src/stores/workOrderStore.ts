import { WorkOrder } from "@src/props/types";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { realm } from "../database/realm";

type WorkOrderState = {
  workOrders: WorkOrder[];

  loadFromRealm: () => void;
  addWorkOrder: (
    data: Omit<WorkOrder, "id" | "createdAt" | "updatedAt">,
  ) => void;
  updateWorkOrder: (order: WorkOrder) => void;
  deleteWorkOrder: (id: string) => void;
};

export const useWorkOrderStore = create<WorkOrderState>((set) => ({
  workOrders: [],

  loadFromRealm: () => {
    const orders = realm.objects<WorkOrder>("WorkOrder");
    set({ workOrders: [...orders] });
  },

  addWorkOrder: (data) => {
    const now = new Date().toISOString();

    const newOrder: WorkOrder = {
      id: uuid(),
      createdAt: now,
      updatedAt: now,
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

  updateWorkOrder: (updatedOrder) => {
    realm.write(() => {
      realm.create("WorkOrder", updatedOrder, Realm.UpdateMode.Modified);
    });

    set((state) => ({
      workOrders: state.workOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order,
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
      workOrders: state.workOrders.filter((order) => order.id !== id),
    }));
  },
}));
