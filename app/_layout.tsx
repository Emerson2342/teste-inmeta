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

  return <Stack screenOptions={{ headerShown: false }} />;
}
