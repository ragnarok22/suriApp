import i18next from '@/i18n'
import { HomeActions } from './definitions';
import PhoneIcon from '@/components/icons/PhoneIcon';
const { t } = i18next;

export const data: HomeActions = [{
  id: 'check_balance',
  icon: '💰',
  title: t('home.check_balance'),
  description: t('home.check_balance_description'),
}, {
  id: 'recharge_balance',
  icon: '💳',
  title: t('home.recharge_balance'),
  description: t('home.recharge_balance_description'),
  }, {
    id: 'transfer_balance',
    icon: '💸',
    title: t('home.transfer_balance'),
    description: t('home.transfer_balance_description'),
}, {
  id: 'check_mobile_data',
  icon: '📱',
  title: t('home.check_mobile_data'),
  description: t('home.check_mobile_data_description'),
}, {
  id: 'recharge_mobile_data',
  icon: '📶',
  title: t('home.recharge_mobile_data'),
  description: t('home.recharge_mobile_data_description'),
}, {
  id: 'private_number',
  icon: <PhoneIcon size={25} />,
  title: t('home.private_number'),
  description: t('home.private_number_description'),
}];

export const utils = [{
  "number": "*555#",
  "name": "My Phone number"
}];

export const phones = [{
  "number": "152",
  "name": "Customer Service"
}];
