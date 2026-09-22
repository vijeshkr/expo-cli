import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from '@/components';
import { Colors } from '@/constants/theme';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}
        />
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
