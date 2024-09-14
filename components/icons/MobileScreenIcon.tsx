import FontAwesome from '@expo/vector-icons/FontAwesome6';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconProps } from '.';


export default function MobileScreenIcon({ lightColor, darkColor, size = 28 }: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <FontAwesome size={size} name='mobile-screen-button' style={{ color }} />
}
