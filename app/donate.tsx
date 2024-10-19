import { Platform, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

import { ThemedText } from "@/components/themed";
import SimpleLayout from "@/components/layouts/SimpleLayout";
import AndroidDonation from "@/components/donate/AndroidDonation";
import IOSDonation from "@/components/donate/IOSDonation";

export default function DonateScreen() {
  const { t } = useTranslation();

  return (
    <SimpleLayout style={styles.container}>
      <ThemedText type="title">{t("donate.donate")}</ThemedText>
      <ThemedText type="subtitle">{t("donate.subtitle")}</ThemedText>
      <ThemedText>{t("donate.headline_1")}</ThemedText>
      <ThemedText>{t("donate.headline_2")}</ThemedText>

      {Platform.OS === "android"
        ? <AndroidDonation />
        : <IOSDonation />
      }

    </SimpleLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  collapsible: {
    width: "100%",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginVertical: 12,
  },
});
