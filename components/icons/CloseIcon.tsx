import AntDesign from "@expo/vector-icons/AntDesign";
import { useThemeColor } from "@/hooks/useThemeColor";
import { IconProps } from ".";

export default function CloseIcon({
  lightColor,
  darkColor,
  size = 28,
  ...props
}: IconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");
  return (
    <AntDesign size={size} name="closecircleo" style={{ color }} {...props} />
  );
}
