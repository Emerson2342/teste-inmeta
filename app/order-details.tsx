import { OrderDetails } from "@src/screens/OrderDetails";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

type Props = {
  id: string;
};

export default function OrderDetailsPage() {
  const { id } = useLocalSearchParams<Props>();
  return (
    <View style={{ flex: 1 }}>
      <OrderDetails id={id} />
    </View>
  );
}
