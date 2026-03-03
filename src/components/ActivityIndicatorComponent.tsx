import { Palette } from "@src/theme/colors";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { TextComponent } from "./TextComponent";

export function ActivityIndicatorComponent() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={Palette.Theme1.semilight} />
      <TextComponent
        weight="semibold"
        style={{ color: Palette.Theme1.standard }}
      >
        Carregando...
      </TextComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
