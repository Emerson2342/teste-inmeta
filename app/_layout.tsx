import { realm } from "@src/database/realm";
import { WorkOrder } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { Palette } from "@src/theme/colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const setWorkOrders = useWorkOrderStore((state) => state.setWorkOrders);
  const [fontsLoaded] = useFonts({
    "QuickSand-Regular": require("../src/fonts/Quicksand_Regular.ttf"),
    "QuickSand-Semibold": require("../src/fonts/Quicksand_SemiBold.ttf"),
    "QuickSand-Bold": require("../src/fonts/Quicksand_Bold.ttf"),
  });

  useEffect(() => {
    const orders = realm.objects<WorkOrder>("WorkOrder");
    const listener = () => setWorkOrders([...orders]);
    orders.addListener(listener);

    return () => orders.removeListener(listener);
  }, []);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home-page" options={{ headerShown: false }} />
      <Stack.Screen
        name="order-details"
        options={{
          headerTitleAlign: "center",
          title: "Detalhes da Ordem",
          headerTitleStyle: {
            fontFamily: "QuickSand-Semibold",
          },
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: Palette.Theme2.standard,
          },
        }}
      />
    </Stack>
  );
}
