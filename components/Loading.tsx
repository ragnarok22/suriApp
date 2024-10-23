import { BlurView } from "expo-blur";
import { StyleSheet, Text } from "react-native";

type LoadingProps = {
  visible: boolean;
};
export default function Loading({ visible }: LoadingProps) {
  if (!visible) {
    return null;
  }

  return (
    <BlurView intensity={30} style={styles.loading}>
      <Text style={styles.loadingText}>Loading...</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingText: {
    color: "white",
    fontSize: 32,
  },
});
