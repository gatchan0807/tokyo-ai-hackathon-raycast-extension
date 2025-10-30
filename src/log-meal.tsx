// src/log-meal.tsx

import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { saveMeal } from "./utils/storage";
import MealResult from "./components/MealResult";

export default function LogMealCommand() {
  const [mealError, setMealError] = useState<string | undefined>();
  const { push } = useNavigation();

  async function handleSubmit(values: { meal: string }) {
    // バリデーション
    if (!values.meal.trim()) {
      setMealError("食事内容を入力してください");
      return;
    }

    try {
      setMealError(undefined);

      // TODO: ここでAI APIを呼び出して給油量を計算
      // 仮の実装
      await saveMeal({
        name: "記録済み",
        fuel: 0,
        timestamp: Date.now(),
      });

      // 詳細画面に遷移
      push(<MealResult meal={values.meal} />);

      showToast({
        style: Toast.Style.Success,
        title: "記録完了",
        message: "食事を記録しました",
      });
    } catch (error) {
      showToast({
        style: Toast.Style.Failure,
        title: "エラー",
        message: "記録に失敗しました",
      });
    }
  }

  return (
    <Form
      actions={
      <ActionPanel>
        <Action.SubmitForm
        title="記録する / Log"
        onSubmit={handleSubmit}
        />
      </ActionPanel>
      }
    >
      <Form.TextArea
      id="meal"
      title="今日は何を食べましたか？ / What did you eat today?"
      placeholder="AIに今日の食事内容を伝えましょう / Tell AI about your meals today"
      defaultValue={`例 / Example：
朝食：抜き / Breakfast: Skipped
昼食：ポークステーキ 200g + ご飯 1杯 / Lunch: Pork steak 200g + 1 bowl of rice
夜食：醤油ラーメン / Dinner: Soy sauce ramen`}
        error={mealError}
        onChange={() => setMealError(undefined)}
      />
    </Form>
  );
}
