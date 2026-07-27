import { AnimatedSplashScreen } from '@/components/animated-splash-screen';
import { useUserStore } from '@/store/user-store';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

const queryClient = new QueryClient()

SplashScreen.preventAutoHideAsync();

function useIsStoreHydrated() {
  const [hydrated, setHydrated] = useState(useUserStore.persist.hasHydrated());

  useEffect(() => {
    if (hydrated) return;
    return useUserStore.persist.onFinishHydration(() => setHydrated(true));
  }, [hydrated]);

  return hydrated;
}

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  const isAppReady = useIsStoreHydrated();

  useEffect(() => {
    // Hand off from the native splash to our animated overlay right away.
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
      {showSplash && (
        <AnimatedSplashScreen
          isAppReady={isAppReady}
          onAnimationEnd={() => setShowSplash(false)}
        />
      )}
    </QueryClientProvider>
  );
}

function RootNavigator() {
  const { session } = useUserStore()

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Protected guard={!session}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
