import { Button } from '@mitsuharu/react-native-components-plus'
import { useRouter } from 'expo-router'
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
import { DESTINATIONS, type TravelDestination } from '@/types'

const TravelDestinationScreen: React.FC = () => {
  const [selectedDestination, setSelectedDestination] =
    useState<TravelDestination | null>(null)
  const { user, logout } = useAuth()
  const router = useRouter()
  const styles = useStyles()

  const handleNext = () => {
    if (!selectedDestination) {
      Alert.alert('エラー', '旅行先を選択してください')
      return
    }
    router.push({
      pathname: '/travel-purpose',
      params: { destinationId: selectedDestination.id },
    })
  }

  const handleLogout = () => {
    logout()
    router.replace('/login')
  }

  const groupedDestinations = DESTINATIONS.reduce(
    (acc, destination) => {
      if (!acc[destination.region]) {
        acc[destination.region] = []
      }
      acc[destination.region].push(destination)
      return acc
    },
    {} as Record<string, TravelDestination[]>,
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>こんにちは、{user?.name}さん</Text>
          <Text style={styles.department}>{user?.department}</Text>
          <Text style={styles.loginKey}>
            本日のログインキー: {user?.loginKey}
          </Text>
        </View>
        <Button
          title='ログアウト'
          onPress={handleLogout}
          style={styles.logoutButton}
          titleStyle={styles.logoutButtonText}
        />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>旅行先を選択してください</Text>

        {Object.entries(groupedDestinations).map(([region, destinations]) => (
          <View key={region} style={styles.regionSection}>
            <Text style={styles.regionTitle}>{region}</Text>
            <View style={styles.destinationGrid}>
              {destinations.map((destination) => (
                <Button
                  key={destination.id}
                  title={destination.name}
                  onPress={() => setSelectedDestination(destination)}
                  style={[
                    styles.destinationButton,
                    selectedDestination?.id === destination.id &&
                      styles.selectedDestinationButton,
                  ]}
                  titleStyle={[
                    styles.destinationButtonText,
                    selectedDestination?.id === destination.id &&
                      styles.selectedDestinationButtonText,
                  ]}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          {selectedDestination && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>選択した旅行先:</Text>
              <Text style={styles.selectedValue}>
                {selectedDestination.name} ({selectedDestination.region})
              </Text>
            </View>
          )}

          <Button
            title='次へ'
            onPress={handleNext}
            style={styles.nextButton}
            titleStyle={styles.nextButtonText}
            disabled={!selectedDestination}
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
    department: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 2,
    } as TextStyle,
    loginKey: {
      fontSize: 12,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      marginTop: 4,
      fontFamily: 'monospace',
    } as TextStyle,
    logoutButton: {
      backgroundColor: COLOR(colorScheme).FUNCTIONAL.ERROR,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    } as ViewStyle,
    logoutButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
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
    regionSection: {
      marginBottom: 30,
    } as ViewStyle,
    regionTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 15,
      paddingLeft: 5,
    } as TextStyle,
    destinationGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    } as ViewStyle,
    destinationButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      minWidth: 100,
    } as ViewStyle,
    selectedDestinationButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      borderColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
    } as ViewStyle,
    destinationButtonText: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 16,
      textAlign: 'center',
    } as TextStyle,
    selectedDestinationButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontWeight: '600',
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
      fontSize: 16,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
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
  })
  return styles
})

export default TravelDestinationScreen
