import { ThemedText } from "@/components/themed";
import SimpleLayout from "@/components/layouts/SimpleLayout";
import { StyleSheet, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function DonateScreen() {
  const { t } = useTranslation();
  const [selectedCurrency, setSelectedCurrency] = useState<'USD' | 'SRD'>('USD');

  return (
    <SimpleLayout style={styles.container}>
      <ThemedText type="title">Donate</ThemedText>
      <ThemedText type="subtitle">Support Our App</ThemedText>
      <ThemedText>Your donations help us improve the app and keep it ad-free. Use the SWIFT information bellow to make a donation:</ThemedText>
      <ThemedText>Your donation is greatly appreciated. All proceeds go directly towards app development and subscriptions costs.</ThemedText>

    </SimpleLayout>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  collapsible: {
    width: '100%',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 12,
  },
});
