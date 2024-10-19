import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedView, ThemedText, ThemedFlatList } from "@/components/themed";
import ThemedLayout from "@/components/layouts/ThemedLayout";
import { makeCall } from "@/utils/mobile";
import { useTranslation } from "react-i18next";
import { phones } from "@/constants/data";
import NumberIcon from "@/components/icons/NumberIcon";

type PhoneItemProps = {
  item: { name: string; number: string };
  onPress?: (code: string) => void;
};

const PhoneItem = ({ item, onPress }: PhoneItemProps) => {
  const emptyFunction = () => {};

  const handlePress = () => {
    if (onPress) {
      onPress(item.number);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress || emptyFunction}>
      <ThemedView
        style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
      >
        <ThemedView>
          <NumberIcon size={32} />
        </ThemedView>
        <ThemedView style={{ flexDirection: "column" }}>
          <ThemedText type="subtitle">{item.name}</ThemedText>
          <ThemedText type="defaultSemiBold">{item.number}</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default function PhoneScreen() {
  const { t } = useTranslation();

  const onPress = (phoneNumber: string) => {
    makeCall(phoneNumber);
  };

  return (
    <ThemedLayout headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t("phones.title")}</ThemedText>
        <ThemedView style={styles.list}>
          <ThemedFlatList
            data={phones}
            renderItem={PhoneItem}
            style={{ width: "100%" }}
            onPress={onPress}
          />
        </ThemedView>
      </ThemedView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    color: "white",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  list: {
    width: "100%",
    marginTop: 16,
  },
});
