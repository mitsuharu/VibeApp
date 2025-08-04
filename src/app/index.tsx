import { useRouter } from 'expo-router'
import { useEffect } from 'react'
import {
  ActivityIndicator,
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

const IndexScreen: React.FC = () => {
  const router = useRouter()
  const styles = useStyles()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/country-selection')
    }, 1500)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>🗾 旅行プランアプリ</Text>
        <Text style={styles.subtitle}>海外旅行のプランを半自動で作成</Text>
        <ActivityIndicator
          size='large'
          color={COLOR(useColorScheme()).BACKGROUND.EMPHASIZE}
          style={styles.loader}
        />
        <Text style={styles.loadingText}>アプリを起動しています...</Text>
      </View>
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
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    } as ViewStyle,
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      color: COLOR(colorScheme).TEXT.PRIMARY,
      marginBottom: 12,
      textAlign: 'center',
    } as TextStyle,
    subtitle: {
      fontSize: 16,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
      marginBottom: 60,
    } as TextStyle,
    loader: {
      marginBottom: 20,
    } as ViewStyle,
    loadingText: {
      fontSize: 14,
      color: COLOR(colorScheme).TEXT.SECONDARY,
      textAlign: 'center',
    } as TextStyle,
  })
  return styles
})

export default IndexScreen
