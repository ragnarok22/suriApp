import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconProps } from ".";

export default function KeyIcon({
  lightColor,
  darkColor,
  size = 28,
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <FontAwesome6 size={size} name="key" style={{ color }} />;
}
