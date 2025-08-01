export interface BladeShape {
  name: string
  description: string
  maskPoints: Array<{ x: number; y: number }>
}

export const BLADE_SHAPES: BladeShape[] = [
  {
    name: '日本刀',
    description: '長い曲線を持つ日本の伝統的な刀',
    maskPoints: [
      { x: 0.1, y: 0.4 },
      { x: 0.9, y: 0.35 },
      { x: 0.95, y: 0.5 },
      { x: 0.9, y: 0.65 },
      { x: 0.1, y: 0.6 },
      { x: 0.05, y: 0.5 },
    ],
  },
  {
    name: '西洋剣',
    description: '真っ直ぐな両刃の西洋の剣',
    maskPoints: [
      { x: 0.1, y: 0.35 },
      { x: 0.85, y: 0.35 },
      { x: 0.95, y: 0.5 },
      { x: 0.85, y: 0.65 },
      { x: 0.1, y: 0.65 },
      { x: 0.05, y: 0.5 },
    ],
  },
  {
    name: 'ダガー',
    description: '短剣型の鋭利な刃',
    maskPoints: [
      { x: 0.2, y: 0.3 },
      { x: 0.8, y: 0.3 },
      { x: 0.9, y: 0.5 },
      { x: 0.8, y: 0.7 },
      { x: 0.2, y: 0.7 },
      { x: 0.1, y: 0.5 },
    ],
  },
  {
    name: '三日月刀',
    description: '三日月のような曲線を持つ刀',
    maskPoints: [
      { x: 0.1, y: 0.45 },
      { x: 0.3, y: 0.25 },
      { x: 0.7, y: 0.3 },
      { x: 0.9, y: 0.5 },
      { x: 0.8, y: 0.7 },
      { x: 0.5, y: 0.75 },
      { x: 0.2, y: 0.65 },
      { x: 0.05, y: 0.5 },
    ],
  },
  {
    name: '槍先',
    description: '鋭い槍の先端',
    maskPoints: [
      { x: 0.15, y: 0.2 },
      { x: 0.85, y: 0.2 },
      { x: 0.95, y: 0.5 },
      { x: 0.85, y: 0.8 },
      { x: 0.15, y: 0.8 },
      { x: 0.05, y: 0.5 },
    ],
  },
]

export const getRandomBladeShape = (): BladeShape => {
  const randomIndex = Math.floor(Math.random() * BLADE_SHAPES.length)
  return BLADE_SHAPES[randomIndex]
}

export const createMaskSVG = (
  shape: BladeShape,
  width: number,
  height: number,
): string => {
  const points = shape.maskPoints
    .map((point) => `${point.x * width},${point.y * height}`)
    .join(' ')

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <mask id="bladeMask">
          <rect width="100%" height="100%" fill="black"/>
          <polygon points="${points}" fill="white"/>
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="transparent" mask="url(#bladeMask)"/>
    </svg>
  `
}

export const normalizeImageDimensions = (
  imageWidth: number,
  imageHeight: number,
  maxWidth: number = 800,
  maxHeight: number = 800,
): { width: number; height: number } => {
  const aspectRatio = imageWidth / imageHeight

  let newWidth = imageWidth
  let newHeight = imageHeight

  if (imageWidth > maxWidth) {
    newWidth = maxWidth
    newHeight = newWidth / aspectRatio
  }

  if (newHeight > maxHeight) {
    newHeight = maxHeight
    newWidth = newHeight * aspectRatio
  }

  return {
    width: Math.round(newWidth),
    height: Math.round(newHeight),
  }
}
