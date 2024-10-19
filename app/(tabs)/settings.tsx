import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
  useColorScheme,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { ThemedText, ThemedView } from "@/components/themed";
import { ExternalLink } from "@/components/ExternalLink";
import { toast } from "@/utils/mobile";
import { info } from "@/utils/info";
import { useTranslation } from "react-i18next";
import { useConfig } from "@/hooks/useConfig";
import SimpleLayout from "@/components/layouts/SimpleLayout";
import { useNavigation } from "expo-router";
import Button from "@/components/Button";

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const config = useConfig();
  const colorScheme = useColorScheme() ?? "light";
  const version = info().version;
  const btnBackground = colorScheme === "dark" ? "#1D3D47" : "transparent";
  const btnColor = colorScheme === "dark" ? "white" : "#1D3D47";

  return (
    <SimpleLayout>
      <ScrollView
        style={[styles.container]}
        contentContainerStyle={{ height: "100%" }}
      >
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/suri-logo.png")}
            style={styles.logo}
          />
          <ThemedText type="title">Suri</ThemedText>
          <ThemedText>
            {t("settings.version")} {version}
          </ThemedText>
        </View>

        <View style={{ gap: 12 }}>
          <ThemedText style={[{ textAlign: "center", fontSize: 18 }]}>
            {t("settings.description")}
          </ThemedText>

          <ThemedView style={[styles.contactButton]}>
            <FontAwesome.Button
              name="envelope-o"
              onPress={() => Linking.openURL("https://reinierhernandez.com")}
              backgroundColor={btnBackground}
              color={btnColor}
              style={styles.button}
            >
              {t("settings.contact_developer")}
            </FontAwesome.Button>
          </ThemedView>

          <ThemedView style={styles.contactButton}>
            <FontAwesome.Button
              name="external-link"
              onPress={() =>
                Linking.openURL("https://suri.reinierhernandez.com")
              }
              backgroundColor={btnBackground}
              color={btnColor}
              style={styles.button}
            >
              {t("settings.open_website")}
            </FontAwesome.Button>
          </ThemedView>

          <ThemedView style={styles.contactButton}>
            <FontAwesome.Button
              name="question-circle-o"
              onPress={() => navigation.navigate("faq")}
              backgroundColor={btnBackground}
              color={btnColor}
              style={styles.button}
            >
              {t("settings.faq")}
            </FontAwesome.Button>
          </ThemedView>

          {/*<ThemedView style={styles.contactButton}>
            <FontAwesome.Button
              name="heart-o"
              onPress={() => navigation.navigate("donate")}
              backgroundColor={colorScheme === "dark" ? "white" : "#1D3D47"}
              color={colorScheme === "dark" ? "#1D3D47" : "white"}
              style={styles.button}
            >
              {t("settings.donate")}
            </FontAwesome.Button>
          </ThemedView>*/}
        </View>

        <View style={[{ display: "flex", marginTop: "auto" }]}>
          <Button
            onPress={async () => {
              await config.clear();
              toast(t("settings.config_cleared"));
            }}
          >
            <ThemedText>{t("settings.clear_config")}</ThemedText>
          </Button>

          <ThemedView style={styles.division} />

          <ThemedView style={[styles.view]}>
            <ThemedText style={{ fontSize: 18, marginTop: 18 }}>
              {t("settings.created_by")}{" "}
              <ExternalLink
                href="https://reinierhernandez.com"
                style={styles.link}
                text="Reinier Hernández"
              />
            </ThemedText>
          </ThemedView>
        </View>
      </ScrollView>
    </SimpleLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  logo: {
    width: 120,
    height: 120,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
  },
  view: {
    alignItems: "center",
    backgroundColor: "transparent",
  },
  transparent: {
    backgroundColor: "transparent",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "#0A7EA4",
  },
  button: {
    justifyContent: "center",
    borderColor: "#1D3D47",
    borderWidth: 1,
  },
  division: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    marginVertical: 8,
  },
  provider: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactButton: {
    marginTop: "auto",
  },
});
