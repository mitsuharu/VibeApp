import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { COLOR } from '@/constants/Colors'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
        },
        headerTintColor: COLOR(colorScheme).TEXT.PRIMARY,
        headerTitleStyle: {
          color: COLOR(colorScheme).TEXT.PRIMARY,
        },
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='country-selection'
        options={{
          title: '国選択',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='purpose-selection'
        options={{
          title: '目的選択',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='travel-plan-result'
        options={{
          title: '旅行プラン',
          headerShown: false,
        }}
      />
    </Stack>
  )
}
