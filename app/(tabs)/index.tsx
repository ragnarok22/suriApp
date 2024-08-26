import { StyleSheet } from 'react-native';

import { ThemedView } from '@/components/themed/ThemedView';
import MainActionList from '@/components/MainActionList';
import ThemedLayout from '@/components/layouts/ThemedLayout';

export default function HomeScreen() {
  return (
    <ThemedLayout
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    >
      <ThemedView style={styles.titleContainer}>
        <MainActionList />
      </ThemedView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
