import { FooterComponent } from "@src/components/Footer";
import { useNetworkSync } from "@src/hooks/useNetowkSync";
import { HomeScreen } from "@src/screens/HomeScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomePage() {
  useNetworkSync();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      {/* <HeaderComponent /> */}
      <HomeScreen />
      <FooterComponent />
    </SafeAreaView>
  );
}
