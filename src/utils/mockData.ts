import type { Colleague, Topic } from '../types/auth'

export const mockColleagues: Colleague[] = [
  {
    id: '1',
    name: '田中太郎',
    department: '営業課',
    password: 'password123',
  },
  {
    id: '2',
    name: '佐藤花子',
    department: '企画部',
    password: 'password123',
  },
  {
    id: '3',
    name: '山田次郎',
    department: '総務課',
    password: 'password123',
  },
  {
    id: '4',
    name: '鈴木美咲',
    department: 'IT部',
    password: 'password123',
  },
  {
    id: '5',
    name: '高橋健一',
    department: '経理課',
    password: 'password123',
  },
  {
    id: '6',
    name: '渡辺真理',
    department: '人事部',
    password: 'password123',
  },
  {
    id: '7',
    name: '伊藤誠',
    department: 'マーケティング部',
    password: 'password123',
  },
  {
    id: '8',
    name: '中村さくら',
    department: 'デザイン課',
    password: 'password123',
  },
]

export const mockTopics: Topic[] = [
  {
    id: '1',
    content: '昨日のコーヒーマシンの件でお疲れ様でした！',
  },
  {
    id: '2',
    content: '新しいプロジェクトの進捗はいかがですか？',
  },
  {
    id: '3',
    content: '今日のお昼ご飯、何にしましたか？',
  },
  {
    id: '4',
    content: '週末はどこか出かけましたか？',
  },
  {
    id: '5',
    content: '最近読んだ本でおすすめはありますか？',
  },
  {
    id: '6',
    content: '今度の会議の資料準備、順調ですか？',
  },
  {
    id: '7',
    content: '今年の目標は何か決めましたか？',
  },
  {
    id: '8',
    content: '最近のトレンドについてどう思いますか？',
  },
  {
    id: '9',
    content: '今日の天気、良いですね！',
  },
  {
    id: '10',
    content: '新しいツールの使い心地はいかがですか？',
  },
]

export const getRandomColleague = (): Colleague => {
  const randomIndex = Math.floor(Math.random() * mockColleagues.length)
  return mockColleagues[randomIndex]
}

export const getRandomTopic = (): Topic => {
  const randomIndex = Math.floor(Math.random() * mockTopics.length)
  return mockTopics[randomIndex]
}

export const generateLoginKey = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
