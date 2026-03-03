import { HeaderComponent } from "@src/components/HeaderComponent";
import { HomeScreen } from "@src/screens/HomeScreen";
import { View } from "react-native";

export default function HomePage() {
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent />
      <HomeScreen />
    </View>
  );
}
