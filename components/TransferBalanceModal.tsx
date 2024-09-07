import { PermissionsAndroid, Pressable, StyleSheet, TextInput, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as Contacts from 'expo-contacts';

import { ThemedText, ThemedModal } from "@/components/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContactIcon from "./icons/ContactIcon";

type TransferBalanceModalProps = {
  open: boolean;
  close: () => void;
  onAccept: (phoneNumber: string) => void;
};

export default function TransferBalanceModal({ open, close, onAccept }: TransferBalanceModalProps) {
  const backgroundColor = useThemeColor({ light: '#ECEDEE', dark: 'white' }, 'background');
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleAccept = () => {
    onAccept(phoneNumber);
    setPhoneNumber('');
    close();
  }

  const handleOpenContacts = async () => {
    // const response = await Contacts.requestPermissionsAsync();
    const response = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
    console.log(response)
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
      acceptText={t('home.transfer.transfer')}
    >
      <ThemedText type="subtitle">{t('home.transfer.transfer_title')}</ThemedText>

      <View style={styles.inputView}>
        <TextInput
          style={[styles.phone, { backgroundColor }]}
          placeholder={t('home.transfer.write_phone_number')}
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Pressable onPress={handleOpenContacts}>
          <ContactIcon size={40} />
        </Pressable>
      </View>
    </ThemedModal>
  );
}

const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    width: '100%',
    marginTop: 16,
  },
  phone: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    flex: 1,
  },
});
