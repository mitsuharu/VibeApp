export interface Position {
  x: number
  y: number
}

export interface PersonTarget {
  id: string
  position: Position
  isHit: boolean
  hitTime?: number
}

export interface ThrowingItem {
  id: string
  imageUri: string
  startPosition: Position
  targetPosition: Position
  isFlying: boolean
  isCompleted: boolean
}

export interface GameState {
  score: number
  totalThrows: number
  hits: number
  targets: PersonTarget[]
  throwingItems: ThrowingItem[]
  isGameActive: boolean
  selectedImage: string | null
}

export interface GameStats {
  score: number
  hits: number
  totalThrows: number
  accuracy: number
}
