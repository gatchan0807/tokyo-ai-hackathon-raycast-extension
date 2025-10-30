// src/components/EfficiencyMeter.tsx

import { Detail, useNavigation } from "@raycast/api";

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
    const { pop } = useNavigation();
    // テキストベースのメーターを生成
    const meter = generateMeter(data.efficiency);

    const markdown = `
# Today is 【 ${data.emoji} ${data.rank} 】 day!

## Today's Fuel Efficiency: ${data.efficiency} km/L
## 今日の燃費: ${data.efficiency} km/L

${meter}

---

## 📊 Detailed Data / 詳細データ

| Item / 項目 | Value / 数値 |
|------|------|
| Total worked distance / 総走行距離 | ${data.totalKm} km |
| Basal metabolic rate adjustment / 基礎代謝分の調整 | -5 km |
| **Net km / 正味走行距離** | **${data.netKm} km** |
| Today's meal / 給油量 | ${data.fuelLiters} L |
| **Today's Fuel Efficiency / 燃費** | **${data.efficiency} km/L** |

---

## 🎯 Rank Standards / ランク基準

| Rank / ランク | Efficiency / 燃費 | Rating / 評価 |
|--------|------|------|
| 🏆 Athlete Level / アスリート級 | 20+ km/L | Superhuman activity level! / 超人的な活動量！ |
| 🔥 Excellent / 超優秀 | 15-20 km/L | Amazing! / 素晴らしい！ |
| ✨ Great / 優秀 | 10-15 km/L | Very good! / とても良い！ |
| 👍 Good / 良好 | 7-10 km/L | Nice pace! / 良い調子！ |
| 😅 So so. / 普通 | 5-7 km/L | Move a bit more / もう少し動こう |
| 💀 Needs Improvement / 要改善 | <5 km/L | Might be lacking exercise / 運動不足かも |

---

## 💡 Tips to Improve Fuel Efficiency / 燃費アップのヒント

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
