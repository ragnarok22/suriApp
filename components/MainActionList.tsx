import { Action, HomeActions } from "@/constants/definitions";
import { ThemedFlatList } from "./themed/ThemedFlatList";
import { TouchableOpacity } from "react-native";
import { ThemedText } from "./themed/ThemedText";
import { ThemedView } from "./themed/ThemedView";
import { check_balance, check_mobile_data, reload_balance, reload_mobile_data, transfer_balance } from "@/utils/actions";

const data: HomeActions = [{
  id: 'check_balance',
  icon: '💰',
  title: 'Consultar saldo',
  description: 'Consulta el saldo de tu cuenta'
}, {
  id: 'reload_balance',
  icon: '💳',
  title: 'Recargar saldo',
  description: 'Recarga saldo a tu cuenta'
}, {
  id: 'transfer_balance',
  icon: '💸',
  title: 'Transferir saldo',
  description: 'Transfiere saldo a otro usuario'
}, {
  id: 'check_mobile_data',
  icon: '📱',
  title: 'Consultar datos móviles',
  description: 'Consulta el saldo de tus datos móviles'
}, {
  id: 'reload_mobile_data',
  icon: '📶',
  title: 'Recargar datos móviles',
  description: 'Recarga saldo a tus datos móviles'
}];

type ItemProps = {
  item: Action
  onPress: () => void
}

type ActionItemsProps = {
  item: Action
  index: number
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

const ActionItem = ({ item }: ActionItemsProps) => {
  const onPress = () => {
    switch (item.id) {
      case 'check_balance':
        check_balance();
        break;
      case 'reload_balance':
        reload_balance();
        break;
      case 'transfer_balance':
        transfer_balance();
        break;
      case 'check_mobile_data':
        check_mobile_data();
        break;
      case 'reload_mobile_data':
        reload_mobile_data();
        break;
    }
  }
  return (
    <ThemedView key={item.id}>
      <Item item={item} onPress={onPress} />
    </ThemedView>
  )
}

export default function MainActionList() {
  return <ThemedFlatList data={data} renderItem={ActionItem} style={{ width: '100%' }} />
}
