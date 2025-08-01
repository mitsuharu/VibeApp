import { useCallback, useState } from 'react'
import { Dimensions } from 'react-native'
import type {
  GameState,
  PersonTarget,
  Position,
  ThrowingItem,
} from '@/types/game'
import {
  checkCollision,
  generateRandomTargets,
  generateUniqueId,
} from '@/utils/gameUtils'

const { height: screenHeight } = Dimensions.get('window')

const initialGameState: GameState = {
  score: 0,
  totalThrows: 0,
  hits: 0,
  targets: [],
  throwingItems: [],
  isGameActive: false,
  selectedImage: null,
}

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState)

  const startGame = useCallback((imageUri: string) => {
    const targets = generateRandomTargets(6)
    setGameState({
      ...initialGameState,
      targets,
      isGameActive: true,
      selectedImage: imageUri,
    })
  }, [])

  const throwItem = useCallback(
    (targetPosition: Position) => {
      if (!gameState.isGameActive || !gameState.selectedImage) return

      const throwingItem: ThrowingItem = {
        id: generateUniqueId(),
        imageUri: gameState.selectedImage,
        startPosition: { x: 50, y: screenHeight - 150 }, // 画面下部から投げる
        targetPosition,
        isFlying: true,
        isCompleted: false,
      }

      setGameState((prev) => ({
        ...prev,
        throwingItems: [...prev.throwingItems, throwingItem],
        totalThrows: prev.totalThrows + 1,
      }))
    },
    [gameState.isGameActive, gameState.selectedImage],
  )

  const completeThrow = useCallback((throwId: string, hitTargetId?: string) => {
    setGameState((prev) => {
      const updatedThrowingItems = prev.throwingItems.map((item) =>
        item.id === throwId
          ? { ...item, isFlying: false, isCompleted: true }
          : item,
      )

      let updatedTargets = prev.targets
      let newScore = prev.score
      let newHits = prev.hits

      if (hitTargetId) {
        updatedTargets = prev.targets.map((target) =>
          target.id === hitTargetId
            ? { ...target, isHit: true, hitTime: Date.now() }
            : target,
        )
        newScore += 100
        newHits += 1
      }

      return {
        ...prev,
        throwingItems: updatedThrowingItems,
        targets: updatedTargets,
        score: newScore,
        hits: newHits,
      }
    })

    // 投げたアイテムを少し後に削除
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        throwingItems: prev.throwingItems.filter((item) => item.id !== throwId),
      }))
    }, 1000)
  }, [])

  const resetGame = useCallback(() => {
    setGameState(initialGameState)
  }, [])

  const handleAnimationComplete = useCallback(
    (throwId: string, finalPosition: Position) => {
      const hitTarget = gameState.targets.find(
        (target) =>
          !target.isHit && checkCollision(finalPosition, target.position),
      )

      completeThrow(throwId, hitTarget?.id)
    },
    [gameState.targets, completeThrow],
  )

  const checkForCollisions = useCallback(
    (throwId: string, currentPosition: Position) => {
      const hitTarget = gameState.targets.find(
        (target) =>
          !target.isHit && checkCollision(currentPosition, target.position),
      )

      if (hitTarget) {
        completeThrow(throwId, hitTarget.id)
        return true
      }

      return false
    },
    [gameState.targets, completeThrow],
  )

  return {
    gameState,
    startGame,
    throwItem,
    completeThrow,
    resetGame,
    handleAnimationComplete,
    checkForCollisions,
  }
}
