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
import type { Colleague, Topic } from '@/types/auth'

type Props = Record<string, never>

type ComponentProps = Props & {
  colleague: Colleague | null
  topic: Topic | null
  onAccept: () => void
  onReject: () => void
}

const Component: React.FC<ComponentProps> = ({
  colleague,
  topic,
  onAccept,
  onReject,
}) => {
  const styles = useStyles()

  if (!colleague || !topic) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>データの読み込み中...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>同僚からのチャレンジ</Text>

        <View style={styles.colleagueCard}>
          <Text style={styles.colleagueTitle}>認証者</Text>
          <Text style={styles.colleagueName}>{colleague.name}</Text>
          <Text style={styles.colleagueDepartment}>{colleague.department}</Text>
        </View>

        <View style={styles.topicCard}>
          <Text style={styles.topicTitle}>お題</Text>
          <Text style={styles.topicContent}>{topic.content}</Text>
        </View>

        <Text style={styles.instruction}>
          この話題で同僚を笑わせることができますか？
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.rejectButton]}
            onPress={onReject}
          >
            <Text style={[styles.buttonText, styles.rejectButtonText]}>
              面白くない
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.acceptButton]}
            onPress={onAccept}
          >
            <Text style={[styles.buttonText, styles.acceptButtonText]}>
              笑った！
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const { authState, proceedToPassword, reset } = useAuth()

  const handleAccept = () => {
    proceedToPassword()
    router.push('/password')
  }

  const handleReject = () => {
    reset()
    router.push('/')
  }

  return (
    <Component
      {...props}
      colleague={authState.currentColleague}
      topic={authState.currentTopic}
      onAccept={handleAccept}
      onReject={handleReject}
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
      marginBottom: 20,
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
      fontSize: 24,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 4,
    }),
    colleagueDepartment: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
    }),
    topicCard: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderRadius: 12,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
    }),
    topicTitle: styleType<TextStyle>({
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginBottom: 12,
      fontWeight: '600',
    }),
    topicContent: styleType<TextStyle>({
      fontSize: 18,
      color: COLOR(colorScheme).TEXT.PRIMARY,
      lineHeight: 26,
    }),
    instruction: styleType<TextStyle>({
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 24,
    }),
    buttonContainer: styleType<ViewStyle>({
      flexDirection: 'row',
      gap: 16,
    }),
    button: styleType<ViewStyle>({
      flex: 1,
      borderRadius: 8,
      padding: 16,
      alignItems: 'center',
    }),
    rejectButton: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).BACKGROUND.TERTIARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
    }),
    acceptButton: styleType<ViewStyle>({
      backgroundColor: COLOR(colorScheme).ACCENT.PRIMARY,
    }),
    buttonText: styleType<TextStyle>({
      fontSize: 16,
      fontWeight: '600',
    }),
    rejectButtonText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.PRIMARY,
    }),
    acceptButtonText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.ON_ACCENT,
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
