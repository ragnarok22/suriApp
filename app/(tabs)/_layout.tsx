import { Tabs } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Text, StyleSheet } from 'react-native';

const TabTitle = ({ focused, color, text }: { focused: boolean, color: string, text: string }) => (
  <Text style={[styles.tabTitle, focused ? { color } : { display: 'none' }]}>
    {text}
  </Text>
)

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: ({ focused }: { focused: boolean }) => (
            <TabTitle focused={focused} text={t('home.title')} color={Colors[colorScheme ?? 'light'].tint} />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: ({ focused }: { focused: boolean }) => (
            <TabTitle focused={focused} text={t('settings.title')} color={Colors[colorScheme ?? 'light'].tint} />
          ),
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabTitle: {
    color: 'rgb(152, 152, 143)',
    fontSize: 10,
  }
});
