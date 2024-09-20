import type { PropsWithChildren } from 'react';
import { Image, ScrollView, StyleSheet, useColorScheme } from 'react-native';

import { ThemedView, ThemedText } from '@/components/themed';

type Props = PropsWithChildren<{
  title: string;
  style: any;
}>;

const bgColors = {
  light: '#A1CEDC',
  dark: '#1D3D47',
};

export default function NavigationLayout({
  children,
  title,
  style,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';

  return (
    <ScrollView style={[
      styles.scrollContainer,
      { backgroundColor: bgColors[colorScheme] },
    ]}>
      <ThemedView style={[
        styles.container,
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
        <ThemedView style={[styles.content, style, { backgroundColor: bgColors[colorScheme] }]}>
          {children}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red',
  },
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
    height: '100%',
  },
});
