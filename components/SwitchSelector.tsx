import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type SwitchSelectorProps = {
  options: { label: string; value: any }[];
  onPress: (value: any) => void;
  children: React.ReactNode;
  initial?: number;
};

export default function SwitchSelector({
  options,
  onPress,
  children,
  initial = 0,
}: SwitchSelectorProps) {
  const [selected, setSelected] = useState(initial);
  const itemColor = useThemeColor({}, "text");
  const switchSelectorBackgroundColor = useThemeColor(
    { light: "#ABABAB", dark: "#27272A" },
    "background",
  );
  const itemBackgroundColor = useThemeColor(
    { light: "white", dark: "black" },
    "background",
  );

  const handlePressItem = (index: number) => {
    setSelected(index);
    onPress(options[index].value);
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.switchSelector,
          { backgroundColor: switchSelectorBackgroundColor },
        ]}
      >
        <View style={styles.switchHeader}>
          {options.map((option, index) => (
            <Pressable
              key={index}
              style={[
                styles.switchSelectorItem,
                selected === index
                  ? { backgroundColor: itemBackgroundColor }
                  : {},
              ]}
              onPress={() => handlePressItem(index)}
            >
              <Text style={[styles.switchItemText, { color: itemColor }]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.switchContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    gap: 8,
  },
  switchSelector: {
    padding: 4,
    borderRadius: 8,
  },
  switchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  switchSelectorItem: {
    borderRadius: 8,
    width: "100%",
    flexShrink: 1,
    padding: 6,
  },
  switchItemText: {
    textAlign: "center",
    padding: 8,
  },
  switchContent: {
    borderWidth: 1,
    borderColor: "#27272A",
    width: "100%",
    padding: 8,
    borderRadius: 8,
  },
});
