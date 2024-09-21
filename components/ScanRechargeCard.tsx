import { useEffect } from "react";
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { StyleSheet, View } from "react-native";
import { Camera } from "react-native-vision-camera-text-recognition";
import { Text } from "react-native-vision-camera-text-recognition/lib/typescript/src/types";
import { getRechargeNumber } from "@/utils/actions";
import { ThemedText, ThemedView } from "./themed";

export default function ScanRechargeCard({ onDone }) {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice("back");

  useEffect(() => {
    requestPermission();
  });

  const handleProcessText = (data: string | Text[] | Text) => {
    let text = Array.isArray(data) ? data.map((t) => t.resultText).join("\n") : data;

    if (typeof text === 'object') {
      text = text.resultText;
    }

    const cardNumber = getRechargeNumber(text);

    if (cardNumber) {
      onDone(cardNumber);
    }
  }

  if (!hasPermission) {
    return (
      <ThemedView>
        <ThemedText>No Camera Permission</ThemedText>
      </ThemedView>
    );
  }

  if (!device) {
    return (
      <ThemedView>
        <ThemedText>No Camera Device</ThemedText>
      </ThemedView>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'relative', width: '100%', height: 200, backgroundColor: 'red', overflow: 'hidden' }}>
      <Camera
        style={styles.camera}
        device={device}
        isActive
        mode="recognize"
        options={{
          language: "latin",
        }}
        callback={handleProcessText}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
    zIndex: 101,
  },
});
