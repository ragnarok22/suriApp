import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import Button from "./Button";
import ModalTextInput from "./ModalTextInput";

type SetPinModalProps = {
  onAccept: (pin: string) => void;
};

export default function SetPinModal({ onAccept }: SetPinModalProps) {
  const backgroundColor = useThemeColor(
    { light: "#ECEDEE", dark: "white" },
    "background",
  );
  const { t } = useTranslation();
  const [pin, setPin] = useState<string>("");

  const handleAccept = () => {
    onAccept(pin);
    setPin("");
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <ThemedText type="subtitle">{t("home.set_pin")}</ThemedText>
      <ModalTextInput
        style={[styles.pin, { backgroundColor }]}
        placeholder={t("home.write_your_pin_here")}
        keyboardType="numeric"
        value={pin}
        onChangeText={setPin}
        maxLength={6}
      />

      <View style={{ marginTop: 16 }}>
        <Button onPress={handleAccept} variant="primary">
          <ThemedText>{t("accept")}</ThemedText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pin: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 12,
  },
});
