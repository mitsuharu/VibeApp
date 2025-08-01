import { Image } from 'expo-image'
import type React from 'react'
import { useEffect, useState } from 'react'
import { View } from 'react-native'
import type { Position, ThrowingItem } from '@/types/game'

interface Props {
  item: ThrowingItem
  onAnimationComplete: (itemId: string, finalPosition: Position) => void
}

export const SimpleThrowingAnimation: React.FC<Props> = ({
  item,
  onAnimationComplete,
}) => {
  const [position, setPosition] = useState(item.startPosition)

  useEffect(() => {
    if (item.isFlying) {
      // シンプルなタイマーベースのアニメーション
      const animationDuration = 1000
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / animationDuration, 1)

        if (progress < 1) {
          // 線形補間で位置を計算
          const x =
            item.startPosition.x +
            (item.targetPosition.x - item.startPosition.x) * progress
          const y =
            item.startPosition.y +
            (item.targetPosition.y - item.startPosition.y) * progress

          setPosition({ x, y })
          requestAnimationFrame(animate)
        } else {
          // アニメーション完了
          setPosition(item.targetPosition)
          onAnimationComplete(item.id, item.targetPosition)
        }
      }

      requestAnimationFrame(animate)
    }
  }, [
    item.isFlying,
    item.id,
    item.startPosition,
    item.targetPosition,
    onAnimationComplete,
  ])

  return (
    <View
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        width: 40,
        height: 30,
        opacity: item.isCompleted ? 0.3 : 1,
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
  )
}
