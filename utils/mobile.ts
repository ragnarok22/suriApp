import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';
import { Carrier } from "@/constants/definitions";
import { NativeModules, PermissionsAndroid } from 'react-native';
const { DirectSMS, DirectCall } = NativeModules;

export async function sendSms(phoneNumber: string, message: string) {
  const isAvailable = await SMS.isAvailableAsync();

  if (isAvailable) {
    // return await SMS.sendSMSAsync([phoneNumber], message);
    return await DirectSMS.sendSMS(phoneNumber, message);
  }

  console.log('SMS is not available on this device');
}

export async function makeCall(phoneNumber: string) {
  // Linking.openURL(`tel:${phoneNumber}`);
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      DirectCall.makeCall(phoneNumber);
    } else {
      console.log("Call Phone permission denied", granted);
    }
  } catch (err) {
    console.warn(err);
  }
}

export function getCarrierName(carrierCode: string): Carrier {
  switch (carrierCode) {
    case 'TeleG':
      return 'telesur';
    case 'Digic':
      return 'digicel';
    default:
      return 'telesur';
  }
}
