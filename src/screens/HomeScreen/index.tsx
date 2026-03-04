import { AntDesign } from "@expo/vector-icons";
import { ButtonComponent } from "@src/components/ButtonComponent";
import { ModalAddOrder } from "@src/components/modals/ModalAddOrder";
import { ModalBaseComponent } from "@src/components/modals/ModalBaseComponent";
import { TextComponent } from "@src/components/TextComponent";
import { Assets } from "@src/config/assets";
import { Palette } from "@src/theme/colors";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, View } from "react-native";
import { SvgUri } from "react-native-svg";
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

  useEffect(() => {
    companyServiceAnimation();
  }, []);

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
      <View
        style={{
          alignItems: "center",
          flex: 0.1,
          justifyContent: "center",
        }}
      >
        <SvgUri width="250" uri={Assets.LOGO_URL} />
      </View>
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
      <View>
        <ButtonComponent
          label="Adicionar Ordem"
          onclick={() => setAddOrderModalVisible(true)}
          isLoading={false}
        />
      </View>
      <ModalBaseComponent
        child={<ModalAddOrder onClose={() => setAddOrderModalVisible(false)} />}
        onClick={() => {}}
        visible={addOrderModalVisible}
      />
    </View>
  );
}
