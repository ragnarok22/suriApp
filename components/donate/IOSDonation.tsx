import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { MotiView } from "moti";

import CoffeeEmptyIcon from "../icons/CoffeeEmptyIcon";
import CoffeeHotIcon from "../icons/CoffeeHotIcon";
import { ThemedText } from "../themed";
import CoffeeMachineIcon from "../icons/CoffeeMachineIcon";

const options = [
  {
    icon: CoffeeEmptyIcon,
    label: "coffee",
    value: 5,
  },
  {
    icon: CoffeeHotIcon,
    label: "capuccino",
    value: 10,
  },
  {
    icon: CoffeeMachineIcon,
    label: "coffee machine",
    value: 20,
  },
];

export default function IOSDonation() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    // Purchases.setLogLevel(LOG_LEVEL.VERBOSE);
    // Purchases.configure({ apiKey: "appl_pCTDKMBXYwoprBBMiCjQNsThPLu" });
  }, []);

  return (
    <View style={styles.container}>
      {options.map((option, index) => (
        <MotiView
          style={[styles.buttonWrapper, { width: "100%", overflow: "hidden" }]}
          animate={{
            backgroundColor: selected === index ? "#1D3D47" : "transparent",
            borderColor: selected === index ? "#DEE7E7" : "#1D3D47",
          }}
          key={index}
        >
          <Pressable style={[styles.button]} onPress={() => setSelected(index)}>
            <option.icon />
            <ThemedText allowFontScaling adjustsFontSizeToFit>
              {option.label} - ${option.value}
            </ThemedText>
          </Pressable>
        </MotiView>
      ))}
      <Pressable style={[styles.button, styles.donateButton]}>
        <ThemedText
          allowFontScaling
          adjustsFontSizeToFit
          style={{ color: "#1D3D47" }}
        >
          Donate ${options[selected].value} now
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  buttonWrapper: {
    borderRadius: 8,
    borderWidth: 1,
  },
  button: {
    width: "100%",
    flexShrink: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  donateButton: {
    borderRadius: 8,
    backgroundColor: "#DEE7E7",
  },
});
