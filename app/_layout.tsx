import { Palette } from "@src/theme/colors";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "QuickSand-Regular": require("../src/fonts/Quicksand_Regular.ttf"),
    "QuickSand-Semibold": require("../src/fonts/Quicksand_SemiBold.ttf"),
    "QuickSand-Bold": require("../src/fonts/Quicksand_Bold.ttf"),
  });
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
