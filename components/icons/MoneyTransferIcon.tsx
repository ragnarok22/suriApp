import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconProps } from '.';


export default function MoneyTransferIcon({ lightColor, darkColor, size = 28 }: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <FontAwesome size={size} name='money-bill-transfer' style={{ color }} />
}
