import { StyleSheet, TextInput, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as Contacts from "expo-contacts";

import { ThemedText } from "@/components/themed";
import { useThemeColor } from "@/hooks/useThemeColor";
import ContactIcon from "./icons/ContactIcon";
import { toast } from "@/utils/mobile";
import Button from "./Button";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import KeyIcon from "./icons/KeyIcon";

type TransferBalanceModalProps = {
  onAccept: (
    phoneNumber: string,
    amount: number,
    pincode: string,
  ) => Promise<void>;
};

export default function TransferBalanceModal({
  onAccept,
}: TransferBalanceModalProps) {
  const backgroundColor = useThemeColor(
    { light: "#ECEDEE", dark: "white" },
    "background",
  );
  const placeholderTextColor = useThemeColor(
    { light: "#A1A1A1", dark: "#A1A1A1" },
    "text",
  );
  const { t } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [amount, setAmount] = useState<string>("0");
  const [pincode, setPincode] = useState<string>("");

  const handleAccept = async () => {
    const saldo = parseInt(amount);
    if (saldo <= 0) {
      toast(t("home.transfer.amount_error"));
      return;
    }

    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      toast(t("home.transfer.phone_number_error"));
      return;
    }

    if (!pincode || !validatePincode(pincode)) {
      toast(t("home.transfer.pincode_error"));
      return;
    }

    await onAccept(phoneNumber, saldo, pincode);
    cleanForm();
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    return phoneNumber.length === 7;
  };

  const validatePincode = (pincode: string): boolean => {
    return pincode.length === 6;
  };

  const cleanForm = () => {
    setPhoneNumber("");
    setAmount("0");
    setPincode("");
  };

  const handleOpenContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== Contacts.PermissionStatus.GRANTED) {
      toast(t("home.transfer.contacts_permission_error"));
    }

    console.log("permission granted");
    const { data } = await Contacts.getContactsAsync();
    console.log("contacts");
    console.log(data[0]);
  };

  return (
    <View>
      <ThemedText type="subtitle">
        {t("home.transfer.transfer_title")}
      </ThemedText>

      <View style={styles.inputContainerView}>
        <View style={styles.inputView}>
          <BottomSheetTextInput
            style={[styles.input, { backgroundColor, borderRadius: 4 }]}
            placeholder={t("home.transfer.write_phone_number")}
            placeholderTextColor={placeholderTextColor}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={7}
          />
          {/**<Pressable onPress={handleOpenContacts}>
          <ContactIcon size={40} />
        </Pressable>**/}
        </View>
        <View style={styles.inputForm}>
          <View style={[styles.inputLabel]}>
            <KeyIcon size={16} darkColor="black" />
          </View>
          <BottomSheetTextInput
            style={[styles.input, { backgroundColor }]}
            placeholder={t("home.transfer.write_pincode")}
            placeholderTextColor={placeholderTextColor}
            keyboardType="numeric"
            value={pincode}
            onChangeText={setPincode}
            maxLength={6}
          />
        </View>
        <View style={styles.inputForm}>
          <Text style={styles.inputLabel}>SRD</Text>
          <BottomSheetTextInput
            style={[styles.input, { backgroundColor }]}
            placeholder={t("home.transfer.write_amount")}
            placeholderTextColor={placeholderTextColor}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
      </View>

      <View>
        <Button onPress={handleAccept} variant="primary">
          <ThemedText>{t("home.transfer.transfer")}</ThemedText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerView: {
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
    gap: 12,
  },
  inputView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 4,
    width: "100%",
    marginTop: 16,
  },
  inputForm: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
    maxHeight: 42,
  },
  inputLabel: {
    backgroundColor: "#ECEDEE",
    paddingVertical: 10,
    paddingHorizontal: 8,
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 42,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    flexGrow: 1,
    height: "100%",
  },
});
