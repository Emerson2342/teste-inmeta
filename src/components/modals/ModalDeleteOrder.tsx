import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ButtonComponent } from "../ButtonComponent";
import { TextComponent } from "../TextComponent";

type Props = {
  title: string;
  id: string;
  onClose: (value: React.SetStateAction<boolean>) => void;
};

export function ModalDeleteOrder({ id, title, onClose }: Props) {
  const { deleteWorkOrder } = useWorkOrderStore();
  const router = useRouter();
  const handDelete = () => {
    try {
      deleteWorkOrder(id);
      router.replace("/home-page");
    } catch (e) {
      console.error(`Não foi possível apagar a Ordem de Serviço ${title}`);
    }
  };

  return (
    <View style={styles.container}>
      <TextComponent
        style={{ marginVertical: 15, fontSize: 17, textAlign: "center" }}
      >
        Deseja realmente apagar a Ordem de Serviço{" "}
        <TextComponent weight="bold">{title}</TextComponent>?
      </TextComponent>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 15,
          marginVertical: 15,
        }}
      >
        <ButtonComponent
          isCancelButton
          label="Cancelar"
          onclick={() => onClose(false)}
        />
        <ButtonComponent label="Confirmar" onclick={handDelete} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //width: "70%",
    paddingHorizontal: 15,
    alignSelf: "center",
    alignItems: "center",
  },
});
