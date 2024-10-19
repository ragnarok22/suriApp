import Feather from "@expo/vector-icons/Feather";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconProps } from ".";

export default function CopyIcon({
  lightColor,
  darkColor,
  size = 28,
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <Feather size={size} name="copy" style={{ color }} />;
}
