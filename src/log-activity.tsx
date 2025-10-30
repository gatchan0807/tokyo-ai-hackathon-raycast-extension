// src/log-activity.tsx

import { Form, ActionPanel, Action, showToast, Toast, useNavigation } from "@raycast/api";
import { useState } from "react";
import ActivityResult from "./components/ActivityResult";
import EfficiencyMeter from "./components/EfficiencyMeter";
import { EfficiencyData } from ".";

export default function LogActivityCommand() {
  const [activityError, setActivityError] = useState<string | undefined>();
  const { push } = useNavigation();

  async function handleSubmit(values: { activity: string }) {
    // バリデーション
    if (!values.activity.trim()) {
      setActivityError("活動名を入力してください");
      return;
    }

    try {
      setActivityError(undefined);

      // TODO: ここでAI APIを呼び出してレスポンスを取得
      // 仮のレスポンスを設定
      const mockResponse = `
詳細を確認させてください！🚗
## 移動について
電車移動は片道何分くらいでしたか？座れましたか、立っていましたか？
（帰りの電車も含めて教えてください）
開発作業について
Webアプリの開発作業の内容を教えてください：

- A: レビューや調査がメイン (3.5-5.5km/h)
- B: 通常の実装作業 (7-10.5km/h)
- C: 設計を伴う実装や難しい問題解決 (12.5-15.5km/h)

開発作業は何時間くらいでしたか？
## MTGについて
2回のMTGは合計で何時間くらいでしたか？
また、どんな内容でしたか？

- 定例MTG（報告メイン）: 3.5km/h
- 1on1: 5.5km/h
- ブレスト（アイデア出し）: 8.5km/h
- 調整MTG: 10.5km/h
- 意思決定MTG: 12.5km/h

これらが分かれば、正確な燃費を計算できます！💪
      `;

      // Detail画面に遷移
      push(
        <ActivityResult
          activity={values.activity}
          addonQuestion={mockResponse}
          onGoToDashboard={() => {
            const mockData: EfficiencyData = {
              efficiency: 12.5,
              rank: "Good",
              emoji: "👍",
              totalKm: 150,
              netKm: 120,
              fuelLiters: 10,
              activities: [
                { id: "1", name: "ウォーキング", distance: 5 },
                { id: "2", name: "ジョギング", distance: 10 },
              ],
              meals: [
                { id: "1", name: "朝食", fuel: 3 },
                { id: "2", name: "昼食", fuel: 5 },
              ],
            };

            push(<EfficiencyMeter data={mockData} />);
          }}
        />
      );

      showToast({
        style: Toast.Style.Success,
        title: "記録完了",
        message: "活動を記録しました",
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
        title="記録する / Log Activity"
        onSubmit={handleSubmit}
        />
      </ActionPanel>
      }
    >
      <Form.TextArea
      id="activity"
      info="自然な言葉で入力してください。AIが自動で解析します。 / Please enter in natural language. AI will automatically analyze it."
      title="今日は何をしましたか？ / What did you do today?"
      placeholder="AIに今日の活動内容を伝えましょう / Tell AI about your daily activities"
      defaultValue={`例 / Example：
今日は朝10時からオフィスに電車で移動して、オフィスでWebアプリの開発作業をして2回MTGがある一日だった。

Today I took the train to the office at 10 AM, worked on web app development at the office, and had 2 meetings throughout the day.
`}
      error={activityError}
      onChange={() => setActivityError(undefined)}
      />
    </Form>
  );
}
