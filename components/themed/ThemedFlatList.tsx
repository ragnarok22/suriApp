import { SafeAreaView, FlatList, type ViewProps, ListRenderItem } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedFlatListProps = ViewProps & {
  data: any;
  renderItem: ListRenderItem<any>;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedFlatList({ style, lightColor, darkColor, data, renderItem, ...otherProps }: ThemedFlatListProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  // return <View style={[{ backgroundColor }, style]} {...otherProps} />;
  return (
    <SafeAreaView style={[{ backgroundColor }, style]} {...otherProps}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
}
