import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useThemeColor } from '@/hooks/useThemeColor';
import { IconProps } from '.';


export default function CameraIcon({ lightColor, darkColor, size = 28 }: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  return <FontAwesome size={size} name='camera' style={{ color }} />
}