import type { PropsWithChildren } from 'react';
import { Image, StyleSheet, useColorScheme } from 'react-native';

import { ThemedView } from '@/components/themed/ThemedView';
import { ThemedText } from '@/components/themed/ThemedText';

type Props = PropsWithChildren<{
  title: string;
}>;

const bgColors = {
  light: '#A1CEDC',
  dark: '#1D3D47',
};

export default function NavigationLayout({
  children,
  title,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={[
      styles.container,
      { backgroundColor: bgColors[colorScheme] },
    ]}>
      <ThemedView
        style={[
          styles.header,
          { backgroundColor: bgColors[colorScheme] },
        ]}>
        <ThemedText type="title">{title}</ThemedText>
        <Image
          source={require('@/assets/images/suri-logo.png')}
          style={styles.logo}
        />
        <ThemedText type='subtitle'>Suri</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.content, { backgroundColor: bgColors[colorScheme] }]}>
        {children}
      </ThemedView>
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
    paddingTop: 48,
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
  },
});
