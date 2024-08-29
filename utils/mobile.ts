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
  const isGranted = await requestCallPermission();
  if (isGranted) {
    DirectCall.makeCall(phoneNumber);
  }
}

export function getCarrierName(carrierCode: string): Carrier {
  switch (carrierCode) {
    case 'TeleG':
      return 'telesur';
    case 'DIGICEL':
      return 'digicel';
    default:
      return 'telesur';
  }
}

export async function requestSMSPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("SMS permission granted");
    } else {
      console.log("SMS permission denied", granted);
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestAllSMSPermissions() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    ]);

    if (
      granted['android.permission.RECEIVE_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.READ_SMS'] === PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('SMS permissions granted');
    } else {
      console.log('SMS permissions denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestCallPermission(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Call Phone permission granted");
      return true;
    } else {
      console.log("Call Phone permission denied", granted);
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}
