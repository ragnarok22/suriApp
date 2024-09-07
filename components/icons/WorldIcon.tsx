import Fontisto from '@expo/vector-icons/Fontisto';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconProps } from '.';

export default function WorldIcon({ lightColor, darkColor, size = 28 }: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <Fontisto name='world-o' size={size} style={{ color }} />;
}
