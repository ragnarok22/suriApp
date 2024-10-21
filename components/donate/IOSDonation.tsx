import { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Purchases, { LOG_LEVEL, PurchasesPackage } from "react-native-purchases";
import { MotiView } from "moti";

import CoffeeEmptyIcon from "../icons/CoffeeEmptyIcon";
import CoffeeHotIcon from "../icons/CoffeeHotIcon";
import { ThemedText } from "../themed";
import CoffeeMachineIcon from "../icons/CoffeeMachineIcon";
import { toast } from "@/utils/mobile";

const IOS_API_KEY = process.env.IOS_API_KEY;
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
  const [packages, setPackages] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    const init = async () => {
      Purchases.configure({ apiKey: IOS_API_KEY! });
      Purchases.setLogLevel(LOG_LEVEL.DEBUG);

      loadOfferings();
    };

    init();
  }, []);

  const loadOfferings = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log(offerings);
      if (offerings.current) {
        const { availablePackages } = offerings.current;
        console.log(availablePackages);
        setPackages(availablePackages);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePurchase = async () => {
    try {
      await Purchases.purchasePackage(packages[selected]);
    } catch (e) {
      toast("Something went wrong, please try again later");
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      {packages.map((pack, index) => (
        <MotiView
          style={[styles.buttonWrapper, { width: "100%", overflow: "hidden" }]}
          animate={{
            backgroundColor: selected === index ? "#1D3D47" : "transparent",
            borderColor: selected === index ? "#DEE7E7" : "#1D3D47",
          }}
          key={index}
        >
          <Pressable style={[styles.button]} onPress={() => setSelected(index)}>
            <ThemedText allowFontScaling adjustsFontSizeToFit>
              {pack.product.title} - ${pack.product.price}
            </ThemedText>
          </Pressable>
        </MotiView>
      ))}
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
