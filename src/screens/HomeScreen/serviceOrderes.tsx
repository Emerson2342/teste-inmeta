import Feather from "@expo/vector-icons/build/EvilIcons";
import { ActivityIndicatorComponent } from "@src/components/ActivityIndicatorComponent";
import { TextComponent } from "@src/components/TextComponent";
import { WorkOrder } from "@src/props/types";
import { useWorkOrderStore } from "@src/stores/workOrderStore";
import { Palette } from "@src/theme/colors";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

export function ServiceOrderesComponent() {
  const [loadingData, setLoadingData] = useState(true);
  const { workOrders, loadFromRealm } = useWorkOrderStore();

  const router = useRouter();

  useEffect(() => {
    loadFromRealm();
    setLoadingData(false);
  }, []);

  const filteredOrders = useMemo(() => {
    return workOrders.filter((o) => o.localDeleted === false);
  }, [workOrders]);

  const renderItemMemo = useCallback(
    ({ item, index }: { item: WorkOrder; index: number }) => {
      return <OrderItem order={item} index={index} />;
    },
    [],
  );

  const OrderItem = React.memo(
    ({ order, index }: { order: WorkOrder; index: number }) => {
      return (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/order-details",
              params: { id: order.localId },
            })
          }
          style={[styles.itemRow]}
        >
          <TextComponent
            weight="semibold"
            style={styles.itemTitle}
            numberOfLines={1}
          >
            {index + 1} - {order.title}
          </TextComponent>
          <TextComponent
            weight="semibold"
            style={styles.itemAssigned}
            numberOfLines={1}
          >
            {order.assignedTo}
          </TextComponent>
          <Feather style={styles.itemIcon} name="external-link" size={25} />
        </TouchableOpacity>
      );
    },
  );
  return (
    <View style={styles.container}>
      <TextComponent weight="bold" style={styles.title}>
        Ordens de Serviço
      </TextComponent>
      {loadingData ? (
        <ActivityIndicatorComponent />
      ) : filteredOrders.length > 0 ? (
        <View style={{ flex: 1 }}>
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
              Resp. Técnico
            </TextComponent>
          </View>
          <FlatList
            style={{ flex: 0.9 }}
            data={filteredOrders}
            renderItem={renderItemMemo}
            keyExtractor={(item) => item.localId}
            initialNumToRender={15}
            maxToRenderPerBatch={10}
            windowSize={5}
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
    gap: 10,
    marginVertical: 30,
    borderRadius: 7,
    borderColor: Palette.Theme1.semidark,
    paddingHorizontal: 7,
  },
  title: {
    textAlign: "center",
    fontSize: 17,
  },
  itemRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 7,
    marginVertical: 3,
    padding: 5,
  },
  itemOdd: { backgroundColor: Palette.Theme1.light },
  itemTitle: { width: "60%", color: "gray" },
  itemAssigned: {
    width: "33%",
    textAlign: "center",
    color: Palette.Theme1.semidark,
  },
  itemIcon: { width: "7%", color: "gray" },
});
