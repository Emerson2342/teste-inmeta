import NetInfo from "@react-native-community/netinfo";
import {
  syncPendingOrders,
  syncWorkOrdersService,
} from "@src/services/syncWorkOrders";
import { useEffect } from "react";

let isSyncing = false;

export function useNetworkSync() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        if (isSyncing) return;
        isSyncing = true;
        try {
          await syncPendingOrders();
          await syncWorkOrdersService();
        } catch (e) {
          console.log("Erro ao sincronizar", e);
        } finally {
          isSyncing = false;
        }
      }
    });
    return () => unsubscribe();
  }, []);
}
