import { createWorkOrder, updateWorkOrderAPI } from "@src/api/workOrdersApi";
import { realm } from "@src/database/realm";
import {
  ApiResponse,
  SynIncrementalResponse,
  UpdateOrderApi,
  WorkOrder,
} from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { BASE_URL } from "@src/utils/const";
import { useSyncStore } from "../stores/syncStore";

export const syncWorkOrdersService = async (): Promise<
  ApiResponse<string | SynIncrementalResponse>
> => {
  const { lastSyncAt, setLastSync } = useSyncStore.getState();
  const {
    addWorkOrderFromAPI,
    deleteWorkOrderFromAPI,
    updateWorkerOrderFromAPi,
    updateWorkOrderOnServer,
  } = useWorkOrderStore.getState();

  if (lastSyncAt) {
    let response: Response;

    try {
      response = await fetch(
        `${BASE_URL}/work-orders/sync?since=${lastSyncAt}`,
      );
    } catch (error) {
      console.log("Erro de rede no sync:", error);

      return {
        message: "Erro de conexão durante o sync",
        status: 0,
        success: false,
        data: undefined,
      };
    }

    if (!response.ok) {
      return {
        message: "Erro ao buscar os dados da API",
        status: response.status,
        success: false,
        data: undefined,
      };
    }

    if (!response.ok) {
      return {
        message: "Erro ao buscar os dados da API",
        status: response.status,
        success: response.ok,
        data: undefined,
      };
    }
    const data = (await response.json()) as SynIncrementalResponse;
    for (const c of data.created) {
      const exists = realm
        .objects<WorkOrder>("WorkOrder")
        .filtered("serverId == $0", c.id)[0];
      if (!exists) {
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
      } else if (localTime > serverTime) {
        updateWorkOrderOnServer({
          assignedTo: local.assignedTo,
          description: local.description,
          localId: local.localId,
          status: local.status,
          title: local.title,
          pendingSync: false,
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

    console.log("Sync incremental", JSON.stringify(data, null, 2));
    await setLastSync(new Date().toISOString());
    return {
      message: "Sync incremental realizado com sucesso",
      status: response.status,
      success: response.ok,
      data: data,
    };
  } else {
    return {
      message: "Primeira entrada no aplicativo!",
      status: 400,
      success: false,
      data: undefined,
    };
  }
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
          order.updatedAt = res.data?.updatedAt ?? order.updatedAt;
          order.createdAt = res.data?.createdAt ?? order.createdAt;
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
};
