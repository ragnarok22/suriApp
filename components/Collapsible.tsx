import Ionicons from '@expo/vector-icons/Ionicons';
import { PropsWithChildren, useState } from 'react';
import { StyleSheet, Pressable, useColorScheme } from 'react-native';

import { ThemedText } from '@/components/themed';
import { ThemedView } from '@/components/themed';
import { Colors } from '@/constants/Colors';

type CollapsibleProps = PropsWithChildren<{
  title: string;
  style?: any;
}>;

export function Collapsible({ children, title, style }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={style}>
      <Pressable
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
      // activeOpacity={0.8}
      >
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </Pressable>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
