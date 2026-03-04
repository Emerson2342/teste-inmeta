import { NewOrderType } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-paper";
import { ButtonComponent } from "../ButtonComponent";
import { TextComponent } from "../TextComponent";

type ModalAddProps = {
  onClose: (value: React.SetStateAction<boolean>) => void;
};

export function ModalAddOrder({ onClose }: ModalAddProps) {
  const [newOrder, setNewOrder] = useState<NewOrderType>({
    assignedTo: "",
    description: "",
    title: "",
  });
  const { addWorkOrder } = useWorkOrderStore();

  const checkFields = Object.values(newOrder).some(
    (value) => value.trim() === "",
  );

  const handleAddOrder = () => {
    addWorkOrder(newOrder);
    onClose(false);
  };

  return (
    <View style={styles.container}>
      <TextComponent weight="bold" style={{ textAlign: "center" }}>
        Adicionar Ordem
      </TextComponent>
      <View style={{ gap: 9 }}>
        <TextInput
          mode="outlined"
          label="Título"
          value={newOrder.title}
          onChangeText={(text) =>
            setNewOrder((prevState) => ({ ...prevState, title: text }))
          }
        />
        <TextInput
          mode="outlined"
          label="Descrição"
          value={newOrder.description}
          onChangeText={(text) =>
            setNewOrder((prevState) => ({ ...prevState, description: text }))
          }
        />
        <TextInput
          mode="outlined"
          label="Técnico"
          value={newOrder.assignedTo}
          onChangeText={(text) =>
            setNewOrder((prevState) => ({ ...prevState, assignedTo: text }))
          }
        />
      </View>
      <View style={{ flexDirection: "row", gap: 15, marginTop: 15 }}>
        <View style={{ flex: 0.5 }}>
          <ButtonComponent
            isCancelButton={true}
            label="Cancelar"
            onclick={() => onClose(false)}
          />
        </View>
        <View style={{ flex: 0.5 }}>
          <ButtonComponent
            disable={checkFields}
            label="Criar"
            onclick={handleAddOrder}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, gap: 7 },
});
