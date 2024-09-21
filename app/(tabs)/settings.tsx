import { useEffect, useState } from 'react';
import * as Cellular from 'expo-cellular';
import { Button, Linking, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ThemedText, ThemedView } from '@/components/themed';
import { ExternalLink } from '@/components/ExternalLink';
import { Carrier } from '@/constants/definitions';
import { getCarrierName, toast } from '@/utils/mobile';
import { info } from '@/utils/info';
import { useTranslation } from 'react-i18next';
import { useConfig } from '@/hooks/useConfig';
import ThemedLayout from '@/components/layouts/ThemedLayout';

export default function SettingsScreen() {
  const { t } = useTranslation();
  const config = useConfig();
  const colorScheme = useColorScheme() ?? 'light';
  const [carrier, setCarrier] = useState<Carrier>('telesur');
  const version = info().version;

  useEffect(() => {
    Cellular.getCarrierNameAsync().then((carrier) => {
      setCarrier(getCarrierName(carrier || 'TeleG'));
    });
  }, []);

  return (
    <ThemedLayout headerBackgroundColor={{ dark: '#1D3D47', light: '#A1CEDC' }}>
      <ScrollView style={[styles.container]} contentContainerStyle={{ height: '100%' }}>
        <ThemedView style={styles.view}>
          <ThemedText>{t('settings.version')} {version}</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.transparent]}>
          <ThemedText style={[{ textAlign: 'center', fontSize: 18 }]}>{t('settings.description')}</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.transparent, styles.provider]}>
          <ThemedText>{t('settings.provider')}:</ThemedText>
          <Picker
            selectedValue={carrier}
            onValueChange={(itemValue) => setCarrier(itemValue)}
            style={{ width: 150, color: colorScheme === 'dark' ? 'white' : 'black' }}
          >
            <Picker.Item label="Telesur" value="telesur" />
            {/**<Picker.Item label="Digicel" value="digicel" />**/}
          </Picker>
        </ThemedView>

        <ThemedView style={[{ display: 'flex', gap: 12, marginTop: 'auto' }, styles.transparent]}>
          <Button
            title={t('settings.clear_config')}
            onPress={async () => {
              await config.clear()
              toast(t('settings.config_cleared'))
            }}
          />

          <ThemedView style={styles.division} />
          <ThemedView style={[styles.contactButton]}>
            <Button
              title={t('settings.contact_developer')}
              onPress={() => Linking.openURL('https://reinierhernandez.com')}
            />
          </ThemedView>

          <ThemedView style={styles.contactButton}>
            <Button
              title={t('settings.open_website')}
              onPress={() => Linking.openURL('https://suri.reinierhernandez.com')}
            />
          </ThemedView>

          <ThemedView style={[styles.view]}>
            <ThemedText style={{ fontSize: 18, marginTop: 18 }}>
              {t('settings.created_by')} <ExternalLink href="https://reinierhernandez.com" style={styles.link}>Reinier Hernández</ExternalLink>
            </ThemedText>
          </ThemedView>
        </ThemedView>

      </ScrollView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  view: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    color: '#0a7ea4',
    cursor: 'pointer',
  },
  division: {
    width: '100%',
    height: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    marginVertical: 8,
  },
  provider: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactButton: {
    marginTop: 'auto',
  },
});
