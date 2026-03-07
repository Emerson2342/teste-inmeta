import NetInfo from "@react-native-community/netinfo";
import { runSync } from "@src/utils/RunSync";
import { useEffect } from "react";

export function useNetworkSync() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && state.isInternetReachable) {
        runSync();
      }
    });

    return () => unsubscribe();
  }, []);
}
