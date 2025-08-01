import * as FileSystem from 'expo-file-system'
import * as ImageManipulator from 'expo-image-manipulator'
import * as MediaLibrary from 'expo-media-library'
import { useState } from 'react'
import { Alert } from 'react-native'
import type { BladeShape } from '@/utils/bladeShapes'
import { normalizeImageDimensions } from '@/utils/bladeShapes'

export interface ManipulatedImage {
  uri: string
  width: number
  height: number
  blade: BladeShape
  processedUri?: string
}

export const useImageManipulator = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const cropImageWithBlade = async (
    imageUri: string,
    originalWidth: number,
    originalHeight: number,
    bladeShape: BladeShape,
  ): Promise<ManipulatedImage | null> => {
    setIsProcessing(true)

    try {
      const { width, height } = normalizeImageDimensions(
        originalWidth,
        originalHeight,
      )

      const resizedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width, height } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.PNG },
      )

      return {
        uri: resizedImage.uri,
        width: resizedImage.width,
        height: resizedImage.height,
        blade: bladeShape,
      }
    } catch (error) {
      console.error('画像処理エラー:', error)
      Alert.alert('エラー', '画像の処理に失敗しました')
      return null
    } finally {
      setIsProcessing(false)
    }
  }

  const saveBase64AsFile = async (
    base64Data: string,
  ): Promise<string | null> => {
    try {
      const base64Image = base64Data.replace('data:image/png;base64,', '')
      const filename = `blade_shaped_${Date.now()}.png`
      const fileUri = `${FileSystem.documentDirectory}${filename}`

      await FileSystem.writeAsStringAsync(fileUri, base64Image, {
        encoding: FileSystem.EncodingType.Base64,
      })

      return fileUri
    } catch (error) {
      console.error('Base64画像保存エラー:', error)
      return null
    }
  }

  const saveImageToLibrary = async (imageUri: string): Promise<boolean> => {
    setIsSaving(true)

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert(
          '権限が必要です',
          'メディアライブラリへの保存権限が必要です。設定から許可してください。',
        )
        return false
      }

      const asset = await MediaLibrary.createAssetAsync(imageUri)

      const album = await MediaLibrary.getAlbumAsync('VibeApp')
      if (album) {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false)
      } else {
        await MediaLibrary.createAlbumAsync('VibeApp', asset, false)
      }

      Alert.alert('保存完了', '画像がフォトライブラリに保存されました')
      return true
    } catch (error) {
      console.error('画像保存エラー:', error)
      Alert.alert('エラー', '画像の保存に失敗しました')
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return {
    cropImageWithBlade,
    saveBase64AsFile,
    saveImageToLibrary,
    isProcessing,
    isSaving,
  }
}
