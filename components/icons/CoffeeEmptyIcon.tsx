import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconProps } from ".";

export default function CoffeeEmptyIcon({
  lightColor,
  darkColor,
  size = 28,
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <MaterialCommunityIcons
      size={size}
      name="coffee-outline"
      style={{ color }}
    />
  );
}
