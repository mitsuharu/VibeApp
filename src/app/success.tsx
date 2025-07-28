import { styleType } from '@mitsuharu/react-native-components-plus'
import { router } from 'expo-router'
import {
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  type ViewStyle,
} from 'react-native'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/constants/Colors'
import { useAuth } from '@/hooks/AuthContext'

type Props = Record<string, never>

type ComponentProps = Props & {
  username: string
  loginKey: string | null
  onRestart: () => void
}

const Component: React.FC<ComponentProps> = ({
  username,
  loginKey,
  onRestart,
}) => {
  const styles = useStyles()

  if (!loginKey) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>ログインキーの生成に失敗しました</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.successIcon}>
          <Text style={styles.successEmoji}>🎉</Text>
        </View>

        <Text style={styles.title}>認証完了！</Text>
        <Text style={styles.subtitle}>
          おめでとうございます、{username}さん
        </Text>

        <View style={styles.keyCard}>
          <Text style={styles.keyTitle}>今日のログインキー</Text>
          <Text style={styles.keyValue}>{loginKey}</Text>
          <Text style={styles.keyDescription}>
            このキーを使用してシステムにログインしてください
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📋 ご利用案内</Text>
          <Text style={styles.infoText}>
            • このキーは今日限り有効です{'\n'}• 他の人に教えないでください{'\n'}
            • 明日は新しいチャレンジが待っています
          </Text>
        </View>

        <TouchableOpacity style={styles.restartButton} onPress={onRestart}>
          <Text style={styles.restartButtonText}>もう一度チャレンジする</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const { authState, reset } = useAuth()

  const handleRestart = () => {
    reset()
    router.push('/')
  }

  return (
    <Component
      {...props}
      username={authState.username}
      loginKey={authState.loginKey}
      onRestart={handleRestart}
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
      maxWidth: 500,
      alignSelf: 'center',
      width: '100%',
    }),
    successIcon: styleType<ViewStyle>({
      alignItems: 'center',
      marginBottom: 24,
    }),
    successEmoji: styleType<TextStyle>({
      fontSize: 64,
    }),
    title: styleType<TextStyle>({
      fontSize: 32,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      textAlign: 'center',
      marginBottom: 8,
    }),
    subtitle: styleType<TextStyle>({
      fontSize: 18,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginBottom: 32,
    }),
    keyCard: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).ACCENT.PRIMARY,
      borderRadius: 16,
      padding: 32,
      marginBottom: 24,
      alignItems: 'center',
    }),
    keyTitle: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.ON_ACCENT,
      marginBottom: 12,
      fontWeight: '600',
      opacity: 0.9,
    }),
    keyValue: styleType<TextStyle>({
      fontSize: 36,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.ON_ACCENT,
      letterSpacing: 4,
      marginBottom: 12,
    }),
    keyDescription: styleType<TextStyle>({
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.ON_ACCENT,
      textAlign: 'center',
      opacity: 0.8,
      lineHeight: 20,
    }),
    infoCard: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderRadius: 12,
      padding: 20,
      marginBottom: 32,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
    }),
    infoTitle: styleType<TextStyle>({
      fontSize: 16,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 12,
    }),
    infoText: styleType<TextStyle>({
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      lineHeight: 20,
    }),
    restartButton: styleType<ViewStyle>({
      borderWidth: 2,
      borderColor: COLOR(colorScheme).ACCENT.PRIMARY,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    }),
    restartButtonText: styleType<TextStyle>({
      color: COLOR(colorScheme).ACCENT.PRIMARY,
      fontSize: 16,
      fontWeight: '600',
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
