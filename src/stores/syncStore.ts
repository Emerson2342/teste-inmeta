import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type SyncState = {
  lastSyncAt: string | null;
  loadLastSync: () => Promise<void>;
  setLastSync: (date: string) => Promise<void>;
  resetLastSync: () => Promise<void>;
};

export const useSyncStore = create<SyncState>((set) => ({
  lastSyncAt: null,

  resetLastSync: async () => {
    await AsyncStorage.removeItem("lastSyncAt");
  },

  loadLastSync: async () => {
    const stored = await AsyncStorage.getItem("lastSyncAt");

    if (stored) {
      set({ lastSyncAt: stored });
    }
  },

  setLastSync: async (date: string) => {
    await AsyncStorage.setItem("lastSyncAt", date);

    set({
      lastSyncAt: date,
    });
  },
}));
