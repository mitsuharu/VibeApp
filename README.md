# ViewApp

- React Native + Expo で作る VibeApp です

## Get started

1. Install dependencies

   ```bash
   yarn install
   ```

2. Start the app

   ```bash
   yarn expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 旅行プランアプリの使い方

このアプリは海外旅行のプランを半自動で作成するシンプルなアプリです。

### 機能

1. **国選択**: 世界12カ国から旅行先を選択
2. **目的選択**: 6つの旅行目的から選択
3. **旅行プラン生成**: AI（OpenAI）を使用した詳細な旅行プランの自動生成
4. **プラン表示**: 生成された3泊4日の旅行プランを美しいデザインで表示

### 使用方法

1. **アプリ起動**: アプリを起動すると自動的に国選択画面に遷移します
2. **国選択**: 
   - 🇫🇷 フランス、🇮🇹 イタリア、🇪🇸 スペイン、🇬🇧 イギリス、🇩🇪 ドイツ
   - 🇺🇸 アメリカ、🇨🇦 カナダ
   - 🇰🇷 韓国、🇹🇭 タイ、🇸🇬 シンガポール
   - 🇦🇺 オーストラリア、🇦🇪 UAE
   
   地域別に分類された12カ国から旅行先を選択します
3. **目的選択**: 
   - 🏛️ 観光（名所・観光地巡り）
   - 🍽️ グルメ（現地料理・レストラン体験）
   - 🛍️ ショッピング（お買い物・お土産探し）
   - 🎨 文化体験（美術館・博物館・文化体験）
   - 🧘‍♀️ リラックス（スパ・リゾート・癒し）
   - 🏃‍♂️ アクティビティ（スポーツ・アウトドア活動）
   
   6つの旅行目的から選択します
4. **プラン生成**: 選択した国と目的を基にAIが詳細な3泊4日の旅行プランを自動生成します
5. **プラン確認**: 
   - **時間単位の詳細スケジュール**（08:00、09:00～12:00など具体的な時間）
   - 1日目（到着日）から4日目（帰国日）まで時間単位で構成
   - おすすめ観光スポット（目的に特化）
   - 移動手段と所要時間（地下鉄、タクシー、徒歩など）
   - グルメ・レストラン情報（営業時間も含む）
   - 宿泊先の提案（エリア・特徴・予約のコツ）
   - 詳細な予算の目安（航空券・宿泊・食事・観光・交通費・お土産など）
   - 注意事項・持ち物・現地での注意点・アドバイス
   
   時間単位の実用的で具体的なプランが表示されます

### 追加機能

- **別プラン生成**: 同じ国・目的で異なるアプローチのプランを生成
- **最初から始める**: 国選択から再開

### 注意事項

- OpenAI APIキーが必要です（app.config.tsで設定）
- APIキーが未設定の場合はエラーが表示されます
- 生成されるプランは実際の旅行計画として活用できる詳細な内容です

### 技術仕様

- **フレームワーク**: React Native + Expo
- **ナビゲーション**: Expo Router (file-based routing)
- **UI**: @mitsuharu/react-native-components-plus
- **スタイリング**: react-native-swag-styles
- **AI統合**: OpenAI GPT-4 API
- **対応プラットフォーム**: iOS、Android、Web、タブレット対応
