import NetInfo from "@react-native-community/netinfo";
import {
  syncPendingOrders,
  syncWorkOrdersService,
} from "@src/services/syncWorkOrders";
import { useEffect, useState } from "react";

export function useNetworkSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      console.log("Is connected? " + state.isConnected);
      if (state.isConnected && !isSyncing) {
        setIsSyncing(true);
        try {
          await syncPendingOrders();
          await syncWorkOrdersService();
        } catch (e) {
          console.log("Erro ao sincronizar", e);
        } finally {
          setIsSyncing(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);
}
