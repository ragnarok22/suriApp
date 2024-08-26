import { Carrier } from "@/constants/definitions";

export function sendSms(phoneNumber: string, message: string) {
  // Send SMS
}

export function makeCall(phoneNumber: string) {
  // Make a call
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
