// src/log-activity.tsx

import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { savActivity } from "./utils/storage";

export default function LogActivityCommand() {
  const [activityError, setActivityError] = useState<string | undefined>();
  const { pop } = useNavigation();

  async function handleSubmit(values: { activity: string }) {
    // バリデーション
    if (!values.activity.trim()) {
      setActivityError("活動名を入力してください");
      return;
    }
    try {
      setActivityError(undefined);
      showToast({
        style: Toast.Style.Success,
        title: "記録完了",
        message: `${values.activity} を記録しました`,
      });

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
            title="記録する"
            onSubmit={handleSubmit}
          />
        </ActionPanel>
      }
    >
      <Form.TextArea
        id="activity"
        title="今日は何をしましたか？"
        defaultValue={`例：
今日は朝10時に起きて、11時から公園でジョギングをし、
12時から21時までWeb開発業務をしました。
その後、筋トレを30分行いました。`}
        error={activityError}
        onChange={() => setActivityError(undefined)}
      />
    </Form>
  );
}
