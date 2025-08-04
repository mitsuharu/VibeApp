export interface Country {
  id: string
  name: string
  region: string
  flag: string
}

export interface TravelPurpose {
  id: string
  name: string
  description: string
  emoji: string
}

export interface TravelPlan {
  country: Country
  purpose: TravelPurpose
  plan: string
}

export const COUNTRIES: Country[] = [
  { id: '1', name: 'フランス', region: 'ヨーロッパ', flag: '🇫🇷' },
  { id: '2', name: 'イタリア', region: 'ヨーロッパ', flag: '🇮🇹' },
  { id: '3', name: 'スペイン', region: 'ヨーロッパ', flag: '🇪🇸' },
  { id: '4', name: 'イギリス', region: 'ヨーロッパ', flag: '🇬🇧' },
  { id: '5', name: 'ドイツ', region: 'ヨーロッパ', flag: '🇩🇪' },
  { id: '6', name: 'アメリカ', region: '北アメリカ', flag: '🇺🇸' },
  { id: '7', name: 'カナダ', region: '北アメリカ', flag: '🇨🇦' },
  { id: '8', name: '韓国', region: 'アジア', flag: '🇰🇷' },
  { id: '9', name: 'タイ', region: 'アジア', flag: '🇹🇭' },
  { id: '10', name: 'シンガポール', region: 'アジア', flag: '🇸🇬' },
  { id: '11', name: 'オーストラリア', region: 'オセアニア', flag: '🇦🇺' },
  { id: '12', name: 'UAE', region: '中東', flag: '🇦🇪' },
]

export const PURPOSES: TravelPurpose[] = [
  { id: '1', name: '観光', description: '名所・観光地巡り', emoji: '🏛️' },
  {
    id: '2',
    name: 'グルメ',
    description: '現地料理・レストラン体験',
    emoji: '🍽️',
  },
  {
    id: '3',
    name: 'ショッピング',
    description: 'お買い物・お土産探し',
    emoji: '🛍️',
  },
  {
    id: '4',
    name: '文化体験',
    description: '美術館・博物館・文化体験',
    emoji: '🎨',
  },
  {
    id: '5',
    name: 'リラックス',
    description: 'スパ・リゾート・癒し',
    emoji: '🧘‍♀️',
  },
  {
    id: '6',
    name: 'アクティビティ',
    description: 'スポーツ・アウトドア活動',
    emoji: '🏃‍♂️',
  },
]
