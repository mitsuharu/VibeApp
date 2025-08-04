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
import { COUNTRIES, PURPOSES } from '@/types'

const TravelPlanResultScreen: React.FC = () => {
  const { countryId, purposeId } = useLocalSearchParams<{
    countryId: string
    purposeId: string
  }>()
  const router = useRouter()
  const colorScheme = useColorScheme()
  const styles = useStyles()
  const { status, response, fetchResponse } = useAssistant()

  const country = COUNTRIES.find((c) => c.id === countryId)
  const purpose = PURPOSES.find((p) => p.id === purposeId)

  useEffect(() => {
    if (country && purpose) {
      const prompt = `${country.name}への${purpose.name}を目的とした3泊4日の旅行プランを日本語で詳しく作成してください。

以下の内容を含めてください：

【基本情報】
- 旅行期間: 3泊4日
- 目的: ${purpose.description}

【詳細スケジュール】
1日目から4日目まで、時間単位の詳細スケジュールを作成してください：

■1日目（到着日）
- 08:00 出発準備・空港へ移動
- 10:00 日本出発（フライト例）
- 現地時間での到着後のスケジュール（時間単位）
- 宿泊先チェックイン時間
- 夕食の時間と場所

■2日目（観光メイン）
- 07:00 起床・朝食
- 09:00～12:00 午前の観光スポット
- 12:00～13:30 昼食（おすすめレストラン）
- 14:00～17:00 午後の観光スポット
- 18:00～20:00 夕食とディナータイム
- 20:30～ 夜の活動（${purpose.description}に特化）

■3日目（テーマ別活動）
- ${purpose.description}を中心とした1日の時間割
- 各時間帯でのおすすめ活動・場所
- 移動時間も含めた現実的なスケジュール

■4日目（帰国日）
- チェックアウト時間
- 最後の観光・ショッピング時間
- 空港への移動時間
- 出発便の時間

【その他の情報】
- おすすめの観光スポット（${purpose.description}に特化）
- 移動手段と所要時間（地下鉄、タクシー、徒歩など）
- おすすめのグルメスポット・レストラン（営業時間も含む）
- 宿泊先の提案（エリア・特徴・予約のコツ）
- 詳細な予算の目安（航空券・宿泊・食事・観光・交通費・お土産など）
- 注意事項・持ち物・現地での注意点・アドバイス

時間単位の具体的で実用的なスケジュールを、分かりやすく読みやすい形式で回答してください。`

      fetchResponse(prompt)
    }
  }, [country, purpose, fetchResponse])

  const handleRegenerate = () => {
    if (country && purpose) {
      const prompt = `${country.name}への${purpose.name}を目的とした3泊4日の旅行プランを、前回とは異なるアプローチで日本語で詳しく作成してください。

別の観光ルートや異なる宿泊エリア、違うレストランなどを提案し、以下の内容を含めてください：

【基本情報】
- 旅行期間: 3泊4日
- 目的: ${purpose.description}

【詳細スケジュール】
1日目から4日目まで、時間単位の詳細スケジュールを前回と異なるルートで作成してください：

■1日目（到着日）
- 08:00 出発準備・空港へ移動
- 10:00 日本出発（フライト例）
- 現地時間での到着後のスケジュール（時間単位、前回と異なるエリア）
- 宿泊先チェックイン時間（前回と異なるエリア）
- 夕食の時間と場所（前回と異なるレストラン）

■2日目（観光メイン）
- 07:00 起床・朝食
- 09:00～12:00 午前の観光スポット（前回と異なる場所）
- 12:00～13:30 昼食（前回と異なるおすすめレストラン）
- 14:00～17:00 午後の観光スポット（前回と異なる場所）
- 18:00～20:00 夕食とディナータイム（前回と異なる店）
- 20:30～ 夜の活動（${purpose.description}に特化、前回と異なるアプローチ）

■3日目（テーマ別活動）
- ${purpose.description}を中心とした1日の時間割（前回と異なる活動）
- 各時間帯でのおすすめ活動・場所（前回と異なるスポット）
- 移動時間も含めた現実的なスケジュール

■4日目（帰国日）
- チェックアウト時間
- 最後の観光・ショッピング時間（前回と異なる場所）
- 空港への移動時間
- 出発便の時間

【その他の情報】
- おすすめの観光スポット（${purpose.description}に特化、前回と異なる場所）
- 移動手段と所要時間（地下鉄、タクシー、徒歩など）
- おすすめのグルメスポット・レストラン（営業時間も含む、前回と異なる店）
- 宿泊先の提案（エリア・特徴・予約のコツ、前回と異なるエリア）
- 詳細な予算の目安（航空券・宿泊・食事・観光・交通費・お土産など）
- 注意事項・持ち物・現地での注意点・アドバイス

時間単位の具体的で実用的なスケジュールを、前回とは異なるアプローチで、分かりやすく読みやすい形式で回答してください。`

      fetchResponse(prompt)
    }
  }

  const handleStartOver = () => {
    router.replace('/country-selection')
  }

  if (!country || !purpose) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>国または目的の情報が見つかりません</Text>
        <Button
          text='最初から始める'
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
          <Text style={styles.planTitle}>
            {country.flag} {country.name} - {purpose.emoji} {purpose.name}旅行
          </Text>
          <Text style={styles.planSubtitle}>3泊4日の旅行プラン</Text>
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
            <Text style={styles.loadingSubtext}>
              {country.name}での{purpose.name}プランを準備中
            </Text>
          </View>
        )}

        {status === 'error' && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ エラーが発生しました</Text>
            <Text style={styles.errorMessage}>
              旅行プランの生成中にエラーが発生しました。もう一度お試しください。
            </Text>
            <Button
              text='再試行'
              onPress={handleRegenerate}
              style={styles.retryButton}
              textStyle={styles.retryButtonText}
            />
          </View>
        )}

        {status === 'success' && response && (
          <View style={styles.planContainer}>
            <View style={styles.planHeader}>
              <Text style={styles.planHeaderTitle}>
                🗾 {country.name} 旅行プラン
              </Text>
              <Text style={styles.planHeaderSubtitle}>
                {purpose.emoji} {purpose.name} - 3泊4日
              </Text>
            </View>

            <View style={styles.planContent}>
              <ScrollView nestedScrollEnabled>
                <Text style={styles.planText}>{response}</Text>
              </ScrollView>
            </View>

            <View style={styles.actionButtons}>
              <Button
                text='別のプランを作成'
                onPress={handleRegenerate}
                style={styles.regenerateButton}
                textStyle={styles.regenerateButtonText}
              />
              <Button
                text='最初から始める'
                onPress={handleStartOver}
                style={styles.startOverButton}
                textStyle={styles.startOverButtonText}
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
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: COLOR(colorScheme).BORDER.PRIMARY,
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
    } as ViewStyle,
    headerInfo: {
      alignItems: 'center',
    } as ViewStyle,
    planTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      textAlign: 'center',
    } as TextStyle,
    planSubtitle: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      opacity: 0.9,
      marginTop: 4,
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
      fontSize: 18,
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginTop: 20,
      textAlign: 'center',
      fontWeight: '600',
    } as TextStyle,
    loadingSubtext: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 8,
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
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    } as ViewStyle,
    planHeader: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      padding: 20,
      alignItems: 'center',
    } as ViewStyle,
    planHeaderTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      marginBottom: 4,
    } as TextStyle,
    planHeaderSubtitle: {
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      opacity: 0.9,
    } as TextStyle,
    planContent: {
      padding: 20,
      maxHeight: 400,
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

export default TravelPlanResultScreen
