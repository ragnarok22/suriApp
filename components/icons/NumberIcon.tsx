import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconProps } from ".";

export default function NumberIcon({
  lightColor,
  darkColor,
  size = 28,
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <MaterialIcons size={size} name="numbers" style={{ color }} />;
}
