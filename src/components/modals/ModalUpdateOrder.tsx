import { UpdateOrderProps, WorkOrder } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { ButtonComponent } from "../ButtonComponent";
import { TextComponent } from "../TextComponent";

type ModalAddProps = {
  onClose: (value: React.SetStateAction<boolean>) => void;
  order: WorkOrder;
};
const status = [
  { value: "Pending", label: "Pendente" },
  { value: "In Progress", label: "Em andamento" },
  { value: "Completed", label: "Finalizado" },
];

export function ModalUpdateOrder({ onClose, order }: ModalAddProps) {
  const [orderUpdated, setOrderUpdated] = useState<UpdateOrderProps>({
    localId: "",
    assignedTo: "",
    description: "",
    title: "",
    status: "Pending",
  });
  const { updateWorkOrder } = useWorkOrderStore();

  useEffect(() => {
    setOrderUpdated({
      localId: order.localId,
      assignedTo: order.assignedTo,
      description: order.description,
      status: order.status,
      title: order.title,
    });
  }, [order]);

  const checkFields = Object.values(orderUpdated).some(
    (value) => value.trim() === "",
  );

  const handleAddOrder = () => {
    try {
      updateWorkOrder(orderUpdated);
      onClose(false);
    } catch (e) {
      console.error(`Erro ao atualizar a Ordem de Serviço ${order.title}`);
    }
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
          value={orderUpdated.title}
          onChangeText={(text) =>
            setOrderUpdated((prevState) => ({ ...prevState, title: text }))
          }
        />
        <TextInput
          mode="outlined"
          label="Descrição"
          value={orderUpdated.description}
          onChangeText={(text) =>
            setOrderUpdated((prevState) => ({
              ...prevState,
              description: text,
            }))
          }
        />
        {/* <TextInput
          mode="outlined"
          label="Descrição"
          value={newOrder.description}
          onChangeText={(text) =>
            setNewOrder((prevState) => ({ ...prevState, description: text }))
          }
        /> */}
        <TextInput
          mode="outlined"
          label="Técnico"
          value={orderUpdated.assignedTo}
          onChangeText={(text) =>
            setOrderUpdated((prevState) => ({ ...prevState, assignedTo: text }))
          }
        />
        <RadioButton.Group
          onValueChange={(value) =>
            setOrderUpdated((prev) => ({
              ...prev,
              status: value as "Pending" | "In Progress" | "Completed",
            }))
          }
          value={orderUpdated.status}
        >
          {status.map((item, index) => (
            <RadioButton.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </RadioButton.Group>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          marginTop: 15,
        }}
      >
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
            label="Editar"
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
