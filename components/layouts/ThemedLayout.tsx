import type { PropsWithChildren } from 'react';
import { Image, StyleSheet, useColorScheme } from 'react-native';

import { ThemedView, ThemedText } from '@/components/themed';

const MENU_RADIUS = 32;

type Props = PropsWithChildren<{
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ThemedLayout({
  children,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.header,
          { backgroundColor: headerBackgroundColor[colorScheme] },
        ]}>
        <Image
          source={require('@/assets/images/suri-logo.png')}
          style={styles.logo}
        />
        <ThemedText type='title'>Suri</ThemedText>
      </ThemedView>
      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  header: {
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
    borderTopLeftRadius: MENU_RADIUS,
    borderTopRightRadius: MENU_RADIUS,
    marginTop: -MENU_RADIUS,
  },
});
