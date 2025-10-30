// src/components/EfficiencyMeter.tsx

import { Detail } from "@raycast/api";

interface Props {
  data: {
    efficiency: number;
    rank: string;
    emoji: string;
    totalKm: number;
    netKm: number;
    fuelLiters: number;
  };
}

export default function EfficiencyMeter({ data }: Props) {
  // テキストベースのメーターを生成
  const meter = generateMeter(data.efficiency);

  const markdown = `
# ${data.emoji} ${data.rank}

## 今日の燃費: ${data.efficiency} km/L

${meter}

---

## 📊 詳細データ

| 項目 | 数値 |
|------|------|
| 総走行距離 | ${data.totalKm} km |
| デッドマイル | -5 km |
| **正味走行** | **${data.netKm} km** |
| 給油量 | ${data.fuelLiters} L |
| **燃費** | **${data.efficiency} km/L** |

---

## 🎯 ランク基準

| ランク | 燃費 | 評価 |
|--------|------|------|
| 🏆 アスリート級 | 20+ km/L | 超人的な活動量！ |
| 🔥 超優秀 | 15-20 km/L | 素晴らしい！ |
| ✨ 優秀 | 10-15 km/L | とても良い！ |
| 👍 良好 | 7-10 km/L | 良い調子！ |
| 😅 普通 | 5-7 km/L | もう少し動こう |
| 💀 要改善 | 5km/L未満 | 運動不足かも |

---

## 💡 燃費アップのヒント

${getAdvice(data.efficiency)}
  `;

  return (
    <Detail
      markdown={markdown}
    />
  );
}

function generateMeter(efficiency: number): string {
  const maxValue = 30;
  const filledLength = Math.round((efficiency / maxValue) * 30);
  const emptyLength = 30 - filledLength;

  const filled = "█".repeat(filledLength);
  const empty = "░".repeat(emptyLength);

  return `\`\`\`
${filled}${empty} ${efficiency.toFixed(1)} km/L
\`\`\``;
}

function getAdvice(efficiency: number): string {
  if (efficiency >= 20) {
    return "🏆 **完璧です！** このペースを維持しましょう。";
  } else if (efficiency >= 15) {
    return "🔥 **素晴らしい！** アスリート級まであと少し！";
  } else if (efficiency >= 10) {
    return "✨ **良い調子！** 運動時間を少し増やすと超優秀に到達できます。";
  } else if (efficiency >= 7) {
    return "👍 **悪くない！** 散歩や軽い運動を追加してみましょう。";
  } else if (efficiency >= 5) {
    return "😅 **もう少し動きましょう！** 30分のジョギングで大きく改善します。";
  } else {
    return "💀 **運動不足かも！** まずは10分の散歩から始めてみましょう。\n\nデスクワークだけでは燃費は上がりません。積極的に体を動かしましょう！";
  }
}
