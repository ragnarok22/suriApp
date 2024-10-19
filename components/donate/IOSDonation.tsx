import { Pressable, StyleSheet, View } from "react-native";
import CoffeeEmptyIcon from "../icons/CoffeeEmptyIcon";
import CoffeeHotIcon from "../icons/CoffeeHotIcon";
import { ThemedText } from "../themed";
import CoffeeMachineIcon from "../icons/CoffeeMachineIcon";

const options = [{
  icon: CoffeeEmptyIcon,
  label: "coffee",
  value: 5,
}, {
  icon: CoffeeHotIcon,
  label: "capuccino",
  value: 10,
}, {
  icon: CoffeeMachineIcon,
  label: "coffee machine",
  value: 20,
}]

export default function IOSDonation() {
  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <Pressable style={styles.button} key={index}>
          <option.icon />
          <ThemedText allowFontScaling adjustsFontSizeToFit>
            {option.label} - ${option.value}
          </ThemedText>
        </Pressable>
      ))}
      <Pressable style={styles.button}>
        <ThemedText allowFontScaling adjustsFontSizeToFit>
          Donate
        </ThemedText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  button: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#1D3D47",
    flexShrink: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
});
