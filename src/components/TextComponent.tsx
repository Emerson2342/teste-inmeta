import React from "react";
import { StyleProp, Text, TextProps, TextStyle } from "react-native";

type FontWeight = "regular" | "semibold" | "bold";

type Props = TextProps & {
  weight?: FontWeight;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

export function TextComponent({
  children,
  weight = "regular",
  style,
  ...props
}: Props) {
  const fontMap = {
    regular: "QuickSand-Regular",
    semibold: "QuickSand-Semibold",
    bold: "QuickSand-Bold",
  };

  return (
    <Text {...props} style={[{ fontFamily: fontMap[weight] }, style]}>
      {children}
    </Text>
  );
}
