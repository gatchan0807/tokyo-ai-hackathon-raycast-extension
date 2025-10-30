# CLAUDE.md の更新 - プロジェクト状態の反映

**実装完了日**: 2025-10-31
**関連コミット**: (コミット予定)

## 概要

プロジェクトの現在の実装状況に合わせて `CLAUDE.md` を大規模更新しました。初期案と実装内容のズレを解消し、次のインスタンスの Claude Code が正確な情報に基づいて開発できるようにしました。

## 実装内容

### 1. プロジェクト概要を日本語に統一
- 英語から日本語へのドキュメント言語統一
- 実装済みの3つのコマンドを正確に反映
  - `index`: 今日の燃費を確認
  - `log-activity`: 今日のドライブ
  - `log-meal`: 今日の給油
- 「燃費・給油」メタファーのコンセプト説明を追加

### 2. 技術スタック の修正
**修正内容:**
- `react-d3-speedometer` が初期案だが、未使用なことを明記
- 実装では**テキストベースのメーター表示**を採用していることを記載
- 実際に使用されている依存パッケージを正確に列挙：
  - `@raycast/api@^1.83.0`
  - `@raycast/utils@^1.17.0`
  - `react@^18.3.1`

### 3. プロジェクト構成の詳細化
```
src/
├── index.tsx                      # メインダッシュボード
├── log-activity.tsx               # 活動記録コマンド
├── log-meal.tsx                   # 食事記録コマンド
├── components/
│   ├── EfficiencyMeter.tsx        # 燃費メーター表示
│   ├── ActivityResult.tsx         # 活動記録結果表示
│   ├── MealResult.tsx             # 食事記録結果表示
│   └── AdditionalQuestion.tsx     # AI追加質問フォーム
└── utils/
    └── storage.ts                 # LocalStorage管理
```

### 4. データ永続化の詳細ドキュメント化
**実装済みの TypeScript インターフェース:**
```typescript
interface Activity {
  id: string;
  name: string;
  distance: number;
  timestamp: number;
}

interface Meal {
  id: string;
  name: string;
  fuel: number;
  timestamp: number;
}
```

**ストレージ管理関数:**
- `getActivities()` - 全活動を取得
- `savActivity(activity)` - 活動を保存
- `getTodayActivities()` - 本日の活動のみ取得
- `getMeals()` - 全食事を取得
- `saveMeal(meal)` - 食事を保存
- `getTodayMeals()` - 本日の食事のみ取得

### 5. 開発ガイドラインの充実
**ファイル命名規則を明確化:**
- コマンドコンポーネント: `index.tsx`、`log-activity.tsx`（小文字）
- UI コンポーネント: `EfficiencyMeter.tsx`（PascalCase）
- ユーティリティ: `storage.ts`（camelCase）
- カスタムフック: `use` プレフィックス付き

**実装上のポイントを追記:**
- `useNavigation` hook による画面遷移
- 日付フィルタリング機能（`getTodayActivities()` など）の活用
- AI API 連携時の Promise/async-await 使用

### 6. AI Agent 開発ガイドラインを新規追加
`docs/ai-agent/_memory/` システムの使用方法を CLAUDE.md に統合：

**3つのメモリカテゴリ:**
- `thinking/` - 設計判断・技術選択の背景
- `features/` - 実装完了した機能の記録（本ファイルはここ）
- `deleted/` - 削除したコード・機能の記録

**ファイル命名規則:**
```
YYYYMMDD_description.md
例: 20251031_claude-md-update.md
```

## 修正前後の比較

| 項目 | 修正前 | 修正後 |
|------|-------|-------|
| 言語 | 英語 | 日本語 |
| react-d3-speedometer 記載 | 依存パッケージとして記載 | 未使用として注記 |
| プロジェクト構成 | 概要のみ | 全ファイルパス列挙 |
| データ永続化 | 抽象的な説明 | インターフェース・関数まで詳細化 |
| メモリシステムについて | 未記載 | 詳細なガイドライン追加 |

## 実装のポイント

1. **現状との整合性**
   - 実際の実装内容を調査してから CLAUDE.md を更新
   - 初期案と実装内容のズレを明確にして記載

2. **次のインスタンスへの配慮**
   - プロジェクトの全体構造が一目でわかるように構成
   - ファイルパス・関数名を具体的に記載
   - 設計判断の背景（メモリシステム）を説明

3. **メンテナンス性**
   - セクション分けを明確に
   - コード例を充実させ、実際に参考にできる形式に
   - AI Agent のメモリシステムとの連携を明記

## 関連ファイル

- `CLAUDE.md` - 本更新の対象ファイル
- `docs/ai-agent/_memory/README.md` - メモリシステムの詳細ガイド
- `src/utils/storage.ts` - LocalStorage 管理の実装

## 今後の検討項目

1. **新機能追加時**
   - この CLAUDE.md に実装内容を反映
   - 設計判断を `docs/ai-agent/_memory/thinking/` に記録

2. **コード削除時**
   - 削除理由・影響範囲を `docs/ai-agent/_memory/deleted/` に記録

3. **大規模な設計変更時**
   - トレードオフと判断理由を明記して CLAUDE.md を更新
