// src/log-activity.tsx

import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import { savActivity } from "./utils/storage";

export default function LogActivityCommand() {
  const [nameError, setNameError] = useState<string | undefined>();
  const [distanceError, setDistanceError] = useState<string | undefined>();
  const { pop } = useNavigation();

  async function handleSubmit(values: { name: string; distance: string }) {
    // バリデーション
    if (!values.name.trim()) {
      setNameError("活動名を入力してください");
      return;
    }
    setNameError(undefined);

    const distance = parseFloat(values.distance);
    if (isNaN(distance) || distance <= 0) {
      setDistanceError("走行距離は0より大きい数値で入力してください");
      return;
    }
    setDistanceError(undefined);

    try {
      await savActivity({
        name: values.name,
        distance: distance,
        timestamp: Date.now(),
      });

      showToast({
        style: Toast.Style.Success,
        title: "記録完了",
        message: `${values.name} (${distance} km) を記録しました`,
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
      <Form.TextField
        id="name"
        title="活動名"
        placeholder="例：ジョギング、ウォーキング"
        error={nameError}
        onChange={() => setNameError(undefined)}
      />
      <Form.TextField
        id="distance"
        title="走行距離 (km)"
        placeholder="例：5"
        error={distanceError}
        onChange={() => setDistanceError(undefined)}
      />
    </Form>
  );
}
