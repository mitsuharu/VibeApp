import { styleType } from '@mitsuharu/react-native-components-plus'
import { router } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  type TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  type ViewStyle,
} from 'react-native'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/constants/Colors'
import { useAuth } from '@/hooks/AuthContext'
import type { Colleague } from '@/types/auth'

type Props = Record<string, never>

type ComponentProps = Props & {
  colleague: Colleague | null
  password: string
  onPasswordChange: (password: string) => void
  onSubmit: () => void
}

const Component: React.FC<ComponentProps> = ({
  colleague,
  password,
  onPasswordChange,
  onSubmit,
}) => {
  const styles = useStyles()
  const colorScheme = useColorScheme()

  if (!colleague) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>データの読み込み中...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>同僚認証</Text>

        <View style={styles.colleagueCard}>
          <Text style={styles.colleagueTitle}>認証者情報</Text>
          <Text style={styles.colleagueName}>{colleague.name}</Text>
          <Text style={styles.colleagueDepartment}>{colleague.department}</Text>
        </View>

        <Text style={styles.instruction}>
          {colleague.name}さんのパスワードを入力してください
        </Text>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onPasswordChange}
          placeholder='パスワード'
          placeholderTextColor={COLOR(colorScheme).TEXT.SECONDARY}
          secureTextEntry
          autoCapitalize='none'
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.button, !password && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={!password}
        >
          <Text
            style={[styles.buttonText, !password && styles.buttonTextDisabled]}
          >
            認証する
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>戻る</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const { authState, authenticatePassword } = useAuth()
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (!password.trim()) {
      Alert.alert('エラー', 'パスワードを入力してください')
      return
    }

    authenticatePassword(password)
    router.push('/success')
  }

  return (
    <Component
      {...props}
      colleague={authState.currentColleague}
      password={password}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
    />
  )
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => {
  const styles = StyleSheet.create({
    container: styleType<ViewStyle>({
      flex: 1,
      backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    }),
    contentContainer: styleType<ViewStyle>({
      flex: 1,
      justifyContent: 'center',
      padding: 32,
      maxWidth: 400,
      alignSelf: 'center',
      width: '100%',
    }),
    title: styleType<TextStyle>({
      fontSize: 28,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      textAlign: 'center',
      marginBottom: 32,
    }),
    colleagueCard: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
    }),
    colleagueTitle: styleType<TextStyle>({
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginBottom: 8,
      fontWeight: '600',
    }),
    colleagueName: styleType<TextStyle>({
      fontSize: 20,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 4,
    }),
    colleagueDepartment: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
    }),
    instruction: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 24,
    }),
    input: styleType<TextStyle>({
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      borderRadius: 8,
      padding: 16,
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.PRIMARY,
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      marginBottom: 24,
    }),
    button: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).ACCENT.PRIMARY,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    }),
    buttonDisabled: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).BACKGROUND.TERTIARY,
    }),
    buttonText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.ON_ACCENT,
      fontSize: 16,
      fontWeight: '600',
    }),
    buttonTextDisabled: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.SECONDARY,
    }),
    backButton: styleType<ViewStyle>({
      alignItems: 'center',
      padding: 16,
    }),
    backButtonText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.SECONDARY,
      fontSize: 16,
    }),
    errorText: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
    }),
  })
  return styles
})

export default Container
