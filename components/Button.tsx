import { useMemo } from "react";
import {
  StyleSheet,
  Pressable,
  PressableProps,
  useColorScheme,
} from "react-native";

type ButtonProps = PressableProps & {
  variant?: "primary" | "secondary" | "danger";
};

export default function Button(props: ButtonProps) {
  const colorScheme = useColorScheme() ?? "light";
  const btnBackground = colorScheme === "dark" ? "#1D3D47" : "transparent";
  const btnColor = colorScheme === "dark" ? "white" : "#1D3D47";

  const variant: Record<string, any> = {
    primary: {
      backgroundColor: btnBackground,
      color: btnColor,
      borderColor: "#1D3D47",
    },
    secondary: {
      backgroundColor: "transparent",
      color: "#1D3D47",
      borderColor: "#1D3D47",
    },
    danger: {
      backgroundColor: "red",
      color: "white",
      borderColor: "red",
    },
  };

  const btnStyles = useMemo(
    () => [
      styles.button,
      {
        backgroundColor: variant[props.variant ?? "primary"].backgroundColor,
        color: variant[props.variant ?? "primary"].color,
        borderColor: variant[props.variant ?? "primary"].borderColor,
      },
      props.style,
    ],
    [props.variant, props.style],
  );

  return (
    <Pressable style={[btnStyles]} {...props}>
      {props.children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    flexShrink: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
