import { Dimensions } from 'react-native'
import type { PersonTarget, Position } from '@/types/game'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

export const generateRandomTargets = (count: number = 6): PersonTarget[] => {
  const targets: PersonTarget[] = []
  const targetSize = 60
  const margin = 40

  for (let i = 0; i < count; i++) {
    let position: Position
    let attempts = 0
    const maxAttempts = 50

    do {
      position = {
        x: Math.random() * (screenWidth - targetSize - margin * 2) + margin,
        y:
          Math.random() * (screenHeight * 0.6 - targetSize - margin * 2) +
          margin +
          100,
      }
      attempts++
    } while (
      attempts < maxAttempts &&
      targets.some(
        (target) =>
          Math.abs(target.position.x - position.x) < targetSize + 20 &&
          Math.abs(target.position.y - position.y) < targetSize + 20,
      )
    )

    targets.push({
      id: `target-${i}`,
      position,
      isHit: false,
    })
  }

  return targets
}

export const checkCollision = (
  itemPosition: Position,
  targetPosition: Position,
  itemSize: number = 40,
  targetSize: number = 60,
): boolean => {
  const distance = Math.sqrt(
    (itemPosition.x - targetPosition.x) ** 2 +
      (itemPosition.y - targetPosition.y) ** 2,
  )

  return distance < (itemSize + targetSize) / 2
}

export const calculateTrajectory = (
  start: Position,
  end: Position,
  progress: number,
): Position => {
  'worklet'

  const deltaX = end.x - start.x
  const deltaY = end.y - start.y

  // 放物線の軌道を計算
  const x = start.x + deltaX * progress
  const arc = 4 * progress * (1 - progress) * Math.abs(deltaY) * 0.3
  const y = start.y + deltaY * progress - arc

  return { x, y }
}

export const generateUniqueId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const isTabletDevice = (): boolean => {
  return screenWidth >= 768
}
