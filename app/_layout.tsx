import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      animation: 'fade',
      orientation: 'portrait',
    }}>

      <Stack.Screen name="home" />
      <Stack.Screen name="aboutInst" />
      <Stack.Screen name="aboutDevs" />
    </Stack>
  );
}
