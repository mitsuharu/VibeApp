import * as ImagePicker from 'expo-image-picker'
import { useState } from 'react'
import { Alert } from 'react-native'

export interface SelectedImage {
  uri: string
  width: number
  height: number
}

export const useImagePicker = () => {
  const [isLoading, setIsLoading] = useState(false)

  const requestPermissions = async (): Promise<boolean> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      Alert.alert(
        '権限が必要です',
        'プレゼン資料画像を選択するために、写真ライブラリへのアクセス権限が必要です。',
      )
      return false
    }
    return true
  }

  const pickImage = async (): Promise<SelectedImage | null> => {
    setIsLoading(true)

    try {
      const hasPermission = await requestPermissions()
      if (!hasPermission) {
        return null
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.8,
        aspect: [4, 3],
      })

      if (!result.canceled && result.assets[0]) {
        const asset = result.assets[0]
        return {
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
        }
      }

      return null
    } catch (error) {
      console.error('画像選択エラー:', error)
      Alert.alert('エラー', 'プレゼン資料の選択に失敗しました')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    pickImage,
    isLoading,
  }
}
