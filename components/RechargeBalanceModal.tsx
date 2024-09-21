import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import CameraIcon from "./icons/CameraIcon";
import ScanRechargeCard from "./ScanRechargeCard";

type RechargeBalanceModalProps = {
  open: boolean;
  close: () => void;
  onAccept: (pincode: string) => void;
};

export default function RechargeBalanceModal({ open, close, onAccept }: RechargeBalanceModalProps) {
  const backgroundColor = useThemeColor({ light: '#ECEDEE', dark: 'white' }, 'background');
  const { t } = useTranslation();
  const [pincode, setPincode] = useState<string>('');
  const [showScanCamera, setShowScanCamera] = useState<boolean>(false);

  const handleAccept = () => {
    const isCorrect = validatePincode(pincode)

    if (isCorrect) {
      onAccept(pincode);
      setPincode('');
      close();
    }
  }

  const validatePincode = (pincode: string) => {
    if (pincode.length < 12) {
      Alert.alert(t('home.pincode_error'));
      return false;
    }
    return true;
  }

  const handleClose = () => {
    setPincode('');
    setShowScanCamera(false);
    close();
  }

  return (
    <ThemedModal
      open={open}
      close={handleClose}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      onAccept={handleAccept}
    >
      {showScanCamera ? (
        <View style={{ width: '100%', height: 350 }}>
          <ScanRechargeCard onDone={(card: string) => {
            setPincode(card);
            setShowScanCamera(false);
          }} />
        </View>
      ) : (
        <>
          <ThemedText type="subtitle">{t('home.recharge_balance')}</ThemedText>

          <View style={styles.inputForm}>
            <TextInput
              style={[styles.pincode, { backgroundColor }]}
              placeholder={t('home.write_your_pincode')}
              keyboardType="numeric"
              value={pincode}
              onChangeText={setPincode}
            />
            <Pressable onPress={() => setShowScanCamera(true)}>
              <ThemedText>
                <CameraIcon />
              </ThemedText>
            </Pressable>
          </View>
        </>
      )}
    </ThemedModal >
  );
}

const styles = StyleSheet.create({
  pincode: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    flexGrow: 1,
  },
  inputForm: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    marginTop: 12,
  },
});
