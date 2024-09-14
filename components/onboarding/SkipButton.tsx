import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text, StyleSheet, ButtonProps } from "react-native";

export default function SkipButton({ ...props }: ButtonProps) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.doneButton} {...props}>
      <Text style={styles.doneText}>{t('onboarding.skip')}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  doneButton: {
    padding: 20,
  },
  doneText: {
    color: 'white',
    fontSize: 16,
  },
});
