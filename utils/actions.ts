import { makeCall, sendSms } from "./mobile";

export function check_balance() {
  console.log('check balance');
  makeCall('*132#');
}

export function recharge_balance(pincode: string) {
  console.log('recharge balance with pincode', pincode);
  makeCall(`*131*${pincode}#`);
}

export function transfer_balance() {
  console.log('transfer balance');
}

export function check_mobile_data() {
  console.log('check mobile data');
  sendSms('4040', 'NET INFO');
}

export function recharge_mobile_data() {
  console.log('recharge mobile data');
}
