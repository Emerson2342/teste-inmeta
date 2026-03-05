import { ApiResponse, SynIncrementalResponse } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { BASE_URL } from "@src/utils/const";
import { useSyncStore } from "../stores/syncStore";

export const syncWorkOrdersService = async (): Promise<
  ApiResponse<string | SynIncrementalResponse>
> => {
  const { lastSyncAt, setLastSync } = useSyncStore.getState();
  const { workOrders, addWorkOrderFromAPI } = useWorkOrderStore.getState();

  if (lastSyncAt) {
    const response = await fetch(
      `${BASE_URL}/work-orders/sync?since=${lastSyncAt}`,
    );

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
      const exists = workOrders.find((o) => o.serverId === c.id);
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

    console.log("Sync incremental", JSON.stringify(data, null, 2));
    return {
      message: "Sync incremental realizado com sucesso",
      status: response.status,
      success: response.ok,
      data: data,
    };
  } else {
    await setLastSync(new Date().toISOString());
    return {
      message: "Primeira entrada no aplicativo!",
      status: 400,
      success: false,
      data: undefined,
    };
  }
};
