import { Alert, StyleSheet, TextInput } from "react-native";
import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";

type SetPinModalProps = {
  open: boolean;
  close: () => void;
  onAccept: (pin: string) => void;
};

export default function SetPinModal({ open, close, onAccept }: SetPinModalProps) {
  const backgroundColor = useThemeColor({ light: '#ECEDEE', dark: 'white' }, 'background');
  const { t } = useTranslation();
  const [pin, setPin] = useState<string>('');

  const handleAccept = () => {
    onAccept(pin);
    setPin('');
    close();
  }

  return (
    <ThemedModal
      open={open}
      close={close}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        close();
      }}
      onAccept={handleAccept}
    >
      <ThemedText type="subtitle">{t('home.set_pin')}</ThemedText>
      <TextInput
        style={[styles.pin, { backgroundColor }]}
        placeholder={t('home.write_your_pin_here')}
        keyboardType="numeric"
        value={pin}
        onChangeText={setPin}
        maxLength={6}
      />
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  pin: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    width: '100%',
    marginTop: 12,
  },
});
