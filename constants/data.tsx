import i18next from "@/i18n";
import { HomeActions } from "./definitions";
import PhoneIcon from "@/components/icons/PhoneIcon";
import MoneyIcon from "@/components/icons/MoneyIcon";
import AttachMoneyIcon from "@/components/icons/AttachMoney";
import MoneyTransferIcon from "@/components/icons/MoneyTransferIcon";
import MobileScreenIcon from "@/components/icons/MobileScreenIcon";
import MobileIcon from "@/components/icons/MobileIcon";
import ContactIcon from "@/components/icons/ContactIcon";
const { t } = i18next;

export const data: HomeActions = [
  {
    id: "check_balance",
    icon: <AttachMoneyIcon size={25} />,
    title: t("home.check_balance"),
    description: t("home.check_balance_description"),
  },
  {
    id: "recharge_balance",
    icon: <MoneyIcon size={25} />,
    title: t("home.recharge_balance"),
    description: t("home.recharge_balance_description"),
  },
  {
    id: "transfer_balance",
    icon: <MoneyTransferIcon size={25} />,
    title: t("home.transfer_balance"),
    description: t("home.transfer_balance_description"),
  },
  {
    id: "check_mobile_data",
    icon: <MobileScreenIcon size={25} />,
    title: t("home.check_mobile_data"),
    description: t("home.check_mobile_data_description"),
  },
  {
    id: "recharge_mobile_data",
    icon: <MobileIcon size={25} />,
    title: t("home.recharge_mobile_data"),
    description: t("home.recharge_mobile_data_description"),
  },
  {
    id: "private_number",
    icon: <PhoneIcon size={25} />,
    title: t("home.private_number"),
    description: t("home.private_number_description"),
  },
  {
    id: "phones",
    icon: <ContactIcon size={25} />,
    title: t("home.phones"),
    description: t("home.phones_description"),
  },
];

export const phones = [
  {
    id: "customer_service",
    number: "152",
    name: t("phones.customer_service"),
  },
  {
    id: "get_current_time",
    number: "102",
    name: t("phones.get_current_time"),
  },
  {
    id: "my_phone_number",
    number: "*555#",
    name: t("phones.my_phone_number"),
  },
  {
    id: "firefighters",
    number: "110",
    name: t("phones.firefighters"),
  },
  {
    id: "emergency",
    number: "115",
    name: t("phones.emergency"),
  },
];
