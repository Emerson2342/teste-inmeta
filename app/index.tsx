import { TextComponent } from "@src/components/TextComponent";
import { Assets } from "@src/config/assets";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SvgUri } from "react-native-svg";

export default function Index() {
  const [counter, setCouter] = useState(7);

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCouter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter === 0) {
      router.replace("/home-page");
    }
  }, [counter]);

  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ flex: 0.5, justifyContent: "center" }}>
        <SvgUri width="250" uri={Assets.LOGO_URL} />
      </View>
      <View
        style={{ flex: 0.5, justifyContent: "center", alignItems: "center" }}
      >
        <TextComponent weight="bold" style={{ color: "#777" }}>
          Seja bem vindo!
        </TextComponent>
        <TextComponent weight="bold" style={{ color: "#777" }}>
          Você será redirecionado em {counter}...
        </TextComponent>
      </View>
    </SafeAreaView>
  );
}
