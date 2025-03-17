import { HardSkillEvaluation } from "@/features/profile/actions/generateHardSkillEvaluationPrompt";
import { SoftSkillEvaluation } from "@/features/profile/actions/generateSoftSkillEvaluationPrompt";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

type SkillEvaluation = SoftSkillEvaluation & HardSkillEvaluation;

type SkillAnalysisChartProps = {
  skillEvaluation: SkillEvaluation;
  showCurrentOnly?: boolean;
};

export function SkillAnalysisChart({
  skillEvaluation,
  showCurrentOnly = false,
}: SkillAnalysisChartProps) {
  // レーダーチャート用のデータ整形
  const chartData = [
    {
      subject: "プログラミング",
      currentValue: skillEvaluation.current.programming,
      targetValue: skillEvaluation.desired.programming,
      fullMark: 5,
    },
    {
      subject: "データベース",
      currentValue: skillEvaluation.current.database,
      targetValue: skillEvaluation.desired.database,
      fullMark: 5,
    },
    {
      subject: "ソフトウェア開発",
      currentValue: skillEvaluation.current.softwareDevelopment,
      targetValue: skillEvaluation.desired.softwareDevelopment,
      fullMark: 5,
    },
    {
      subject: "システム設計",
      currentValue: skillEvaluation.current.systemDesign,
      targetValue: skillEvaluation.desired.systemDesign,
      fullMark: 5,
    },
    {
      subject: "コミュニケーション",
      currentValue: skillEvaluation.current.communication,
      targetValue: skillEvaluation.desired.communication,
      fullMark: 5,
    },
    {
      subject: "チームワーク",
      currentValue: skillEvaluation.current.teamwork,
      targetValue: skillEvaluation.desired.teamwork,
      fullMark: 5,
    },
    {
      subject: "リーダーシップ",
      currentValue: skillEvaluation.current.leadership,
      targetValue: skillEvaluation.desired.leadership,
      fullMark: 5,
    },
  ];

  return (
    <div className="aspect-square max-h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: "#4b5563", fontSize: 12 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />

          <Radar
            name="現在のスキル"
            dataKey="currentValue"
            stroke="#6366f1"
            fill="#818cf8"
            fillOpacity={0.5}
          />

          {!showCurrentOnly && skillEvaluation.desired && (
            <Radar
              name="目標スキル"
              dataKey="targetValue"
              stroke="#8b5cf6"
              fill="#a78bfa"
              fillOpacity={0.3}
            />
          )}

          <Legend wrapperStyle={{ paddingTop: 20 }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
