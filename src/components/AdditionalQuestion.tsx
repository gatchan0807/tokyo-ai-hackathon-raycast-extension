// src/components/AdditionalQuestion.tsx

import { Form, ActionPanel, Action, showToast, Toast, useNavigation, Icon } from "@raycast/api";
import { useState } from "react";

interface Props {
  originalActivity: string;
  question: string;
}

export default function AdditionalQuestion({ originalActivity, question }: Props) {
  const [answerError, setAnswerError] = useState<string | undefined>();
  const { pop } = useNavigation();

  async function handleSubmit(values: { answer: string }) {
    // バリデーション
    if (!values.answer.trim()) {
      setAnswerError("回答を入力してください");
      return;
    }

    try {
      setAnswerError(undefined);

      // TODO: ここでAI APIに追加質問の回答を送信
      console.log("Original Activity:", originalActivity);
      console.log("Question:", question);
      console.log("Answer:", values.answer);

      showToast({
        style: Toast.Style.Success,
        title: "記録完了",
        message: "回答を記録しました",
      });

      // ダッシュボードに戻す（2回pop）
      pop();
      pop();
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
            icon={Icon.CheckCircle}
            title="回答する"
            onSubmit={handleSubmit}
          />
        </ActionPanel>
      }
    >
      <Form.Description text={`質問: ${question}`} />
      <Form.TextArea
        id="answer"
        title="あなたの回答"
        placeholder="回答を入力してください..."
        error={answerError}
        onChange={() => setAnswerError(undefined)}
      />
    </Form>
  );
}
