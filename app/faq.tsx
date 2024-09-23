import { ThemedText } from "@/components/themed";
import SimpleLayout from "@/components/layouts/SimpleLayout";
import { StyleSheet, View } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { useTranslation } from "react-i18next";

export default function FaqScreen() {
  const { t } = useTranslation();

  return (
    <SimpleLayout style={styles.container}>
      <ThemedText type="title">{t('settings.faq')}</ThemedText>

      <View style={{ width: '100%' }}>
        <Collapsible title={t('faq.what_is_suri')} style={styles.collapsible}>
          <ThemedText>{t('faq.what_is_suri_description')}</ThemedText>
        </Collapsible>
        <View style={styles.separator} />

        <Collapsible title={t('faq.how_get_free_sms')} style={styles.collapsible}>
          <ThemedText>{t('faq.how_get_free_sms_description')}</ThemedText>
        </Collapsible>
        <View style={styles.separator} />
      </View>
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
