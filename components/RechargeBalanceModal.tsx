import { Alert, StyleSheet, TextInput } from "react-native";
import { ThemedText } from "./themed/ThemedText";
import ThemedModal from "./themed/ThemedModal";
import { useTranslation } from "react-i18next";
import { useState } from "react";

type RechargeBalanceModalProps = {
  open: boolean;
  close: () => void;
  onAccept: (pincode: string) => void;
};

export default function RechargeBalanceModal({ open, close, onAccept }: RechargeBalanceModalProps) {
  const { t } = useTranslation();
  const [pincode, setPincode] = useState<string>('');

  const handleAccept = () => {
    onAccept(pincode);
    setPincode('');
    close();
  }

  return (
    <ThemedModal
      open={open}
      close={close}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        console.log("Modal has been closed.");
        close();
      }}
      onAccept={handleAccept}
    >
      <ThemedText type="subtitle">{t('home.recharge_balance')}</ThemedText>
      <TextInput
        style={styles.pincode}
        placeholder={t('home.write_your_pincode')}
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
      />
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  pincode: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    width: '100%',
    marginTop: 12,
  },
});
