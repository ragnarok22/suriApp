import { type ComponentProps } from 'react';
import { Modal, Pressable, StyleSheet } from "react-native";
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';
import { useTranslation } from 'react-i18next';

type ThemedModalProps = ComponentProps<typeof Modal> & {
  open: boolean;
  close: () => void;
  children: React.ReactNode;
  onAccept: () => void;
};

export default function ThemedModal({ children, open, close, onAccept, ...modalProps }: ThemedModalProps) {
  const { t } = useTranslation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close();
      }}
      {...modalProps}
    >
      <ThemedView style={styles.centeredView}>
        <ThemedView style={styles.modalView}>
          {children}
          <ThemedView style={styles.buttonView}>
            <Pressable
              style={[styles.btn, styles.cancelBtn]}
              onPress={() => {
                close();
              }}
            >
              <ThemedText style={[styles.btnText]}>{t('cancel')}</ThemedText>
            </Pressable>
            <Pressable
              style={[styles.btn, styles.acceptBtn]}
              onPress={onAccept}
            >
              <ThemedText style={[styles.btnText]}>{t('accept')}</ThemedText>
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
  },
  modalView: {
    margin: 10,
    width: "80%",
    minHeight: 200,
    backgroundColor: "rgb(50, 50, 50)",
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
  },
  buttonView: {
    width: '100%',
    gap: 12,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: "space-between",
    marginTop: 'auto',
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnText: {
    textTransform: 'uppercase',
  },
  cancelBtn: {
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  acceptBtn: {
    backgroundColor: 'blue',
  }
});
