import { ThemedText } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { makeCall } from "@/utils/mobile";
import { StyleSheet, View } from "react-native";
import Button from "./Button";

type PrivateNumberModalProps = {};

export default function PrivateNumberModal({}: PrivateNumberModalProps) {
  const { t } = useTranslation();

  const handleDeactivate = () => {
    makeCall("#31#");
  };

  const handleActivate = () => {
    makeCall("*31#");
  };

  return (
    <View>
      <ThemedText type="subtitle" style={{ textAlign: "center" }}>
        {t("home.private_number_title")}
      </ThemedText>
      <ThemedText style={{ marginBottom: 16, marginTop: 8 }}>
        {t("home.private_number_text")}
      </ThemedText>

      <View style={styles.buttonContainer}>
        <Button onPress={handleDeactivate} variant="danger">
          <ThemedText lightColor="white">{t("deactivate")}</ThemedText>
        </Button>

        <Button onPress={handleActivate} variant="primary">
          <ThemedText>{t("activate")}</ThemedText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 8,
  },
});
