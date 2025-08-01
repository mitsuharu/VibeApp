# 「プレゼン資料が相手に刺さらない」を解決するジョークアプリ

## 仕様書

「プレゼン資料が相手に刺さらない」を解決するアプリのモックとして、次の架空のプレゼン資料の画像を人のアイコン画像に投げる、投げ輪のようなゲームアプリ。

1. アプリから画像を選択する
2. 選択した画像を人に見立てた複数アイコン画像に投げていく

## コーディング

作成言語は React Native + Expo です。新しいパッケージを追加する場合は、Expo をサポートしているパッケージのみとしてください。iOSとAndroidに対応して、タブレットにも対応してください。

コーディングルールとして、https://github.com/mitsuharu/CodingRules/blob/main/src/react-native/components.md を参照してください。

また、簡単なコンポーネントに関しては、すでにプロジェクトに導入済みの https://github.com/mitsuharu/react-native-components-plus を利用してください。

expo router で実装してください。hooksを実装する場合は、src/hooksに実装して、適切にimportしてしてください。ほか、必要であれば、src/types や src/utils にファイルを追加してください。

テキスト入力でキーボードを利用する際は、KeyboardAvoidingView https://reactnative.dev/docs/keyboardavoidingview などを利用して、キーボードで入力対象のコンポーネントが隠れないようにして下さい。
