import {
  createWorkOrder,
  fetchWorkOrdersSync,
  updateWorkOrderAPI,
} from "@src/api/workOrdersApi";
import { realm } from "@src/database/realm";
import {
  ApiResponse,
  SynIncrementalResponse,
  UpdateOrderApi,
  WorkOrder,
} from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { useSyncStore } from "../stores/syncStore";

export const syncWorkOrdersService = async (): Promise<
  ApiResponse<SynIncrementalResponse>
> => {
  const { lastSyncAt, setLastSync } = useSyncStore.getState();
  const {
    addWorkOrderFromAPI,
    deleteWorkOrderFromAPI,
    updateWorkerOrderFromAPi,
    updateWorkOrderOnServer,
  } = useWorkOrderStore.getState();

  if (!lastSyncAt) {
    return {
      message: "Primeira entrada no aplicativo!",
      status: 400,
      success: false,
    };
  }

  const res = await fetchWorkOrdersSync(lastSyncAt);
  if (!res.success || !res.data) {
    return res;
  }

  const data = res.data;

  for (const c of data.created) {
    const local = realm
      .objects<WorkOrder>("WorkOrder")
      .filtered("serverId == $0", c.id)[0];
    if (local) continue;

    const pendingLocal = realm
      .objects<WorkOrder>("WorkOrder")
      .filtered("pendingSync == true AND title == $0", c.title)[0];

    if (pendingLocal) {
      realm.write(() => {
        pendingLocal.serverId = c.id;
        pendingLocal.pendingSync = false;
      });
      continue;
    }

    addWorkOrderFromAPI({
      localId: c.id,
      serverId: c.id,
      title: c.title,
      description: c.description,
      assignedTo: c.assignedTo,
      status: c.status,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
      completed: c.completed,
      deleted: c.deleted,
      pendingSync: false,
      localDeleted: false,
    });
  }

  for (const ord of data.updated) {
    const local = realm
      .objects<WorkOrder>("WorkOrder")
      .filtered("serverId == $0", ord.id)[0];
    if (!local) continue;

    const serverTime = new Date(ord.updatedAt).getTime();
    const localTime = new Date(local.updatedAt).getTime();

    if (serverTime > localTime) {
      updateWorkerOrderFromAPi({ localId: local.localId, ...ord });
      realm.write(() => {
        local.pendingSync = false;
      });
    }
  }

  for (const id of data.deleted) {
    const order = realm
      .objects<WorkOrder>("WorkOrder")
      .filtered("serverId == $0", id)[0];
    if (order) {
      deleteWorkOrderFromAPI(order.localId);
    }
  }

  await setLastSync(new Date().toISOString());
  useWorkOrderStore.getState().loadFromRealm();

  return {
    status: res.status,
    data: data,
    success: res.success,
  };
};

export const syncPendingOrders = async () => {
  const pendingOrders = realm
    .objects<WorkOrder>("WorkOrder")
    .filtered("pendingSync == true");

  for (const order of pendingOrders) {
    if (!order.serverId) {
      const res = await createWorkOrder(order);
      if (res.success && res.data) {
        realm.write(() => {
          order.serverId = res.data?.id;
          order.pendingSync = false;
          order.createdAt = res.data?.createdAt ?? order.createdAt;
          order.updatedAt =
            res.data?.updatedAt ?? res.data?.createdAt ?? order.updatedAt;
        });
      }
    } else {
      const payload: UpdateOrderApi = {
        title: order.title,
        description: order.description,
        status: order.status,
        assignedTo: order.assignedTo,
      };
      const res = await updateWorkOrderAPI(payload, order.serverId);

      if (res.success && res.data) {
        realm.write(() => {
          order.pendingSync = false;
          order.updatedAt = res.data?.updatedAt ?? order.updatedAt;
        });
      }
    }
  }
  useWorkOrderStore.getState().loadFromRealm();
};
