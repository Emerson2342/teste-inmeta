import { HeaderComponent } from "@src/components/HeaderComponent";
import { useNetworkSync } from "@src/hooks/useNetowkSync";
import { HomeScreen } from "@src/screens/HomeScreen";
import { View } from "react-native";

export default function HomePage() {
  useNetworkSync();
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent />
      <HomeScreen />
    </View>
  );
}
