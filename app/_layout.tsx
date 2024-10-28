import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "@/i18n";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import store from "@/store";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Loading from "@/components/Loading";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { loading } = store.useGlobalStore();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView>
        <Loading visible={loading} />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen
            name="phones"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="mobile"
            options={{ headerShown: false, presentation: "modal" }}
          />
          <Stack.Screen
            name="faq"
            options={{
              headerShown: Platform.OS !== 'ios',
              title: "",
              presentation: "modal"
            }}
          />
          <Stack.Screen
            name="donate"
            options={{
              headerShown: Platform.OS !== 'ios',
              title: "",
              presentation: "modal"
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
