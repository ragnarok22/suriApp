import * as Linking from "expo-linking";
import * as SMS from "expo-sms";
import { Carrier } from "@/constants/definitions";
import {
  Alert,
  NativeModules,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
} from "react-native";
const { DirectSMS, DirectCall } = NativeModules;

export async function sendSms(phoneNumber: string, message: string) {
  const isAvailable = await SMS.isAvailableAsync();
  if (!isAvailable) {
    console.log("SMS is not available on this device");
    return;
  }

  const hasPermission = await requestAllSMSPermissions();
  if (!hasPermission) {
    console.log("Permission to send SMS was denied");
    SMS.sendSMSAsync([phoneNumber], message);
    return;
  }

  return await DirectSMS.sendSMS(phoneNumber, message);
}

export async function makeCall(phoneNumber: string) {
  const isGranted = await requestCallPermission();

  if (!isGranted) {
    if (Platform.OS === "web") {
      window.open(`tel:${phoneNumber}`, "_blank");
      return;
    }

    if (Platform.OS === "ios") {
      Linking.openURL(`telprompt:${encodeURIComponent(phoneNumber)}`);
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`);
  }

  if (isGranted) {
    DirectCall.makeCall(phoneNumber);
  }
}

export function getCarrierName(carrierCode: string): Carrier {
  switch (carrierCode) {
    case "TeleG":
      return "telesur";
    case "DIGICEL":
      return "digicel";
    default:
      return "telesur";
  }
}

export function toast(message: string, duration: "short" | "long" = "short") {
  let time;
  switch (duration) {
    case "short":
      time = ToastAndroid.SHORT;
      break;
    case "long":
      time = ToastAndroid.LONG;
      break;
    default:
      time = ToastAndroid.SHORT;
  }

  const os = Platform.OS;
  switch (os) {
    case "android":
      ToastAndroid.show(message, time);
      break;
    case "ios":
      Alert.alert(message);
      break;
    default:
      console.log(message);
  }
}

async function requestAndroidSMSPermission(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("SMS permission granted");
    } else {
      console.log("SMS permission denied", granted);
      toast("Permission to send SMS was denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestSMSPermission() {
  if (Platform.OS === "android") {
    return await requestAndroidSMSPermission();
  }

  if (Platform.OS === "ios") {
    // Implement iOS SMS permission
    return false;
  }

  return false;
}

async function requestAllAndroidSMSPermissions() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
    ]);

    if (
      granted["android.permission.RECEIVE_SMS"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.READ_SMS"] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted["android.permission.SEND_SMS"] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log("SMS permissions granted");
    } else {
      console.log("SMS permissions denied");
      toast("Permission to send SMS was denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestAllSMSPermissions() {
  if (Platform.OS === "android") {
    return await requestAllAndroidSMSPermissions();
  }

  if (Platform.OS === "ios") {
    // Implement iOS SMS permission
    return false;
  }

  return false;
}

async function requestAndroidCallPermission(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Call Phone permission granted");
      return true;
    } else {
      console.log("Call Phone permission denied", granted);
      toast("Permission to make calls was denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
}

export async function requestCallPermission(): Promise<boolean> {
  if (Platform.OS === "android") {
    return await requestAndroidCallPermission();
  }

  if (Platform.OS === "ios") {
    // Implement iOS call permission
    return false;
  }

  if (Platform.OS === "web") {
    // Implement web call permission
    console.log("Web call permission not implemented");
    return false;
  }

  return false;
}
