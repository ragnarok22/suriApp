import { ThemedText } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import Button from "./Button";

type FirstTimeTransferModalProps = {
  onSetPincode: () => void;
  onHavePincode: () => void;
};

export default function FirstTimeTransferModal({ onSetPincode, onHavePincode }: FirstTimeTransferModalProps) {
  const { t } = useTranslation();

  return (
    <View>
      <ThemedText type="subtitle" style={{ textAlign: 'center' }}>{t('home.first_time_transfer_title')}</ThemedText>
      <ThemedText style={{ marginBottom: 16, marginTop: 8 }}>{t('home.first_time_transfer_text')}</ThemedText>

      <View style={styles.buttonContainer}>
        <Button onPress={onHavePincode} variant="danger">
          <ThemedText style={{ marginBottom: 8 }}>{t('home.transfer.already_have_pincode')}</ThemedText>
        </Button>

        <Button onPress={onSetPincode} variant="primary">
          <ThemedText>{t('home.transfer.set_pincode')}</ThemedText>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
});
