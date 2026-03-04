import { Assets } from "@src/config/assets";
import React from "react";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";

export function LogoComponent() {
  return (
    <View
      style={{
        alignItems: "center",
        flex: 0.1,
        justifyContent: "center",
      }}
    >
      <SvgUri width="250" uri={Assets.LOGO_URL} />
    </View>
  );
}
