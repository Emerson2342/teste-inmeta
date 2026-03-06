import { Feather } from "@expo/vector-icons";
import { ButtonComponent } from "@src/components/ButtonComponent";
import { LogoComponent } from "@src/components/LogoComponente";
import { ModalBaseComponent } from "@src/components/modals/ModalBaseComponent";
import { ModalDeleteOrder } from "@src/components/modals/ModalDeleteOrder";
import { ModalUpdateOrder } from "@src/components/modals/ModalUpdateOrder";
import { TextComponent } from "@src/components/TextComponent";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { Palette } from "@src/theme/colors";
import { WorkOrderStatus } from "@src/utils/Enums";
import { getStatusLabel } from "@src/utils/WorkerStatus";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  id: string;
};

export function OrderDetails({ id }: Props) {
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalUpdateVisible, setModalUpdateVisible] = useState(false);

  const order = useWorkOrderStore((state) =>
    state.workOrders.find((o) => o.localId === id),
  );

  const createdAt = order?.createdAt ? new Date(order.createdAt) : new Date();
  const updatedAt = order?.updatedAt ? new Date(order.updatedAt) : new Date();

  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <LogoComponent />
      {order ? (
        <View>
          <View style={styles.container}>
            <TextComponent
              weight="bold"
              style={{ textAlign: "center", fontSize: 20, marginVertical: 15 }}
            >
              {order.title}
            </TextComponent>
            <View style={{ gap: 15 }}>
              <View>
                <TextComponent>Responsável Técnico: </TextComponent>
                <TextComponent weight="bold">{order.assignedTo}</TextComponent>
              </View>
              <View>
                <TextComponent>Descrição: </TextComponent>
                <TextComponent weight="bold">{order.description}</TextComponent>
              </View>
              <View>
                <TextComponent>Criado em: </TextComponent>
                <TextComponent weight="bold">
                  {createdAt.toLocaleDateString("pt-BR")} às{" "}
                  {createdAt.toLocaleTimeString("pt-BR")}
                </TextComponent>
              </View>
              <View>
                <TextComponent>Atualizado em: </TextComponent>
                <TextComponent weight="bold">
                  {updatedAt.toLocaleDateString("pt-BR")} às{" "}
                  {updatedAt.toLocaleTimeString("pt-BR")}
                </TextComponent>
              </View>
              <View>
                <TextComponent>Status: </TextComponent>
                <TextComponent weight="bold">
                  {getStatusLabel(order.status as WorkOrderStatus)}
                </TextComponent>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: "center",
              marginTop: 30,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <ButtonComponent
              isCancelButton
              icon={
                <Feather
                  name="edit"
                  color={Palette.Theme2.standard}
                  size={17}
                />
              }
              label="Editar Ordem"
              onclick={() => setModalUpdateVisible(true)}
              //onclick={() => alert(2342)}
            />
            <ButtonComponent
              icon={<Feather name="trash-2" color={"white"} size={17} />}
              label="Apagar Ordem"
              onclick={() => setModalDeleteVisible(true)}
            />
          </View>
          <ModalBaseComponent
            visible={modalDeleteVisible}
            child={
              <ModalDeleteOrder
                id={order.localId}
                title={order.title}
                onClose={() => setModalDeleteVisible(false)}
              />
            }
          />
          <ModalBaseComponent
            visible={modalUpdateVisible}
            child={
              <ModalUpdateOrder
                order={order}
                onClose={() => setModalUpdateVisible(false)}
              />
            }
          />
        </View>
      ) : (
        <TextComponent>Ordem não encontrada! {id}</TextComponent>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginTop: 50,
    backgroundColor: "#fff",
    borderRadius: 7,
    alignSelf: "center",
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
});
