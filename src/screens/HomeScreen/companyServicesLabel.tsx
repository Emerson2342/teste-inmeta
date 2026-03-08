import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { TextComponent } from "@src/components/TextComponent";
import { Palette } from "@src/theme/colors";

const companyServices: string[] = [
  "Gestão de Qualidade",
  "Gestão de Projetos",
  "Controler de Acesso",
  "Gestão Pós-Obra",
];

const width = Dimensions.get("screen").width;

export function CompanyServicesLabel() {
  const animations = useRef(
    companyServices.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    companyServiceAnimation();
  }, []);

  const companyServiceAnimation = () => {
    animations.forEach((anim) => anim.setValue(0));
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
  );
}
