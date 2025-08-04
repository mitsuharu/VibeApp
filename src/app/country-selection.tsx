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
import { COUNTRIES, type Country } from '@/types'

const CountrySelectionScreen: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const router = useRouter()
  const styles = useStyles()

  const handleNext = () => {
    if (!selectedCountry) {
      Alert.alert('エラー', '国を選択してください')
      return
    }
    router.push({
      pathname: '/purpose-selection',
      params: { countryId: selectedCountry.id },
    })
  }

  const groupedCountries = COUNTRIES.reduce(
    (acc, country) => {
      if (!acc[country.region]) {
        acc[country.region] = []
      }
      acc[country.region].push(country)
      return acc
    },
    {} as Record<string, Country[]>,
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>🌍 旅行したい国を選択してください</Text>

        {Object.entries(groupedCountries).map(([region, countries]) => (
          <View key={region} style={styles.regionSection}>
            <Text style={styles.regionTitle}>{region}</Text>
            <View style={styles.countryGrid}>
              {countries.map((country) => (
                <Button
                  key={country.id}
                  text={`${country.flag} ${country.name}`}
                  onPress={() => setSelectedCountry(country)}
                  style={[
                    styles.countryButton,
                    selectedCountry?.id === country.id &&
                      styles.selectedCountryButton,
                  ]}
                  textStyle={[
                    styles.countryButtonText,
                    selectedCountry?.id === country.id &&
                      styles.selectedCountryButtonText,
                  ]}
                />
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          {selectedCountry && (
            <View style={styles.selectedInfo}>
              <Text style={styles.selectedLabel}>選択した国:</Text>
              <Text style={styles.selectedValue}>
                {selectedCountry.flag} {selectedCountry.name} (
                {selectedCountry.region})
              </Text>
            </View>
          )}

          <Button
            text='次へ'
            onPress={handleNext}
            style={styles.nextButton}
            textStyle={styles.nextButtonText}
            inactive={!selectedCountry}
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
    content: {
      flex: 1,
    } as ViewStyle,
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
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
    countryGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    } as ViewStyle,
    countryButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
      borderWidth: 1,
      borderColor: COLOR(colorScheme).BORDER.PRIMARY,
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderRadius: 12,
      minWidth: 140,
      minHeight: 60,
    } as ViewStyle,
    selectedCountryButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      borderColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
    } as ViewStyle,
    countryButtonText: {
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 16,
      textAlign: 'center',
    } as TextStyle,
    selectedCountryButtonText: {
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
      fontSize: 18,
      fontWeight: '600',
      color: COLOR(colorScheme).TEXT.PRIMARY,
    } as TextStyle,
    nextButton: {
      backgroundColor: COLOR(colorScheme).BACKGROUND.EMPHASIZE,
      paddingVertical: 20,
      paddingHorizontal: 24,
      borderRadius: 12,
      minHeight: 56,
    } as ViewStyle,
    nextButtonText: {
      color: COLOR(colorScheme).TEXT.EMPHASIZE,
      fontSize: 18,
      fontWeight: '600',
    } as TextStyle,
  })
  return styles
})

export default CountrySelectionScreen
