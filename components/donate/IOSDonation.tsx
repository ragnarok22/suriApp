import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";
import { MotiView } from "moti";

import CoffeeEmptyIcon from "../icons/CoffeeEmptyIcon";
import CoffeeHotIcon from "../icons/CoffeeHotIcon";
import { ThemedText } from "../themed";
import CoffeeMachineIcon from "../icons/CoffeeMachineIcon";
import store from "@/store";

const IOS_API_KEY = process.env.EXPO_PUBLIC_IOS_APIKEY;
const options = [
  {
    icon: CoffeeEmptyIcon,
    label: "coffee",
    value: 5,
    identifier: "suri_0499_donation",
  },
  {
    icon: CoffeeHotIcon,
    label: "capuccino",
    value: 10,
    identifier: "suri_0999_donation",
  },
  {
    icon: CoffeeMachineIcon,
    label: "coffee machine",
    value: 20,
    identifier: "suri_1999_donation",
  },
];

export default function IOSDonation() {
  const [selected, setSelected] = useState(0);
  const { setLoading } = store.useGlobalStore();

  useEffect(() => {
    const init = async () => {
      Purchases.configure({ apiKey: IOS_API_KEY! });
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);
    };

    try {
      init();
    } catch (e) {
      console.log("error configure payments", e);
    }
  }, []);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const result = await Purchases.purchaseProduct(
        options[selected].identifier,
      );
      console.log(result);
    } catch (e) {
      console.error(e.message);
    }
    setLoading(false);
  };

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
      <Pressable
        style={[styles.button, styles.donateButton]}
        onPress={handlePurchase}
      >
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
    position: "relative",
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
