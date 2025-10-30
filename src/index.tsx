// src/index.tsx

import { List } from "@raycast/api";
import { useEffect, useState } from "react";
import EfficiencyMeter from "./components/EfficiencyMeter";

export interface EfficiencyData {
  efficiency: number;
  rank: string;
  emoji: string;
  totalKm: number;
  netKm: number;
  fuelLiters: number;
  activities: Activity[];
  meals: Meal[];
}

export interface Activity {
  id: string;
  name: string;
  distance: number;
}

export interface Meal {
  id: string;
  name: string;
  fuel: number;
}

export default function Command() {
  const [data, setData] = useState<EfficiencyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    // TODO: APIから取得に変更
    // 固定値でメーター表示を確認
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
    setData(mockData);
    setIsLoading(false);
  };

  if (isLoading || !data) {
    return <List isLoading={true} />;
  }

  return (
    <EfficiencyMeter data={data} />
  );
}