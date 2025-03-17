import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export type TimelineItem = {
  id: string;
  title: string;
  description: string;
  durationMonths: number; // 月数で保存
  durationText: string;   // 表示用
  skills?: string[];
  date?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  currentPosition: string;
  targetCareer: string;
};

export function Timeline({ items, currentPosition, targetCareer }: TimelineProps) {
  // 総月数を計算
  const totalMonths = items.reduce((sum, item) => sum + item.durationMonths, 0);
  // 年と月に変換
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  // 累積月数を計算（各ステップの完了時点での累積月数）
  const cumulativeMonths = items.reduce((acc, item, index) => {
    const prevTotal = index > 0 ? acc[index - 1] : 0;
    acc.push(prevTotal + item.durationMonths);
    return acc;
  }, [] as number[]);

  return (
    <div className="space-y-6">
      {/* 目標達成までの期間サマリー */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">目標達成までの期間</h3>
          <span className="text-lg font-bold text-green-600">
            {years > 0 ? `${years}年` : ""}
            {months > 0 ? `${months}ヶ月` : years > 0 ? "" : "すぐに達成可能"}
          </span>
        </div>

        {/* 進捗バー */}
        <div className="mb-2">
          <Progress value={0} className="bg-gray-200 h-2 border border-gray-300" />
        </div>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>現在地点</span>
          <span>{targetCareer}</span>
        </div>
      </div>

      <div className="relative pl-8 border-l-2 border-muted">
        {/* 現在地点 */}
        <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 z-10" />
        <div className="mb-10">
          <p className="text-sm font-medium text-blue-500">現在</p>
          <h3 className="text-xl font-semibold mt-1">{currentPosition}</h3>
          <p className="text-sm text-muted-foreground mt-1">スタート地点</p>
        </div>

        {/* タイムラインアイテム */}
        {items.map((item, index) => {
          // 現在の項目までの累積期間を計算
          const completedMonths = cumulativeMonths[index];
          const completedYears = Math.floor(completedMonths / 12);
          const remainingMonths = completedMonths % 12;
          const progressPercentage = (completedMonths / totalMonths) * 100;

          return (
            <div key={item.id} className="mb-10">
              <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-primary z-10" />

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{item.durationText}</p>
                <p className="text-xs text-slate-500">
                  {/* 累積時間の表示 */}
                  <span className="font-medium">
                    {index === items.length - 1 ? "目標達成" : "経過期間: "}
                    {completedYears > 0 ? `${completedYears}年` : ""}
                    {remainingMonths > 0 ? `${remainingMonths}ヶ月` : ""}
                  </span>
                  {index !== items.length - 1 && (
                    <span className="ml-1">
                      ({Math.round(progressPercentage)}%)
                    </span>
                  )}
                </p>
              </div>

              {/* 進捗バーを各ステップに追加 */}
              <div className="mt-1 mb-2">
                <Progress
                  value={progressPercentage}
                  className="h-1.5 border-none bg-gray-200"
                />
              </div>

              <Card className="p-4 mt-2">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                {item.skills && item.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                )}
                {item.date && <p className="text-xs text-muted-foreground mt-3">{item.date}</p>}
              </Card>
            </div>
          );
        })}

        {/* 終点 (目標キャリア) */}
        <div className="absolute left-[-9px] bottom-0 w-4 h-4 rounded-full bg-green-500 z-10" />
        <div>
          <p className="text-sm font-medium text-green-500">目標</p>
          <h3 className="text-xl font-semibold mt-1">{targetCareer}</h3>
          <p className="text-sm text-muted-foreground mt-1">キャリア目標達成</p>
        </div>
      </div>
    </div>
  );
}
