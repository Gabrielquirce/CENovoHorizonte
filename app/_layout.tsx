import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      animation: 'fade',
      orientation: 'portrait',
    }}>

      <Stack.Screen name="home" />
      <Stack.Screen name="login"/>
      <Stack.Screen name="loginAdm" />
      <Stack.Screen name="forms-aluno" />
      <Stack.Screen name="forms-materno" />
      <Stack.Screen name="forms-paterno" />
      <Stack.Screen name="forms-obs" />
      <Stack.Screen name="forms-info" />
      <Stack.Screen name="students" />
      <Stack.Screen name="aboutInst" />
      <Stack.Screen name="aboutDevs" />
    </Stack>
  );
}
