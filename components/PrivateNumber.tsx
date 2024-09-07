import { Alert, StyleSheet } from "react-native";
import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import { makeCall } from "@/utils/mobile";

type PrivateNumberModalProps = {
  open: boolean;
  close: () => void;
  onAccept: (pincode: string) => void;
};

export default function PrivateNumberModal({ open, close, onAccept }: PrivateNumberModalProps) {
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

  const handleDeactivate = () => {
    makeCall('#31#');
    close();
  }

  const handleActivate = () => {
    makeCall('*31#');
    close();
  }



  return (
    <ThemedModal
      open={open}
      close={handleDeactivate}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        close();
      }}
      onAccept={handleActivate}
      cancelText={t('deactivate')}
      acceptText={t('activate')}
    >
      <ThemedText type="subtitle" style={{ textAlign: 'center' }}>Do you want to activate your private number?</ThemedText>
      <ThemedText style={{ marginBottom: 16, marginTop: 8 }}>When you activate your private number, your number will be hidden from the person you are calling until you deactivate it.</ThemedText>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
});
