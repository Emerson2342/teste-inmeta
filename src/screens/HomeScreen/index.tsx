import { Assets } from "@src/config/assets";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";

export function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <SvgUri width="250" uri={Assets.LOGO_URL} />
    </View>
  );
}
