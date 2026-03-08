import { Feather } from "@expo/vector-icons";
import { ButtonComponent } from "@src/components/ButtonComponent";
import { LogoComponent } from "@src/components/LogoComponente";
import { ModalBaseComponent } from "@src/components/modals/ModalBaseComponent";
import { ModalOrder } from "@src/components/modals/ModalOrder";
import { useSyncStore } from "@src/stores/syncStore";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { ModalWorderType } from "@src/utils/Enums";
import { runSync } from "@src/utils/RunSync";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { CompanyServicesLabel } from "./companyServicesLabel";
import { ServiceOrderesComponent } from "./serviceOrderes";

export function HomeScreen() {
  const [addOrderModalVisible, setAddOrderModalVisible] = useState(false);

  const initialSync = useWorkOrderStore((state) => state.initialSync);
  const { loadLastSync } = useSyncStore.getState();

  useEffect(() => {
    const init = async () => {
      await loadLastSync();
      await initialSync();
    };
    init();
  }, []);
  useFocusEffect(
    useCallback(() => {
      runSync();
    }, []),
  );

  return (
    <View style={{ flex: 1, gap: 15, marginVertical: 15 }}>
      <LogoComponent />

      <CompanyServicesLabel />
      <View style={{ flex: 1 }}>
        <ServiceOrderesComponent />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <ButtonComponent
          icon={<Feather color={"#fff"} name="plus" size={20} />}
          label="Adicionar Ordem"
          onclick={() => setAddOrderModalVisible(true)}
          isLoading={false}
        />
      </View>
      <ModalBaseComponent
        child={
          <ModalOrder
            type={ModalWorderType.CREATE}
            onClose={() => setAddOrderModalVisible(false)}
          />
        }
        visible={addOrderModalVisible}
      />
    </View>
  );
}
