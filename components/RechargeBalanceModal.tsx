import { Alert, StyleSheet, TextInput } from "react-native";
import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type RechargeBalanceModalProps = {
  open: boolean;
  close: () => void;
  onAccept: (pincode: string) => void;
};

export default function RechargeBalanceModal({ open, close, onAccept }: RechargeBalanceModalProps) {
  const backgroundColor = useThemeColor({ light: '#ECEDEE', dark: 'white' }, 'background');
  const { t } = useTranslation();
  const [pincode, setPincode] = useState<string>('');

  const handleAccept = () => {
    const isCorrect = validatePincode(pincode)

    if (isCorrect) {
      onAccept(pincode);
      setPincode('');
      close();
    }
  }

  const validatePincode = (pincode: string) => {
    if (pincode.length < 12) {
      Alert.alert(t('home.pincode_error'));
      return false;
    }
    return true;
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
        style={[styles.pincode, { backgroundColor }]}
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
    borderRadius: 4,
    width: '100%',
    marginTop: 12,
  },
});
