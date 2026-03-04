import React from "react";
import { Modal, StyleSheet, View } from "react-native";

type ModalProps = {
  visible: boolean;
  child: React.ReactNode;
};

export function ModalBaseComponent({ child, visible }: ModalProps) {
  return (
    <Modal transparent={true} visible={visible}>
      <View style={styles.container}>
        <View style={styles.content}>{child}</View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  content: {
    width: "95%",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderRadius: 7,
  },
});
