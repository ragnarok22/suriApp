import ScanRechargeCard from "@/components/ScanRechargeCard";
import { ThemedView } from "@/components/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import { StyleSheet, View } from "react-native";

export default function CardCameraScreen() {
  const borderColor = useThemeColor(
    { light: "gray", dark: "white" },
    "background",
  );
  const handleAccept = (card: string) => {
    console.log("handleAccept", card);
  };
  return (
    <ThemedView style={styles.layout}>
      <ScanRechargeCard onDone={handleAccept} />
      <View style={[styles.card, { borderColor }]} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  layout: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  card: {
    width: "80%",
    height: 200,
    backgroundColor: "transparent",
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 2,
  },
});
