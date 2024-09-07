import { useEffect, useState } from "react";
import { Alert, DeviceEventEmitter, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { Action } from "@/constants/definitions";
import { ThemedFlatList, ThemedText, ThemedView } from "@/components/themed";
import { check_balance, check_buy_message, check_mobile_data, extract_balance, recharge_balance, set_p2p_pin, transfer_balance } from "@/utils/actions";
import i18next from '@/i18n'
import RechargeBalanceModal from "./RechargeBalanceModal";
import { sendSms } from "@/utils/mobile";
import { data } from "@/constants/data";
import PrivateNumberModal from "./PrivateNumber";
import SetPinModal from "./SetPinModal";
import FirstTimeTransferModal from "./FirstTimeTransferModal";
import TransferBalanceModal from "./TransferBalanceModal";
const { t } = i18next;


type ItemProps = {
  item: Action
  onPress: () => void
}

type ActionItemsProps = {
  item: Action
  index: number
  onPress?: (item_id: string) => void
}

const Item = ({ item, onPress }: ItemProps) => (
  <TouchableOpacity onPress={onPress}>
    <ThemedView style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <ThemedView style={{ width: 40 }}>
        <ThemedText>{item.icon}</ThemedText>
      </ThemedView>
      <ThemedView style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <ThemedText type="subtitle">{item.title}</ThemedText>
        <ThemedText>{item.description}</ThemedText>
      </ThemedView>
    </ThemedView>
  </TouchableOpacity>
)

const ActionItem = ({ item, onPress }: ActionItemsProps) => {
  const emptyFunction = () => { }

  const handlePress = () => {
    if (onPress) {
      onPress(item.id)
    }
  }

  return (
    <>
      <ThemedView key={item.id}>
        <Item item={item} onPress={handlePress || emptyFunction} />
      </ThemedView>
    </>
  )
}

type ModalType = "recharge_balance" | "first_time_transfer" | "set_p2p_pin" | "transfer_balance" | "private_number";

export default function MainActionList() {
  const [modalVisible, setModalVisible] = useState<ModalType | null>();

  useEffect(() => {
    const subscription = DeviceEventEmitter.addListener('SMSReceived', (message) => {
      if (message.sender == '4040') {
        if (check_buy_message(message.message)) {
          console.log('send A to confirm')
          sendSms('4040', 'A');
          return
        }
        if (message.message.includes('onvoldoende saldo')) {
          Alert.alert(t('home.error'), t('home.error_insufficient_balance'));
          return;
        }
        if (message.message.includes('rekening gebracht')) {
          Alert.alert(t('home.success'), t('home.success_recharge_balance'));
          return;
        }
        const balance = extract_balance(message.message);
        if (balance) {
          Alert.alert(t('home.data_saldo'), `${balance} MB`);
        }
      }
    })

    return () => {
      subscription.remove();
    }
  }, [])

  const onPress = async (item_id: string) => {
    switch (item_id) {
      case 'check_balance':
        check_balance();
        break;
      case 'recharge_balance':
        setModalVisible('recharge_balance')
        break;
      case 'set_p2p_pin':
        setModalVisible('set_p2p_pin');
        break;
      case 'transfer_balance': {
        const hasPin = false;

        if (!hasPin) {
          setModalVisible('first_time_transfer');
        } else {
          setModalVisible('transfer_balance');
        }
        break;
      }
      case 'check_mobile_data':
        await check_mobile_data();
        break;
      case 'recharge_mobile_data':
        router.push('/mobile');
        break;
      case 'private_number':
        setModalVisible('private_number');
        break;
    }
  }

  const isRechageBalanceOpen = modalVisible === 'recharge_balance';
  const closeRechargeBalanceModal = () => setModalVisible(null);
  const handleRechageBalance = (pincode: string) => {
    recharge_balance(pincode);
  }

  const isFirstTimeTransferOpen = modalVisible === 'first_time_transfer';
  const closeFirstTimeTransferModal = () => setModalVisible(null);
  const handleSetPincode = () => setModalVisible('set_p2p_pin');
  const handleIHavePincode = () => setModalVisible('transfer_balance');

  const isSetP2PPingOpen = modalVisible === 'set_p2p_pin';
  const closeSetP2PPingModal = () => setModalVisible(null);
  const handleSetP2PPing = (ping: string) => {
    set_p2p_pin(ping);
  }

  const isTransferBalanceOpen = modalVisible === 'transfer_balance';
  const closeTransferBalanceModal = () => setModalVisible(null);
  const handleTransferBalance = async (phone_number: string, amount: number, pincode: string) => {
    await transfer_balance(pincode, amount, phone_number);
  }

  const isPrivateNumberOpen = modalVisible === 'private_number';
  const closePrivateNumberModal = () => setModalVisible(null);

  return (
    <>
      <RechargeBalanceModal open={isRechageBalanceOpen} close={closeRechargeBalanceModal} onAccept={handleRechageBalance} />
      <FirstTimeTransferModal open={isFirstTimeTransferOpen} close={closeFirstTimeTransferModal} onSetPincode={handleSetPincode} onHavePincode={handleIHavePincode} />
      <SetPinModal open={isSetP2PPingOpen} close={closeSetP2PPingModal} onAccept={handleSetP2PPing} />
      <TransferBalanceModal open={isTransferBalanceOpen} close={closeTransferBalanceModal} onAccept={handleTransferBalance} />
      <PrivateNumberModal open={isPrivateNumberOpen} close={closePrivateNumberModal} />
      <ThemedFlatList data={data} renderItem={ActionItem} style={{ width: '100%' }} onPress={onPress} />
    </>
  )
}
