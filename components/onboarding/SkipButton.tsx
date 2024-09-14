import { useTranslation } from "react-i18next";
import { TouchableOpacity, StyleSheet, ButtonProps } from "react-native";
import { ThemedText } from "../themed";

export default function SkipButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <ThemedText>{t('onboarding.skip')}</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  doneButton: {
    padding: 20,
  },
});