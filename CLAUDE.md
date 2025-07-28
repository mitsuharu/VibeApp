# CLAUDE.md

必ず日本語で回答してください。
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.

## アプリ概要

「同僚からひと笑いを貰わないとログインできない認証システム」は、チームコミュニケーションを促進するユニークな認証フローを持つReact Native + Expoアプリです。

### 認証フロー
1. ユーザーネーム入力画面 (`/`)
2. チャレンジ画面 (`/challenge`) - ランダムな同僚とお題が表示され、「笑った！」または「面白くない」を選択
3. パスワード入力画面 (`/password`) - 同僚のパスワードを入力（実際は任意のパスワードで認証通過）
4. 成功画面 (`/success`) - 6桁のランダムログインキーを表示

**重要**: 「面白くない」を選択した場合はトップページに戻ります。

## 開発コマンド

### 基本コマンド
- `yarn install` - 依存関係のインストール
- `yarn start` - Expo開発サーバー起動
- `yarn android` - Android エミュレーターで起動
- `yarn ios` - iOS シミュレーターで起動
- `yarn web` - Web版で起動

### コード品質
- `yarn lint` - Biome による lint チェック＆自動修正

## アーキテクチャ

### 技術スタック
- **React Native + Expo**: メインフレームワーク
- **Expo Router**: ファイルベースルーティング
- **TypeScript**: 型安全性
- **Context API**: グローバル状態管理（AuthContext）
- **react-native-swag-styles**: レスポンシブスタイリング
- **Biome**: リンター・フォーマッター

### ディレクトリ構造
```
src/
├── app/           # Expo Router による画面ファイル
├── hooks/         # カスタムフック（AuthContext.tsx が中心）
├── types/         # TypeScript 型定義
├── utils/         # ユーティリティ関数（mockData.ts）  
├── constants/     # 定数（Colors.ts でテーマ管理）
└── assets/        # 画像・フォントリソース
```

### 状態管理
- `AuthContext` で認証状態を一元管理
- `useAuth` フックでコンポーネントから状態にアクセス
- 認証フローは `AuthStep` 型で管理（'username' | 'challenge' | 'password' | 'success'）

### コンポーネント設計パターン
**プレゼンテーション・コンテナーパターン**を採用：
- `Component`: UIレンダリング専用（propsを受け取り、表示のみ）
- `Container`: ビジネスロジック＆状態管理（hooksを使用し、Componentにpropsを渡す）

### スタイリング
- `makeStyles` + `useColorScheme` でダークモード対応
- `COLOR(colorScheme)` でテーマカラー管理
- タブレット対応: `maxWidth` + `alignSelf: 'center'` でレスポンシブ

### モックデータ
- `src/utils/mockData.ts` に8人の架空同僚と10個のお題
- `getRandomColleague()` と `getRandomTopic()` でランダム選択
- `generateLoginKey()` で6桁数字生成

## コーディングルール

### 参照するルール
- [mitsuharu/CodingRules](https://github.com/mitsuharu/CodingRules/blob/main/src/react-native/components.md)
- 利用可能コンポーネント: [@mitsuharu/react-native-components-plus](https://github.com/mitsuharu/react-native-components-plus)

### 重要な制約
- **Expo対応パッケージのみ使用可能**
- **iOS・Android・タブレット対応必須**
- **ネットワーク通信は不要**（すべてモック）
- **型定義は src/types に配置**
- **hooks は src/hooks に配置**
