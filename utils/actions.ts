import { makeCall, requestAllSMSPermissions, sendSms } from "./mobile";

export function check_balance() {
  makeCall('*132#');
}

export function recharge_balance(pincode: string) {
  makeCall(`*131*${pincode}#`);
}

export async function set_p2p_pin(ping: string) {
  await sendSms('134', `SET ${ping}`);
}

export async function check_mobile_data() {
  await requestAllSMSPermissions();
  sendSms('4040', 'NET INFO');
}

export async function transfer_balance(pincode: string, amount: number, phone_number: string) {
  await sendSms('134', `p2p ${pincode} ${amount} ${phone_number}`);
}

export function extract_balance(message: string) {
  const regexData = /(\d+(\.\d+)?)\s*MB/;
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

export function humanize_data(data: number) {
  if (data < 1024) {
    return `${data} MB`;
  } else {
    return `${data / 1024} GB`;
  }
}

export function getRechargeNumber(text: string): string | null {
  const regex = /\d{4} \d{4} \d{4}/g;
  const cardNumber = text.match(regex);

  if (cardNumber) {
    return cardNumber[0];
  }

  return null;
}
