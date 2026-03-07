import { Palette } from "@src/theme/colors";
import React from "react";
import { StyleSheet, View } from "react-native";

export function HeaderComponent() {
  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: Palette.Theme1.standard,
  },
});
