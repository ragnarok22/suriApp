import { type ComponentProps } from "react";
import { Modal, Pressable, StyleSheet } from "react-native";
import ThemedText from "./ThemedText";
import ThemedView from "./ThemedView";
import { useTranslation } from "react-i18next";
import { useThemeColor } from "@/hooks/useThemeColor";

type ThemedModalProps = ComponentProps<typeof Modal> & {
  open: boolean;
  close: () => void;
  cancelText?: string;
  acceptText?: string;
  children: React.ReactNode;
  onAccept: () => void;
};

export default function ThemedModal({
  children,
  open,
  close,
  onAccept,
  ...modalProps
}: ThemedModalProps) {
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({ light: "white", dark: "white" }, "text");
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close();
      }}
      style={{ zIndex: 100 }}
      {...modalProps}
    >
      <ThemedView style={styles.centeredView}>
        <ThemedView style={[styles.modalView, { backgroundColor }]}>
          {children}
          <ThemedView style={styles.buttonView}>
            <Pressable
              style={[styles.btn, styles.cancelBtn]}
              onPress={() => {
                close();
              }}
            >
              <ThemedText style={[styles.btnText, { color }]}>
                {modalProps.cancelText || t("cancel")}
              </ThemedText>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.acceptBtn]}
              onPress={onAccept}
            >
              <ThemedText style={[styles.btnText, { color }]}>
                {modalProps.acceptText || t("accept")}
              </ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 150,
  },
  modalView: {
    margin: 10,
    width: "80%",
    minHeight: 200,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  buttonView: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnText: {
    textTransform: "uppercase",
  },
  cancelBtn: {
    backgroundColor: "red",
    justifyContent: "center",
  },
  acceptBtn: {
    backgroundColor: "blue",
  },
});
