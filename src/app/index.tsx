import {
  Button,
  LoadingSpinner,
  Spacer,
  styleType,
} from '@mitsuharu/react-native-components-plus'
import { Image } from 'expo-image'
import { useState } from 'react'
import {
  Alert,
  Dimensions,
  type ImageStyle,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  useColorScheme,
  View,
  type ViewStyle,
} from 'react-native'
import { makeStyles } from 'react-native-swag-styles'
import { SimpleThrowingAnimation } from '@/components/SimpleThrowingAnimation'
import { COLOR } from '@/constants/Colors'
import { useGameLogic } from '@/hooks/useGameLogic'
import { type SelectedImage, useImagePicker } from '@/hooks/useImagePicker'
import { isTabletDevice } from '@/utils/gameUtils'

const PERSON_ICON = '👤'

type GameScreenProps = {
  selectedImage: SelectedImage | null
  gameState: ReturnType<typeof useGameLogic>['gameState']
  isPickerLoading: boolean
  onPickImage: () => void
  onStartGame: () => void
  onTargetPress: (position: { x: number; y: number }) => void
  onResetGame: () => void
  onAnimationComplete: (
    itemId: string,
    finalPosition: { x: number; y: number },
  ) => void
}

const GameScreen: React.FC<GameScreenProps> = ({
  selectedImage,
  gameState,
  isPickerLoading,
  onPickImage,
  onStartGame,
  onTargetPress,
  onResetGame,
  onAnimationComplete,
}) => {
  const styles = useStyles()
  const isTablet = isTabletDevice()

  if (!gameState.isGameActive) {
    return (
      <View style={styles.setupContainer}>
        <Text style={styles.title}>プレゼン資料投げ輪ゲーム</Text>
        <Text style={styles.subtitle}>
          プレゼン資料を人のアイコンに投げて、相手に「刺さる」ようにしましょう！
        </Text>

        <Spacer height={32} />

        {!selectedImage ? (
          <View style={styles.buttonContainer}>
            <Button
              text='プレゼン資料を選択'
              onPress={onPickImage}
              inactive={isPickerLoading}
              style={styles.button}
            />
            {isPickerLoading && (
              <>
                <Spacer height={16} />
                <LoadingSpinner isLoading={true} />
              </>
            )}
          </View>
        ) : (
          <View style={styles.imagePreviewContainer}>
            <Text style={styles.imageLabel}>選択されたプレゼン資料</Text>
            <Image
              source={{ uri: selectedImage.uri }}
              style={[
                styles.previewImage,
                isTablet && styles.tabletPreviewImage,
              ]}
              contentFit='cover'
            />
            <Spacer height={24} />
            <View style={styles.buttonRow}>
              <Button
                text='別の資料を選択'
                onPress={onPickImage}
                inactive={isPickerLoading}
                style={styles.halfButton}
              />
              <Spacer width={16} />
              <Button
                text='ゲーム開始'
                onPress={onStartGame}
                style={styles.halfButton}
              />
            </View>
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={styles.gameContainer}>
      <View style={styles.statusBar}>
        <Text style={styles.scoreText}>スコア: {gameState.score}</Text>
        <Text style={styles.statsText}>
          {gameState.hits}/{gameState.totalThrows} 命中
        </Text>
        <TouchableOpacity onPress={onResetGame} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>リセット</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.gameArea}>
        {gameState.targets.map((target) => (
          <TouchableOpacity
            key={target.id}
            onPress={() => onTargetPress(target.position)}
            style={[
              styles.personTarget,
              {
                left: target.position.x,
                top: target.position.y,
              },
              target.isHit && styles.hitTarget,
            ]}
          >
            <Text
              style={[styles.personIcon, target.isHit && styles.hitPersonIcon]}
            >
              {PERSON_ICON}
            </Text>
          </TouchableOpacity>
        ))}

        {gameState.throwingItems.map((item) => (
          <SimpleThrowingAnimation
            key={item.id}
            item={item}
            onAnimationComplete={onAnimationComplete}
          />
        ))}
      </View>

      {selectedImage && (
        <View style={styles.launcherArea}>
          <Text style={styles.instructionText}>
            人のアイコンをタップしてプレゼン資料を投げよう！
          </Text>
          <Image
            source={{ uri: selectedImage.uri }}
            style={styles.launcherImage}
            contentFit='cover'
          />
        </View>
      )}
    </View>
  )
}

const Container: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null)
  const { pickImage, isLoading: isPickerLoading } = useImagePicker()
  const gameLogic = useGameLogic()

  const handlePickImage = async () => {
    const result = await pickImage()
    if (result) {
      setSelectedImage(result)
    }
  }

  const handleStartGame = () => {
    if (!selectedImage) {
      Alert.alert('エラー', 'プレゼン資料を選択してください')
      return
    }
    gameLogic.startGame(selectedImage.uri)
  }

  const handleTargetPress = (position: { x: number; y: number }) => {
    gameLogic.throwItem(position)
  }

  const handleResetGame = () => {
    gameLogic.resetGame()
    setSelectedImage(null)
  }

  return (
    <GameScreen
      selectedImage={selectedImage}
      gameState={gameLogic.gameState}
      isPickerLoading={isPickerLoading}
      onPickImage={handlePickImage}
      onStartGame={handleStartGame}
      onTargetPress={handleTargetPress}
      onResetGame={handleResetGame}
      onAnimationComplete={gameLogic.handleAnimationComplete}
    />
  )
}

const useStyles = makeStyles(useColorScheme, (colorScheme) => {
  const { width: screenWidth } = Dimensions.get('window')
  const isTablet = screenWidth >= 768

  const styles = StyleSheet.create({
    setupContainer: styleType<ViewStyle>({
      flex: 1,
      padding: isTablet ? 32 : 16,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    }),
    gameContainer: styleType<ViewStyle>({
      flex: 1,
      backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    }),
    title: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: isTablet ? 28 : 24,
      fontWeight: 'bold',
      textAlign: 'center',
    }),
    subtitle: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.SECONDARY,
      fontSize: isTablet ? 18 : 16,
      textAlign: 'center',
      marginTop: 8,
      paddingHorizontal: 16,
    }),
    buttonContainer: styleType<ViewStyle>({
      width: '100%',
      maxWidth: 300,
      alignItems: 'center',
    }),
    button: styleType<ViewStyle>({
      width: '100%',
    }),
    imagePreviewContainer: styleType<ViewStyle>({
      alignItems: 'center',
      width: '100%',
      maxWidth: 400,
    }),
    imageLabel: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    }),
    previewImage: styleType<ImageStyle>({
      width: 200,
      height: 150,
      borderRadius: 12,
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
    }),
    tabletPreviewImage: styleType<ImageStyle>({
      width: 300,
      height: 225,
    }),
    buttonRow: styleType<ViewStyle>({
      flexDirection: 'row',
      width: '100%',
    }),
    halfButton: styleType<ViewStyle>({
      flex: 1,
    }),
    statusBar: styleType<ViewStyle>({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
    }),
    scoreText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 18,
      fontWeight: 'bold',
    }),
    statsText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.SECONDARY,
      fontSize: 14,
    }),
    resetButton: styleType<ViewStyle>({
      paddingHorizontal: 16,
      paddingVertical: 8,
      backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
      borderRadius: 8,
    }),
    resetButtonText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.PRIMARY,
      fontSize: 14,
    }),
    gameArea: styleType<ViewStyle>({
      flex: 1,
      position: 'relative',
    }),
    personTarget: styleType<ViewStyle>({
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
    }),
    hitTarget: styleType<ViewStyle>({
      backgroundColor: 'rgba(76, 175, 80, 0.3)',
    }),
    personIcon: styleType<TextStyle>({
      fontSize: 40,
    }),
    hitPersonIcon: styleType<TextStyle>({
      opacity: 0.5,
    }),
    launcherArea: styleType<ViewStyle>({
      alignItems: 'center',
      padding: 16,
      backgroundColor: COLOR(colorScheme).BACKGROUND.SECONDARY,
    }),
    instructionText: styleType<TextStyle>({
      color: COLOR(colorScheme).TEXT.SECONDARY,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 8,
    }),
    launcherImage: styleType<ImageStyle>({
      width: 60,
      height: 45,
      borderRadius: 8,
    }),
  })
  return styles
})

export default Container
