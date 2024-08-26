import { useEffect, useState } from 'react';
import * as Cellular from 'expo-cellular';
import { Button, Linking, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { ThemedText } from '@/components/themed/ThemedText';
import { ThemedView } from '@/components/themed/ThemedView';
import NavigationLayout from '@/components/layouts/NavigationLayout';
import { ExternalLink } from '@/components/ExternalLink';
import { Carrier } from '@/constants/definitions';
import { getCarrierName } from '@/utils/mobile';

export default function TabTwoScreen() {
  const [carrier, setCarrier] = useState<Carrier>('telesur');
  const version = '1.0.0';

  useEffect(() => {
    Cellular.getCarrierNameAsync().then((carrier) => {
      setCarrier(getCarrierName(carrier || 'TeleG'));
    });
  }, []);

  return (
    <NavigationLayout title="Settings">
      <ThemedView style={styles.view}>
        <ThemedText>Versión {version}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.view}>
        <ThemedText>
          Creador por <ExternalLink href="https://reinierhernandez.com" style={styles.link}>Reinier Hernández</ExternalLink>
        </ThemedText>
      </ThemedView>

      <ThemedView style={[styles.transparent, styles.provider]}>
        <ThemedText>Proveedor:</ThemedText>
        <Picker
          selectedValue={carrier}
          onValueChange={(itemValue) => setCarrier(itemValue)}
          style={{ width: 150, color: 'white' }}
        >
          <Picker.Item label="Telesur" value="telesur" />
          <Picker.Item label="Digicel" value="digicel" />
        </Picker>
      </ThemedView>

      <ThemedView style={styles.contactButton}>
        <Button
          title="Contactar al desarrollador"
          onPress={() => Linking.openURL('https://reinierhernandez.com')}
        />
      </ThemedView>
    </NavigationLayout>
  );
}

const styles = StyleSheet.create({
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
  provider: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButton: {
    marginTop: 'auto',
  },
});
