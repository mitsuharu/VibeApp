import { Button } from '@mitsuharu/react-native-components-plus'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextStyle,
  useColorScheme,
  View,
  type ViewStyle,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/constants/Colors'
import { useAuth } from '@/hooks/useAuth'
import { MOCK_USERS } from '@/types'

const LoginScreen: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login } = useAuth()
  const router = useRouter()
  const styles = useStyles()

  const handleLogin = () => {
    if (!selectedUser) {
      Alert.alert('エラー', '同僚を選択してください')
      return
    }

    if (!password) {
      Alert.alert('エラー', 'パスワードを入力してください')
      return
    }

    const user = MOCK_USERS.find((u) => u.name === selectedUser)
    if (user) {
      login(user)
      router.replace('/travel-destination')
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>旅行プランアプリ</Text>
            <Text style={styles.subtitle}>ログイン</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.section}>
              <Text style={styles.label}>同僚を選択してください</Text>
              {MOCK_USERS.map((user) => (
                <Button
                  key={user.name}
                  title={`${user.department}の${user.name}さん`}
                  onPress={() => setSelectedUser(user.name)}
                  style={[
                    styles.userButton,
                    selectedUser === user.name && styles.selectedUserButton,
                  ]}
                  titleStyle={[
                    styles.userButtonText,
                    selectedUser === user.name && styles.selectedUserButtonText,
                  ]}
                />
              ))}
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>パスワード</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder='パスワードを入力してください'
                secureTextEntry
                style={styles.input}
                placeholderTextColor={COLOR(useColorScheme()).TEXT.SECONDARY}
              />
              <Text style={styles.note}>
                ※ モックアプリなので、任意のパスワードで認証されます
              </Text>
            </View>

            <Button
              title='ログイン'
              onPress={handleLogin}
              style={styles.loginButton}
              titleStyle={styles.loginButtonText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    } as ViewStyle,
    container: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      flexGrow: 1,
      padding: 20,
    } as ViewStyle,
    header: {
      alignItems: 'center',
      marginBottom: 40,
    } as ViewStyle,
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 8,
    } as TextStyle,
    subtitle: {
      fontSize: 18,
      color: COLOR(colorScheme).TEXT.SECONDARY,
    } as TextStyle,
    form: {
      flex: 1,
    } as ViewStyle,
    section: {
      marginBottom: 30,
    } as ViewStyle,
    label: {
      fontSize: 16,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 12,
    } as TextStyle,
    userButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      marginBottom: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
    } as ViewStyle,
    selectedUserButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      borderColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
    } as ViewStyle,
    userButtonText: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 16,
    } as TextStyle,
    selectedUserButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontWeight: '600',
    } as TextStyle,
    input: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.INPUT,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.PRIMARY,
    } as ViewStyle,
    note: {
      fontSize: 12,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 8,
      fontStyle: 'italic',
    } as TextStyle,
    loginButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      paddingVertical: 16,
      borderRadius: 8,
      marginTop: 20,
    } as ViewStyle,
    loginButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontSize: 18,
      fontWeight: '600',
    } as TextStyle,
  })
  return styles
})

export default LoginScreen
