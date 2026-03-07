import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type SyncState = {
  lastSyncAt: string | null;
  isLoaded: boolean;
  loadLastSync: () => Promise<void>;
  setLastSync: (date: string) => Promise<void>;
  resetLastSync: () => Promise<void>;
};

export const useSyncStore = create<SyncState>((set) => ({
  lastSyncAt: null,
  isLoaded: false,

  resetLastSync: async () => {
    await AsyncStorage.removeItem("lastSyncAt");
  },

  loadLastSync: async () => {
    const stored = await AsyncStorage.getItem("lastSyncAt");

    set({
      lastSyncAt: stored,
      isLoaded: true,
    });
  },

  setLastSync: async (date: string) => {
    await AsyncStorage.setItem("lastSyncAt", date);

    set({
      lastSyncAt: date,
    });
  },
}));
