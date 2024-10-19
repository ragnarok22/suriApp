import { useTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, ButtonProps } from "react-native";
import { ThemedText } from "../themed";

export default function NextButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <ThemedText>{t("onboarding.next")}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  doneButton: {
    padding: 20,
  },
});
