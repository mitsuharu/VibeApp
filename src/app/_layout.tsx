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
          title: 'プレゼン資料投げ輪ゲーム',
          headerShown: true,
        }}
      />
    </Stack>
  )
}
