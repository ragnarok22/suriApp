import { Pressable, StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import * as Clipboard from "expo-clipboard";

import { ThemedText } from "@/components/themed";
import SwitchSelector from "@/components/SwitchSelector";
import CopyIcon from "@/components/icons/CopyIcon";
import { toast } from "@/utils/mobile";

const bankInfo = {
  USD: {
    bank: "FINABANK N.V.",
    swift: "FBNASRPA",
    account: "1001726688",
    beneficiary: "Reinier Hernandez Avila",
  },
  SRD: {
    bank: "FINABANK N.V.",
    swift: "FBNASRPA",
    account: "1001726664",
    beneficiary: "Reinier Hernandez Avila",
  },
};

export default function AndroidDonation() {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState<"USD" | "SRD">(
    "USD",
  );
  const options = [
    {
      label: "USD",
      value: "USD",
    },
    {
      label: "SRD",
      value: "SRD",
    },
  ];

  const copyToClipboard = (text: string) => {
    Clipboard.setStringAsync(text);
    toast(t("donate.copied_to_clipboard"));
  };

  return (
    <SwitchSelector
      options={options}
      onPress={(value) => setSelectedCurrency(value)}
    >
      <View>
        <ThemedText type="subtitle">
          {selectedCurrency === "SRD" ? t("donate.srd") : t("donate.usd")}
        </ThemedText>
        <ThemedText>
          {t("donate.bank_subtitle") +
            selectedCurrency +
            t("donate.donations")}
        </ThemedText>
      </View>

      <View style={{ marginTop: 16, gap: 8 }}>
        <View style={styles.rowInfo}>
          <ThemedText>{t("donate.account_holder")}</ThemedText>
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              width: "100%",
              flexShrink: 1,
            }}
          >
            <ThemedText
              style={{
                flexWrap: "wrap",
                maxWidth: "80%",
                marginLeft: "auto",
              }}
            >
              {bankInfo[selectedCurrency].beneficiary}
            </ThemedText>
            <Pressable
              onPress={() =>
                copyToClipboard(bankInfo[selectedCurrency].beneficiary)
              }
            >
              <CopyIcon lightColor="black" darkColor="white" size={20} />
            </Pressable>
          </View>
        </View>

        <View style={styles.rowInfo}>
          <ThemedText>{t("donate.swift_code")}</ThemedText>
          <View
            style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
          >
            <ThemedText>{bankInfo[selectedCurrency].swift}</ThemedText>
            <Pressable
              onPress={() =>
                copyToClipboard(bankInfo[selectedCurrency].swift)
              }
            >
              <CopyIcon lightColor="black" darkColor="white" size={20} />
            </Pressable>
          </View>
        </View>

        <View style={styles.rowInfo}>
          <ThemedText>{t("donate.account_number")}</ThemedText>
          <View
            style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
          >
            <ThemedText>{bankInfo[selectedCurrency].account}</ThemedText>
            <Pressable
              onPress={() =>
                copyToClipboard(bankInfo[selectedCurrency].account)
              }
            >
              <CopyIcon lightColor="black" darkColor="white" size={20} />
            </Pressable>
          </View>
        </View>

        <View style={styles.rowInfo}>
          <ThemedText>{t("donate.bank_name")}</ThemedText>
          <View style={styles.rowItem}>
            <ThemedText>{bankInfo[selectedCurrency].bank}</ThemedText>
            <Pressable
              onPress={() => copyToClipboard(bankInfo[selectedCurrency].bank)}
            >
              <CopyIcon lightColor="black" darkColor="white" size={20} />
            </Pressable>
          </View>
        </View>
      </View>
    </SwitchSelector>
  )
}

const styles = StyleSheet.create({
  rowInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowItem: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    maxWidth: "45%",
  },
});
