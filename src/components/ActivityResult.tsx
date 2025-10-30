// src/components/ActivityResult.tsx

import { Detail, ActionPanel, Action, useNavigation } from "@raycast/api";
import { EfficiencyData } from "..";
import EfficiencyMeter from "./EfficiencyMeter";

interface Props {
  activity: string;
  addonQuestion: string;
}

export default function ActivityResult({ activity, addonQuestion }: Props) {
  const { push } = useNavigation();
  const markdown = `
## Input Content | 入力内容

${activity}

---

## AI Feedback | AIからのフィードバック

${addonQuestion}

`;

  return (
    <Detail
      markdown={markdown}
      actions={
        <ActionPanel>
          <Action title="ダッシュボードに戻る" onAction={() => {
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
          }} />
        </ActionPanel>
      }
    />
  );
}
