import { SafeAreaView, FlatList, type ViewProps, ListRenderItem, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';

export type ThemedFlatListProps = ViewProps & {
  data: any;
  renderItem: ListRenderItem<any>;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedFlatList({ style, lightColor, darkColor, data, renderItem, ...otherProps }: ThemedFlatListProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps}>
      <FlatList
        ItemSeparatorComponent={
          (({ highlighted }) => (
            <ThemedView
              style={[styles.separator, highlighted && { marginLeft: 0 }]}
            />
          ))
        }
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
    marginTop: 8,
    marginBottom: 8,
  },
});
