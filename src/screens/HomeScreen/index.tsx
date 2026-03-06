import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ButtonComponent } from "@src/components/ButtonComponent";
import { LogoComponent } from "@src/components/LogoComponente";
import { ModalAddOrder } from "@src/components/modals/ModalAddOrder";
import { ModalBaseComponent } from "@src/components/modals/ModalBaseComponent";
import { TextComponent } from "@src/components/TextComponent";
import {
  syncPendingOrders,
  syncWorkOrdersService,
} from "@src/services/syncWorkOrders";
import { useSyncStore } from "@src/stores/syncStore";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { Palette } from "@src/theme/colors";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Dimensions, View } from "react-native";
import { ServiceOrderesComponent } from "./serviceOrderes";

const companyServices: string[] = [
  "Gestão de Qualidade",
  "Gestão de Projetos",
  "Controler de Acesso",
  "Gestão Pós-Obra",
];

const width = Dimensions.get("screen").width;

export function HomeScreen() {
  const animations = useRef(
    companyServices.map(() => new Animated.Value(0)),
  ).current;

  const [addOrderModalVisible, setAddOrderModalVisible] = useState(false);

  const [key, setKey] = useState(0);
  const initialSync = useWorkOrderStore((state) => state.initialSync);
  const { loadLastSync } = useSyncStore.getState();

  useEffect(() => {
    const init = async () => {
      companyServiceAnimation();

      await loadLastSync();
      await initialSync();
    };
    init();
  }, []);
  useFocusEffect(
    useCallback(() => {
      const runSync = async () => {
        try {
          await syncPendingOrders();
          await syncWorkOrdersService();
        } catch (error) {
          console.log("Sync ossffline/erro de rede:", error);
        }
      };
      runSync();
    }, []),
  );

  const getStore = async () => {
    const store = await AsyncStorage.getItem("lastSyncAt");
    console.log(store);
    console.log(new Date().toISOString());
  };

  const companyServiceAnimation = () => {
    animations.forEach((anim) => anim.setValue(0));
    setKey((prev) => prev + 1);
    const animationsSequence = companyServices.map((_, index) =>
      Animated.timing(animations[index], {
        toValue: 1,
        duration: 1000,
        delay: index * 200,
        useNativeDriver: true,
      }),
    );

    Animated.stagger(300, animationsSequence).start();
  };
  return (
    <View style={{ flex: 1 }}>
      <LogoComponent />
      <View>
        {companyServices.map((item, index) => {
          const translateX = animations[index].interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
          });

          const opacity = animations[index];
          return (
            <Animated.View
              key={item}
              style={{
                marginLeft: (index + 1) * (width * 0.15),
                transform: [{ translateX }],
                opacity,
              }}
            >
              <TextComponent
                weight="bold"
                style={{ color: Palette.Theme2.standard }}
              >
                <AntDesign name="check" color={Palette.Theme2.dark} /> {item}
              </TextComponent>
            </Animated.View>
          );
        })}
      </View>
      <View style={{ flex: 0.5, marginHorizontal: 15 }}>
        <ServiceOrderesComponent key={key} />
      </View>
      <View style={{ alignItems: "center", gap: 15 }}>
        <ButtonComponent
          label="Adicionar Ordem"
          onclick={() => setAddOrderModalVisible(true)}
          isLoading={false}
        />
        <ButtonComponent
          label="Show sync"
          onclick={getStore}
          isLoading={false}
        />
      </View>
      <ModalBaseComponent
        child={<ModalAddOrder onClose={() => setAddOrderModalVisible(false)} />}
        visible={addOrderModalVisible}
      />
    </View>
  );
}
