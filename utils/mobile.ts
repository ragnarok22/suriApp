import * as Linking from 'expo-linking';
import * as SMS from 'expo-sms';
import { Carrier } from "@/constants/definitions";

export async function sendSms(phoneNumber: string, message: string) {
  const isAvailable = await SMS.isAvailableAsync();

  if (isAvailable) {
    return await SMS.sendSMSAsync([phoneNumber], message);
  }

  console.log('SMS is not available on this device');
}

export function makeCall(phoneNumber: string) {
  Linking.openURL(`tel:${phoneNumber}`);
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
