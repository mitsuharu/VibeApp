import { styleType } from '@mitsuharu/react-native-components-plus'
import { router } from 'expo-router'
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

type Props = Record<string, never>

type ComponentProps = Props & {
  username: string
  onUsernameChange: (username: string) => void
  onNext: () => void
}

const Component: React.FC<ComponentProps> = ({
  username,
  onUsernameChange,
  onNext,
}) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>同僚からひと笑いを貰わないとログインできない認証システム</Text>
        <Text style={styles.subtitle}>ユーザーネームを入力してください</Text>

        <TextInput
          style={styles.input}
          value={username}
          onChangeText={onUsernameChange}
          placeholder='ユーザーネーム'
          placeholderTextColor={COLOR(useColorScheme()).TEXT.SECONDARY}
          autoCapitalize='none'
          autoCorrect={false}
        />

        <TouchableOpacity
          style={[styles.button, !username && styles.buttonDisabled]}
          onPress={onNext}
          disabled={!username}
        >
          <Text
            style={[styles.buttonText, !username && styles.buttonTextDisabled]}
          >
            次へ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const { authState, setUsername, startChallenge } = useAuth()

  const handleNext = () => {
    if (!authState.username.trim()) {
      Alert.alert('エラー', 'ユーザーネームを入力してください')
      return
    }
    startChallenge()
    router.push('/challenge')
  }

  return (
    <Component
      {...props}
      username={authState.username}
      onUsernameChange={setUsername}
      onNext={handleNext}
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
      fontSize: 24,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      textAlign: 'center',
      marginBottom: 8,
      lineHeight: 32,
    }),
    subtitle: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginBottom: 32,
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
  })
  return styles
})

export default Container
