import { useEffect } from "react";
import { useCameraDevice, useCameraPermission } from "react-native-vision-camera";
import { StyleSheet, View } from "react-native";
import { Camera } from "react-native-vision-camera-text-recognition";
import { Text } from "react-native-vision-camera-text-recognition/lib/typescript/src/types";
import { getRechargeNumber } from "@/utils/actions";
import { ThemedText, ThemedView } from "./themed";

type ScanRechargeCardProps = {
  onDone: (card: string) => void;
};

export default function ScanRechargeCard({ onDone }: ScanRechargeCardProps) {
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
    <View style={styles.cameraContainer}>
      <Camera
        style={styles.camera}
        device={device}
        isActive
        mode="recognize"
        options={{
          language: "latin",
        }}
        callback={handleProcessText}
        resizeMode="contain"
      />
      <View style={styles.numberPreview}>
        <View style={{ width: '80%', height: 50, borderWidth: 2, borderColor: 'rgba(0,0,0,.3)' }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
  },
  numberPreview: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});
