import { Alert, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedText, ThemedModal } from "@/components/themed";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useThemeColor } from "@/hooks/useThemeColor";
import CameraIcon from "./icons/CameraIcon";
import ScanRechargeCard from "./ScanRechargeCard";
import CloseIcon from "./icons/CloseIcon";

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
    const pin = pincode.replace(/\s/g, '');
    const isCorrect = validatePincode(pin)

    if (isCorrect) {
      onAccept(pin);
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

  const handleOnChangePincode = (pincode: string) => {
    // Pincodes are 12 digits long, so we add a space every 4 digits
    if (pincode.length > 14) return;

    setPincode(pincode.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim());
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
        <View style={{ width: '100%', height: 350, position: 'relative' }}>
          <Pressable style={styles.closeBtn} onPress={() => setShowScanCamera(false)}>
            <CloseIcon lightColor="white" />
          </Pressable>
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
              onChangeText={handleOnChangePincode}
            />
            {Platform.OS === 'android' && (
              <Pressable onPress={() => setShowScanCamera(true)}>
                <ThemedText>
                  <CameraIcon />
                </ThemedText>
              </Pressable>
            )}
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
  closeBtn: {
    position: 'absolute',
    top: 20,
    right: 5,
    zIndex: 1,
  }
});
