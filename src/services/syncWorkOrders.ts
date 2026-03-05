import { BASE_URL } from "@src/utils/const";
import { useSyncStore } from "../stores/syncStore";

export const syncWorkOrders = async () => {
  const { lastSyncAt, setLastSync } = useSyncStore.getState();

  if (lastSyncAt) {
    const response = await fetch(
      `${BASE_URL}/work-orders/sync?since=${lastSyncAt}`,
    );

    const data = await response.json();

    console.log("Sync incremental", JSON.stringify(data, null, 2));
  }

  await setLastSync(new Date().toISOString());
};
