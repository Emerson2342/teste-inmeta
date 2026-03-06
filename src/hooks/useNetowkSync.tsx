import NetInfo from "@react-native-community/netinfo";
import {
  syncPendingOrders,
  syncWorkOrdersService,
} from "@src/services/syncWorkOrdersService";
import { useEffect, useRef } from "react";

export function useNetworkSync() {
  const isSyncing = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        if (isSyncing.current) return;
        isSyncing.current = true;
        try {
          await syncPendingOrders();
          await syncWorkOrdersService();
        } catch (e) {
          console.log("Erro ao sincronizar", e);
        } finally {
          isSyncing.current = false;
        }
      }
    });
    return () => unsubscribe();
  }, []);
}
