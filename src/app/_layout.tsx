import { Stack } from 'expo-router'
import { useColorScheme } from 'react-native'
import { COLOR } from '@/constants/Colors'
import { AuthProvider } from '@/hooks/AuthContext'

export default function RootLayout() {
  const colorScheme = useColorScheme()

  return (
    <AuthProvider>
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
            title: 'ログイン',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='challenge'
          options={{
            title: 'チャレンジ',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='password'
          options={{
            title: 'パスワード入力',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='success'
          options={{
            title: '認証完了',
            headerShown: false,
          }}
        />
      </Stack>
    </AuthProvider>
  )
}
