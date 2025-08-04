import { Button } from '@mitsuharu/react-native-components-plus'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useEffect } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  type TextStyle,
  useColorScheme,
  View,
  type ViewStyle,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/constants/Colors'
import { useAssistant } from '@/hooks/useAssistant'
import { useAuth } from '@/hooks/useAuth'
import { DESTINATIONS, PURPOSES } from '@/types'

const TravelPlanScreen: React.FC = () => {
  const { destinationId, purposeId } = useLocalSearchParams<{
    destinationId: string
    purposeId: string
  }>()
  const { user, logout } = useAuth()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const styles = useStyles()
  const { status, response, fetchResponse } = useAssistant()

  const destination = DESTINATIONS.find((d) => d.id === destinationId)
  const purpose = PURPOSES.find((p) => p.id === purposeId)

  useEffect(() => {
    if (destination && purpose) {
      const prompt = `${destination.name}への${purpose.name}を目的とした旅行プランを作成してください。以下の内容を含めてください：

1. おすすめの観光スポット（${purpose.description}に特化した内容）
2. 移動手段と経路
3. おすすめのグルメスポット
4. 宿泊先の提案
5. 予算の目安
6. 3泊4日の詳細スケジュール

日本語で丁寧に回答してください。`

      fetchResponse(prompt)
    }
  }, [destination, purpose, fetchResponse])

  const handleRegenerate = () => {
    if (destination && purpose) {
      const prompt = `${destination.name}への${purpose.name}を目的とした旅行プランを別のアプローチで作成してください。前回とは異なる観光スポットやルートを提案し、以下の内容を含めてください：

1. おすすめの観光スポット（${purpose.description}に特化した内容）
2. 移動手段と経路
3. おすすめのグルメスポット
4. 宿泊先の提案
5. 予算の目安
6. 3泊4日の詳細スケジュール

日本語で丁寧に回答してください。`

      fetchResponse(prompt)
    }
  }

  const handleStartOver = () => {
    router.replace('/travel-destination')
  }

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  if (!destination || !purpose) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>
          旅行先または目的の情報が見つかりません
        </Text>
        <Button
          title='最初から始める'
          onPress={handleStartOver}
          style={styles.errorButton}
        />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={styles.welcome}>{user?.name}さんの旅行プラン</Text>
          <Text style={styles.tripInfo}>
            {destination.name} - {purpose.name}旅行
          </Text>
        </View>
        <View style={styles.headerButtons}>
          <Button
            title='ログアウト'
            onPress={handleLogout}
            style={styles.logoutButton}
            titleStyle={styles.logoutButtonText}
          />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        {status === 'loading' && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size='large'
              color={COLOR(colorScheme).BACKGROUND.EMPHASIZE}
            />
            <Text style={styles.loadingText}>
              あなたの旅行プランを作成しています...
            </Text>
          </View>
        )}

        {status === 'error' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>エラーが発生しました</Text>
            <Text style={styles.errorMessage}>
              旅行プランの生成中にエラーが発生しました。もう一度お試しください。
            </Text>
            <Button
              title='再試行'
              onPress={handleRegenerate}
              style={styles.retryButton}
              titleStyle={styles.retryButtonText}
            />
          </View>
        )}

        {status === 'success' && response && (
          <View style={styles.planContainer}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>🗾 旅行プラン栞</Text>
              <Text style={styles.planSubtitle}>
                {destination.name}（{destination.region}） - {purpose.name}
              </Text>
            </View>

            <View style={styles.planContent}>
              <Text style={styles.planText}>{response}</Text>
            </View>

            <View style={styles.actionButtons}>
              <Button
                title='別のプランを作成'
                onPress={handleRegenerate}
                style={styles.regenerateButton}
                titleStyle={styles.regenerateButtonText}
              />
              <Button
                title='最初から始める'
                onPress={handleStartOver}
                style={styles.startOverButton}
                titleStyle={styles.startOverButtonText}
              />
            </View>
          </View>
        )}

        {status === 'idle' && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>プランを準備しています...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => {
  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLOR(colorScheme).BORDER.PRIMARY,
    } as ViewStyle,
    headerInfo: {
      flex: 1,
    } as ViewStyle,
    welcome: {
      fontSize: 18,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
    } as TextStyle,
    tripInfo: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 4,
    } as TextStyle,
    headerButtons: {
      gap: 8,
    } as ViewStyle,
    logoutButton: {
      backgroundColor: COLOR(colorScheme).FUNCTIONAL.ERROR,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    } as ViewStyle,
    logoutButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontSize: 12,
    } as TextStyle,
    content: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      padding: 20,
    } as ViewStyle,
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 60,
    } as ViewStyle,
    loadingText: {
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 20,
      textAlign: 'center',
    } as TextStyle,
    errorContainer: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.DESTRUCTIVE,
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
    } as ViewStyle,
    errorTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLOR(colorScheme).FUNCTIONAL.ERROR,
      marginBottom: 8,
    } as TextStyle,
    errorMessage: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginBottom: 20,
    } as TextStyle,
    retryButton: {
      backgroundColor: COLOR(colorScheme).FUNCTIONAL.ERROR,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    } as ViewStyle,
    retryButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontSize: 16,
      fontWeight: '600',
    } as TextStyle,
    planContainer: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderRadius: 12,
      overflow: 'hidden',
    } as ViewStyle,
    planHeader: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      padding: 20,
      alignItems: 'center',
    } as ViewStyle,
    planTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      marginBottom: 8,
    } as TextStyle,
    planSubtitle: {
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      opacity: 0.9,
    } as TextStyle,
    planContent: {
      padding: 20,
    } as ViewStyle,
    planText: {
      fontSize: 15,
      lineHeight: 24,
      color: COLOR(colorScheme).TEXT.PRIMARY,
    } as TextStyle,
    actionButtons: {
      flexDirection: 'row',
      gap: 12,
      padding: 20,
      paddingTop: 0,
    } as ViewStyle,
    regenerateButton: {
      flex: 1,
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      paddingVertical: 12,
      borderRadius: 8,
    } as ViewStyle,
    regenerateButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontSize: 14,
      fontWeight: '600',
    } as TextStyle,
    startOverButton: {
      flex: 1,
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      paddingVertical: 12,
      borderRadius: 8,
    } as ViewStyle,
    startOverButtonText: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 14,
      fontWeight: '600',
    } as TextStyle,
    errorText: {
      fontSize: 16,
      color: COLOR(colorScheme).FUNCTIONAL.ERROR,
      textAlign: 'center',
      margin: 20,
    } as TextStyle,
    errorButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      margin: 20,
      paddingVertical: 12,
      borderRadius: 8,
    } as ViewStyle,
  })
  return styles
})

export default TravelPlanScreen
