import {
  syncPendingOrders,
  syncWorkOrdersService,
} from "@src/services/syncWorkOrdersService";
import { useSyncStore } from "@src/stores/syncStore";

let isSyncing = false;

export const runSync = async () => {
  const { lastSyncAt, loadLastSync } = useSyncStore.getState();
  if (isSyncing) {
    return;
  }

  try {
    isSyncing = true;
    if (!lastSyncAt) {
      await loadLastSync();
    }

    await syncWorkOrdersService();
    await syncPendingOrders();
  } catch (e) {
    console.log("Erro no sync", e);
  } finally {
    isSyncing = false;
  }
};
