import { Palette } from "@src/theme/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { TextComponent } from "./TextComponent";

type ButtonProps = {
  label: string;
  onclick: () => void;
  isLoading?: boolean;
};

export function ButtonComponent({
  label,
  onclick,
  isLoading: isLoadind,
}: ButtonProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={onclick}
        disabled={isLoadind}
      >
        <TextComponent weight="bold" style={styles.textButton}>
          {label}
        </TextComponent>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },
  buttonContainer: {
    backgroundColor: Palette.Theme2.standard,
    borderRadius: 7,
    elevation: 7,
  },
  textButton: {
    color: "white",
    padding: 7,
  },
});
