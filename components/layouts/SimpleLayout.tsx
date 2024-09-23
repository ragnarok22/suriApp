import type { PropsWithChildren } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedView } from '@/components/themed';

const MENU_RADIUS = 32;

type Props = PropsWithChildren<{
  style?: any;
}>;

export default function ThemedLayout({
  children,
  style
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#fff';

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={[styles.content, style]}>{children}</ThemedView>
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
