import { SafeAreaView, FlatList, type ViewProps, ListRenderItem, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedView } from './ThemedView';

export type ThemedFlatListProps = ViewProps & {
  data: any;
  onPress?: (item_id: string) => void;
  renderItem: ListRenderItem<any> & { onPress?: () => void };
  lightColor?: string;
  darkColor?: string;
};

export function ThemedFlatList({ style, lightColor, darkColor, data, renderItem, onPress, ...otherProps }: ThemedFlatListProps) {
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
        renderItem={({item}) => renderItem({item, onPress})}
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
