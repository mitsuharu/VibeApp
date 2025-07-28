import { Stack, useRouter } from 'expo-router'
import { useColorScheme } from 'react-native'
import { COLOR } from '@/constants/Colors'

export default function RootLayout() {
  const router = useRouter()
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
      />
    </Stack>
  )
}
