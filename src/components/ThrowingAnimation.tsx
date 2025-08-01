import { Image } from 'expo-image'
import type React from 'react'
import { useEffect } from 'react'
import { View, type ViewStyle } from 'react-native'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import type { Position, ThrowingItem } from '@/types/game'

interface Props {
  item: ThrowingItem
  onAnimationComplete: (itemId: string, finalPosition: Position) => void
}

export const ThrowingAnimation: React.FC<Props> = ({
  item,
  onAnimationComplete,
}) => {
  const progress = useSharedValue(0)
  const rotation = useSharedValue(0)

  useEffect(() => {
    if (item.isFlying) {
      progress.value = withTiming(
        1,
        {
          duration: 1500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        },
        (finished) => {
          if (finished) {
            const finalPos = {
              x: item.targetPosition.x,
              y: item.targetPosition.y,
            }
            runOnJS(onAnimationComplete)(item.id, finalPos)
          }
        },
      )

      rotation.value = withTiming(720, {
        duration: 1500,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    }
  }, [
    item.isFlying,
    item.id,
    item.targetPosition,
    onAnimationComplete,
    progress,
    rotation,
  ])

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'

    // 軌道計算をインライン化
    const deltaX = item.targetPosition.x - item.startPosition.x
    const deltaY = item.targetPosition.y - item.startPosition.y

    const x = item.startPosition.x + deltaX * progress.value
    const arc =
      4 * progress.value * (1 - progress.value) * Math.abs(deltaY) * 0.3
    const y = item.startPosition.y + deltaY * progress.value - arc

    return {
      position: 'absolute',
      left: x,
      top: y,
      transform: [
        { rotate: `${rotation.value}deg` },
        { scale: 1 - progress.value * 0.2 },
      ],
      opacity: item.isCompleted ? 0.3 : 1,
    }
  })

  return (
    <Animated.View style={animatedStyle}>
      <View
        style={{
          width: 40,
          height: 30,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <Image
          source={{ uri: item.imageUri }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 4,
          }}
          contentFit='cover'
        />
      </View>
    </Animated.View>
  )
}
