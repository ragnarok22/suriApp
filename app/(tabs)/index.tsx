import { useRef, useState } from "react";
import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed";
import MainActionList from "@/components/MainActionList";
import ThemedLayout from "@/components/layouts/ThemedLayout";
import ModalBottom from "@/components/ModalBottom";
import BottomSheet from "@gorhom/bottom-sheet";

export default function HomeScreen() {
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const modalRef = useRef<BottomSheet>(null);

  const handleModalOpen = (content: React.ReactNode) => {
    setContent(content);
    modalRef.current?.snapToIndex(0);
  };

  return (
    <ThemedLayout headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.titleContainer}>
        <MainActionList openModal={handleModalOpen} />
      </ThemedView>
      <ModalBottom content={content} ref={modalRef} />
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
