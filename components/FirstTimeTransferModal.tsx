import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";

type FirstTimeTransferModalProps = {
  open: boolean;
  close: () => void;
  onSetPincode: () => void;
  onHavePincode: () => void;
};

export default function FirstTimeTransferModal({ open, close, onSetPincode, onHavePincode }: FirstTimeTransferModalProps) {
  const { t } = useTranslation();

  return (
    <ThemedModal
      open={open}
      close={onHavePincode}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        close();
      }}
      onAccept={onSetPincode}
      cancelText={t('home.transfer.already_have_pincode')}
      acceptText={t('home.transfer.set_pincode')}
    >
      <ThemedText type="subtitle" style={{ textAlign: 'center' }}>{t('home.first_time_transfer_title')}</ThemedText>
      <ThemedText style={{ marginBottom: 16, marginTop: 8 }}>{t('home.first_time_transfer_text')}</ThemedText>
    </ThemedModal>
  );
}
