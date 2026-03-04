import { Palette } from "@src/theme/colors";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { TextComponent } from "./TextComponent";

type ButtonProps = StyleProp<ViewStyle> & {
  label: string;
  onclick: () => void;
  isLoading?: boolean;
  disable?: boolean;
  isCancelButton?: boolean;
};

export function ButtonComponent({
  label,
  onclick,
  isLoading,
  disable,
  isCancelButton,
}: ButtonProps) {
  const cancelBackground = isCancelButton ? "#fff" : Palette.Theme2.standard;
  const cancelText = isCancelButton ? Palette.Theme2.standard : "#fff";
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          [styles.buttonContainer, { borderWidth: disable ? 0 : 1 }],
          {
            backgroundColor: disable ? "#b1aeae" : cancelBackground,
          },
        ]}
        onPress={onclick}
        disabled={isLoading || disable}
      >
        <TextComponent
          weight="bold"
          style={[styles.textButton, { color: cancelText }]}
        >
          {label}
        </TextComponent>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  buttonContainer: {
    backgroundColor: Palette.Theme2.standard,
    borderRadius: 7,
    elevation: 7,
    borderColor: Palette.Theme2.standard,
  },
  textButton: {
    color: "white",
    padding: 7,
    textAlign: "center",
  },
});
