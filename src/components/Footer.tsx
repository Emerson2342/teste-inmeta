import { FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { Palette } from "@src/theme/colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import { TextComponent } from "./TextComponent";

export function FooterComponent() {
  return (
    <View>
      <View style={styles.content}>
        <Ionicons
          name="logo-whatsapp"
          color={Palette.Theme1.standard}
          size={20}
          style={styles.icon}
        />
        <TextComponent weight="bold" style={styles.textLabel}>
          +55 48 99841-0440
        </TextComponent>
      </View>
      <View style={styles.content}>
        <FontAwesome
          name="map-marker"
          color={Palette.Theme2.standard}
          size={20}
          style={styles.icon}
        />
        <TextComponent weight="bold" style={styles.textLabel}>
          Rua Álvaro Catão, Centro Criciúma - SC
        </TextComponent>
      </View>
      <View style={styles.content}>
        <Fontisto
          name="clock"
          color={Palette.Theme2.standard}
          size={17}
          style={styles.icon}
        />
        <TextComponent weight="bold" style={styles.textLabel}>
          Horário de Atendimento Segunda à Sexta 8h-18h
        </TextComponent>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    justifyContent: "center",
  },
  icon: {
    width: 20,
  },
  textLabel: {
    color: "gray",
  },
});
