import { WorkOrder } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { ModalWorderType } from "@src/utils/Enums";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { RadioButton, TextInput } from "react-native-paper";
import { ButtonComponent } from "../ButtonComponent";
import { TextComponent } from "../TextComponent";

type ModalProps = {
  type: ModalWorderType;
  onClose: (value: React.SetStateAction<boolean>) => void;
  order?: WorkOrder;
};
const status = [
  { value: "Pending", label: "Pendente" },
  { value: "In Progress", label: "Em andamento" },
  { value: "Completed", label: "Finalizado" },
];
const initialForm = {
  localId: "",
  assignedTo: "",
  description: "",
  title: "",
  status: "Pending" as "Pending" | "In Progress" | "Completed",
};

export function ModalOrder({ onClose, order, type }: ModalProps) {
  const [form, setForm] = useState(initialForm);
  const { updateWorkOrder, addWorkOrder } = useWorkOrderStore();
  const title =
    type === ModalWorderType.CREATE ? "Adicionar Ordem" : "Editar Ordem";

  const buttonLabel = type === ModalWorderType.CREATE ? "Adicionar" : "Editar";

  const isUpdate = type === ModalWorderType.UPDATE;
  useEffect(() => {
    if (isUpdate && order) {
      setForm({
        localId: order.localId,
        assignedTo: order.assignedTo,
        description: order.description,
        status: order.status,
        title: order.title,
      });
    } else {
      setForm(initialForm);
    }
  }, [order, isUpdate]);

  const checkFields = Object.values(form)
    .slice(1)
    .some((value) => value.trim() === "");

  const handleSubmitOrder = () => {
    console.log(JSON.stringify({ type, form }, null, 2));

    if (type === ModalWorderType.UPDATE) {
      try {
        updateWorkOrder(form);
      } catch (e) {
        console.error(`Erro ao atualizar a Ordem de Serviço ${order?.title}`);
      }
    } else {
      const { localId, status, ...newOrder } = form;
      addWorkOrder(newOrder);
    }
    onClose(false);
  };

  const handleClose = () => {
    setForm(initialForm);
    onClose(false);
  };
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <TextComponent
          weight="bold"
          style={{ textAlign: "center", fontSize: 20 }}
        >
          {title}
        </TextComponent>
        <View style={{ gap: 9 }}>
          <TextInput
            mode="outlined"
            label="Título"
            value={form.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <TextInput
            mode="outlined"
            label="Descrição"
            value={form.description}
            onChangeText={(text) => handleChange("description", text)}
          />
          <TextInput
            mode="outlined"
            label="Técnico"
            value={form.assignedTo}
            onChangeText={(text) => handleChange("assignedTo", text)}
          />
          {type === ModalWorderType.UPDATE && (
            <RadioButton.Group
              onValueChange={(text) => handleChange("status", text)}
              value={form.status}
            >
              {status.map((item) => (
                <RadioButton.Item
                  key={item.value}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </RadioButton.Group>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            marginTop: 15,
          }}
        >
          <View style={{ flex: 1 }}>
            <ButtonComponent
              isCancelButton={true}
              label="Cancelar"
              onclick={handleClose}
            />
          </View>
          <View style={{ flex: 1 }}>
            <ButtonComponent
              disable={checkFields}
              label={buttonLabel}
              onclick={handleSubmitOrder}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, gap: 7 },
});
