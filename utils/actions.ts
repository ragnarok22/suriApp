import { makeCall, requestAllSMSPermissions, sendSms } from "./mobile";

export function check_balance() {
  makeCall('*132#');
}

export function recharge_balance(pincode: string) {
  makeCall(`*131*${pincode}#`);
}

export function transfer_balance() {
  console.log('transfer balance');
}

export async function check_mobile_data() {
  await requestAllSMSPermissions();
  sendSms('4040', 'NET INFO');
}

export function recharge_mobile_data() {
  console.log('recharge mobile data');
}

export function extract_balance(message: string) {
  console.log('extract balance');
  const regexData = /(\d+)\s*MB/;
  const matchData = message.match(regexData);
  if (matchData) {
    console.log(`Data saldo: ${matchData[1]} MB`);
    return matchData[1];
  }
}

export function check_buy_message(message: string) {
  const regexBuyData = /Zend A/;
  const matchBuyData = regexBuyData.test(message);
  return !!matchBuyData;
}
