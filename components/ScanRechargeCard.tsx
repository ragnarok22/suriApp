import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

import { ThemedText } from "./themed";

type ScanRechargeCardProps = {
  onDone: (card: string) => void;
};

export default function ScanRechargeCard(props: ScanRechargeCardProps) {
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission || !permission.granted) {
    // Camera permissions are still loading.
    return (
      <View
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText>
          You need to grant camera permissions to scan a recharge card.
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      {/*<Camera
        style={styles.camera}
        device={device}
        isActive
        mode="recognize"
        options={{
          language: "latin",
        }}
        callback={handleProcessText}
        resizeMode="contain"
      />*/}
      <CameraView style={styles.camera} facing={"back"} />
      <View style={styles.numberPreview}>
        <View
          style={{
            width: "80%",
            height: 50,
            borderWidth: 2,
            borderColor: "rgba(0,0,0,.3)",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    marginVertical: 12,
  },
  numberPreview: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});
