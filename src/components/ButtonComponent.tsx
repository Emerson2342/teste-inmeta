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

type IconParams = {
  name: string;
  size?: number;
  color?: string;
};

type ButtonProps = StyleProp<ViewStyle> & {
  label: string;
  onclick: () => void;
  isLoading?: boolean;
  disable?: boolean;
  isCancelButton?: boolean;
  icon?: React.ReactNode;
};

export function ButtonComponent({
  label,
  onclick,
  isLoading,
  disable,
  isCancelButton,
  icon,
}: ButtonProps) {
  const cancelBackground = isCancelButton ? "#fff" : Palette.Theme1.standard;
  const cancelText = isCancelButton ? Palette.Theme1.standard : "#fff";
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
        {icon && icon}
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
    backgroundColor: Palette.Theme1.standard,
    borderRadius: 7,
    elevation: 7,
    borderColor: Palette.Theme1.standard,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    padding: 7,
    textAlign: "center",
  },
});
