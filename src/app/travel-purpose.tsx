import { Button } from '@mitsuharu/react-native-components-plus'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
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
import { useAuth } from '@/hooks/useAuth'
import { DESTINATIONS, PURPOSES, type TravelPurpose } from '@/types'

const TravelPurposeScreen: React.FC = () => {
  const [selectedPurpose, setSelectedPurpose] = useState<TravelPurpose | null>(
    null,
  )
  const { destinationId } = useLocalSearchParams<{ destinationId: string }>()
  const { user } = useAuth()
  const router = useRouter()
  const styles = useStyles()

  const destination = DESTINATIONS.find((d) => d.id === destinationId)

  const handleNext = () => {
    if (!selectedPurpose || !destination) {
      Alert.alert('エラー', '目的を選択してください')
      return
    }
    router.push({
      pathname: '/travel-plan',
      params: {
        destinationId: destination.id,
        purposeId: selectedPurpose.id,
      },
    })
  }

  const handleBack = () => {
    router.back()
  }

  if (!destination) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.errorText}>旅行先の情報が見つかりません</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>{user?.name}さん</Text>
          <Text style={styles.destinationInfo}>
            旅行先: {destination.name} ({destination.region})
          </Text>
        </View>
        <Button
          title='戻る'
          onPress={handleBack}
          style={styles.backButton}
          titleStyle={styles.backButtonText}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>旅行の目的を選択してください</Text>

        <View style={styles.purposeGrid}>
          {PURPOSES.map((purpose) => (
            <View key={purpose.id} style={styles.purposeItem}>
              <Button
                title={purpose.name}
                onPress={() => setSelectedPurpose(purpose)}
                style={[
                  styles.purposeButton,
                  selectedPurpose?.id === purpose.id &&
                    styles.selectedPurposeButton,
                ]}
                titleStyle={[
                  styles.purposeButtonText,
                  selectedPurpose?.id === purpose.id &&
                    styles.selectedPurposeButtonText,
                ]}
              />
              <Text
                style={[
                  styles.purposeDescription,
                  selectedPurpose?.id === purpose.id &&
                    styles.selectedPurposeDescription,
                ]}
              >
                {purpose.description}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          {selectedPurpose && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>選択した目的:</Text>
              <Text style={styles.selectedValue}>{selectedPurpose.name}</Text>
              <Text style={styles.selectedDescription}>
                {selectedPurpose.description}
              </Text>
            </View>
          )}

          <Button
            title='旅行プランを作成'
            onPress={handleNext}
            style={styles.nextButton}
            titleStyle={styles.nextButtonText}
            disabled={!selectedPurpose}
          />
        </View>
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
    welcome: {
      fontSize: 18,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
    } as TextStyle,
    destinationInfo: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 4,
    } as TextStyle,
    backButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    } as ViewStyle,
    backButtonText: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 14,
    } as TextStyle,
    content: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      padding: 20,
    } as ViewStyle,
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 30,
      textAlign: 'center',
    } as TextStyle,
    purposeGrid: {
      gap: 15,
    } as ViewStyle,
    purposeItem: {
      marginBottom: 5,
    } as ViewStyle,
    purposeButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      width: '100%',
    } as ViewStyle,
    selectedPurposeButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      borderColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
    } as ViewStyle,
    purposeButtonText: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
    } as TextStyle,
    selectedPurposeButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
    } as TextStyle,
    purposeDescription: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginTop: 8,
      paddingHorizontal: 20,
    } as TextStyle,
    selectedPurposeDescription: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontWeight: '500',
    } as TextStyle,
    footer: {
      marginTop: 40,
    } as ViewStyle,
    selectedInfo: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.HELP,
      padding: 16,
      borderRadius: 8,
      marginBottom: 20,
    } as ViewStyle,
    selectedLabel: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginBottom: 4,
    } as TextStyle,
    selectedValue: {
      fontSize: 18,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 4,
    } as TextStyle,
    selectedDescription: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
    } as TextStyle,
    nextButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      paddingVertical: 16,
      borderRadius: 8,
    } as ViewStyle,
    nextButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontSize: 18,
      fontWeight: '600',
    } as TextStyle,
    errorText: {
      fontSize: 16,
      color: COLOR(colorScheme).FUNCTIONAL.ERROR,
      textAlign: 'center',
      margin: 20,
    } as TextStyle,
  })
  return styles
})

export default TravelPurposeScreen
