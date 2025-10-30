# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

「健康ダッシュボード」という Raycast 拡張機能で、個人の健康を燃費メタファーで可視化します。3つのメインコマンドで構成されています：

- **`index`**: 今日の燃費を確認 (Check Today's Efficiency) - 日々の燃費を表示するダッシュボード
- **`log-activity`**: 今日のドライブ (Today's Journey) - 活動を記録して走行距離を追加
- **`log-meal`**: 今日の給油 (Food Refueling) - 食事を記録して給油量を追加

### コンセプト
- **活動（燃費）** = 健康的な活動で体が「走行」し、燃費（km/L）で健康度を数値化
- **食事（給油）** = 食事による栄養補給を「給油」に喩えて管理
- **ダッシュボード** = 日々の健康状態をリアルタイム表示

## 技術スタック

- **Framework**: Raycast API with React 18
- **Language**: TypeScript
- **State Management**: React hooks（ローカル状態）
- **Data Persistence**: @raycast/api の LocalStorage
- **Utilities**: @raycast/utils (Raycast utilities)
- **Linting**: ESLint with Raycast config
- **Code Formatting**: Prettier
- **Build Tool**: ray (Raycast CLI)

**注記**: react-d3-speedometer は初期案ですが、現在の実装ではテキストベースのメーター表示を採用しています

## 開発コマンド

```bash
# 開発サーバーの起動
npm run dev

# 拡張機能のビルド
npm run build

# コード検査（ESLint）
npm run lint

# コードの自動フォーマット（Prettier）
npm run fix-lint

# Raycast App Store に公開（認証必須）
npm run publish
```

## プロジェクト構成

```
src/
├── index.tsx                     # 燃費ダッシュボード（メインコマンド）
├── log-activity.tsx              # 活動記録コマンド
├── log-meal.tsx                  # 食事記録コマンド
├── components/
│   ├── EfficiencyMeter.tsx       # 燃費メーター表示コンポーネント
│   ├── ActivityResult.tsx        # 活動記録結果表示コンポーネント
│   ├── MealResult.tsx            # 食事記録結果表示コンポーネント
│   └── AdditionalQuestion.tsx    # AI追加質問フォームコンポーネント
└── utils/
    └── storage.ts               # LocalStorage 管理ユーティリティ

package.json                      # 拡張機能メタデータとスクリプト
dist/                             # ビルド出力（`npm run build` で生成）
```

## アーキテクチャパターン

### Raycast コマンド構造
`package.json` の `commands` セクションで各コマンドを定義します。各コマンドは：
- `name`（ユニークID）、`title`（表示名）、`description`（説明）、`mode`（通常は "view"）を持つ
- ソースコード内のコンポーネントに対応
- `src/` 内に配置される（例：`src/index.tsx`、`src/log-activity.tsx`）

### React コンポーネント + Raycast UI
- Raycast UI コンポーネントを使用します（web HTML ではなく）
- 使用コンポーネント: `Detail`（ダッシュボード・結果表示）、`Form`（フォーム入力）など
- ローカル状態は React hooks で管理
- グローバル状態は @raycast/api の LocalStorage を使用

### データ永続化
**現在の実装：** `src/utils/storage.ts` で LocalStorage 管理

**保持されるデータ：**
```typescript
// 活動データ
interface Activity {
  id: string;
  name: string;
  distance: number;
  timestamp: number;
}

// 食事データ
interface Meal {
  id: string;
  name: string;
  fuel: number;
  timestamp: number;
}
```

**ストレージキー：**
- `ACTIVITIES_KEY = "activities"` - 全活動のリスト
- `MEALS_KEY = "meals"` - 全食事のリスト

**主要関数：**
- `getActivities()` - 全活動を取得
- `savActivity(activity)` - 活動を保存
- `getTodayActivities()` - 本日の活動のみ取得
- `getMeals()` - 全食事を取得
- `saveMeal(meal)` - 食事を保存
- `getTodayMeals()` - 本日の食事のみ取得

## 開発ガイドライン

### コードスタイル
- Raycast ESLint 設定を遵守（@raycast/eslint-config を拡張）
- Prettier でコード自動フォーマット（`npm run fix-lint` を実行）
- コンポーネントは `.tsx` 拡張子、ユーティリティは `.ts` 拡張子を使用

### ファイル命名規則
- コマンドコンポーネント: `package.json` のコマンド名に合わせた小文字（例：`index.tsx`、`log-activity.tsx`）
- ユーティリティ/ヘルパー: 説明的な camelCase（例：`storage.ts`）
- カスタムフック: `use` プレフィックス（React 慣例）（例：`useStorage`）
- UI コンポーネント: PascalCase（例：`EfficiencyMeter.tsx`）

### Raycast API の使用
- `@raycast/api` から core 機能をインポート
- `@raycast/utils` から便利なユーティリティをインポート
- ローディング状態とエラーハンドリングは必ず Raycast UI で実装
- 参考：Raycast API ドキュメント（https://developers.raycast.com/）

### 依存パッケージ
現在のインストール済みパッケージ：
```json
"@raycast/api": "^1.83.0",
"@raycast/utils": "^1.17.0",
"react": "^18.3.1"
```

- 新規パッケージ追加は最小限に
- Raycast UI で実現可能な機能は外部パッケージに頼らない
- ESLint・Prettier は設定変更が不要な限り修正しない

### 実装上のポイント
- 各コマンドのコンポーネントは独立した状態を持つ（useNavigation で画面遷移）
- 日付別のデータフィルタリング機能を活用（`getTodayActivities()` など）
- AI API 連携予定時は、Promise/async-await を使用してローディング状態を管理

## デプロイメント

- デプロイ前に `npm run build` を実行して `dist/` を最新に保つ
- `npm run publish` で Raycast App Store に公開（認証情報が必要）
- 拡張機能メタデータは `package.json` に記載
- アイコンファイルはルートディレクトリに `command-icon.png` として配置

## 注意すべきポイント

1. Raycast UI コンポーネントを使用する（web HTML 要素は使わない）
2. 非同期処理は Raycast のローディング状態を使用して適切に処理
3. ローカルストレージに機密情報を保存する際は暗号化を検討
4. `npm run dev` で実際の Raycast 環境でテストを実施
5. React Router・Next.js などの web-only ライブラリはインポートしない
6. LocalStorage には日付情報を含める（同じキーで上書きされるのを防ぐ）

## AI Agent 開発ガイドライン

このプロジェクトでは、設計判断・実装履歴・削除記録を `docs/ai-agent/_memory/` で管理しています。

### メモリシステムについて
次のインスタンスの Claude Code が効率的に開発を進められるよう、重要な決定や実装内容を記録してください：

**`docs/ai-agent/_memory/thinking/`** - 設計判断や技術選択の背景
- 複数の案を検討した場合、選んだ案と棄却した案を記録
- トレードオフと判断理由を明記
- 参考資料へのリンクを含める

**`docs/ai-agent/_memory/features/`** - 実装完了した機能の記録
- 実装完了した機能名と実装日時
- 関連するコミット・ファイルへのリンク
- 実装のポイントと注意点

**`docs/ai-agent/_memory/deleted/`** - 削除したコード・機能の記録
- 削除した機能・ファイル名と削除理由
- 影響範囲と代替手段
- 今後の防止策

### ファイル命名規則
```
YYYYMMDD_description.md
```
例：`20251031_efficiency-meter-implementation.md`

詳細は `docs/ai-agent/_memory/README.md` を参照してください。