import Feather from "@expo/vector-icons/build/EvilIcons";
import { ActivityIndicatorComponent } from "@src/components/ActivityIndicatorComponent";
import { TextComponent } from "@src/components/TextComponent";
import { WorkOrder } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { Palette } from "@src/theme/colors";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export function ServiceOrderesComponent() {
  const [loadingData, setLoadingData] = useState(true);
  const { workOrders, loadFromRealm } = useWorkOrderStore();

  useEffect(() => {
    loadFromRealm();
    setLoadingData(false);
  }, []);

  const renderItem = ({ item, index }: { item: WorkOrder; index: number }) => {
    const isOdd = index % 2 === 0;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: isOdd ? Palette.Theme1.light : undefined,
          marginTop: 5,
        }}
      >
        <TextComponent
          weight="semibold"
          style={{ width: "60%" }}
          numberOfLines={1}
        >
          {index + 1} - {item.title}
        </TextComponent>
        <TextComponent
          weight="semibold"
          style={{
            width: "33%",
            textAlign: "center",
          }}
          numberOfLines={1}
        >
          {item.assignedTo}
        </TextComponent>
        <Feather style={{ width: "7%" }} name="external-link" size={25} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextComponent weight="semibold" style={{ textAlign: "center" }}>
        Ordens de Serviço
      </TextComponent>
      {loadingData ? (
        <ActivityIndicatorComponent />
      ) : workOrders.length > 0 ? (
        <View>
          <View style={{ flexDirection: "row" }}>
            <TextComponent
              weight="semibold"
              style={{ width: "60%", textAlign: "center" }}
            >
              Título
            </TextComponent>
            <TextComponent
              weight="semibold"
              style={{ width: "40%", textAlign: "center" }}
            >
              Técnico
            </TextComponent>
          </View>
          <FlatList
            keyExtractor={(item) => item._id}
            data={workOrders}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextComponent weight="bold">Nenhuma ordem criada!</TextComponent>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 30,
    borderRadius: 7,
    //borderWidth: 1,
    borderColor: Palette.Theme1.semidark,
    backgroundColor: "#FFF",
    elevation: 7,
    paddingHorizontal: 7,
  },
});
