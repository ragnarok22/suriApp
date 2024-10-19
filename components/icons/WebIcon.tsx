import Foundation from "@expo/vector-icons/Foundation";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconProps } from ".";

export default function WebIcon({
  lightColor,
  darkColor,
  size = 28,
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return <Foundation name="web" size={size} style={{ color }} />;
}
