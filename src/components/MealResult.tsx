// src/components/MealResult.tsx

import { Detail, ActionPanel, Action, useNavigation } from "@raycast/api";

interface Props {
  meal: string;
}

export default function MealResult({ meal }: Props) {
  const { pop } = useNavigation();

  const markdown = `
# ✅ 食事を記録しました

## 入力内容

${meal}

---

## 🔄 次のステップ

- TOPに戻って他のコマンドを実行
- ダッシュボードで燃費を確認
`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action
            title="TOPに戻る"
            onAction={pop}
            shortcut={{ modifiers: ["cmd"], key: "return" }}
          />
        </ActionPanel>
      }
    />
  );
}
