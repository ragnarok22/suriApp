import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { makeCall } from "@/utils/mobile";

type PrivateNumberModalProps = {
  open: boolean;
  close: () => void;
};

export default function PrivateNumberModal({ open, close }: PrivateNumberModalProps) {
  const { t } = useTranslation();

  const handleDeactivate = () => {
    makeCall('#31#');
    close();
  }

  const handleActivate = () => {
    makeCall('*31#');
    close();
  }

  return (
    <ThemedModal
      open={open}
      close={handleDeactivate}
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        close();
      }}
      onAccept={handleActivate}
      cancelText={t('deactivate')}
      acceptText={t('activate')}
    >
      <ThemedText type="subtitle" style={{ textAlign: 'center' }}>{t('home.private_number_title')}</ThemedText>
      <ThemedText style={{ marginBottom: 16, marginTop: 8 }}>{t('home.private_number_text')}</ThemedText>
    </ThemedModal>
  );
}
