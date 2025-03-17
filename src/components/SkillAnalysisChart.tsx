import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Legend
} from "recharts";

type SkillVector = {
    technicalSkill: number;
    problemSolving: number;
    communication: number;
    leadership: number;
    businessAcumen: number;
};

type SkillAnalysisChartProps = {
    currentVector: SkillVector;
    targetVector?: SkillVector;
    showCurrentOnly?: boolean;
};

export function SkillAnalysisChart({
    currentVector,
    targetVector,
    showCurrentOnly = false
}: SkillAnalysisChartProps) {
    // レーダーチャート用のデータ整形
    const chartData = [
        { subject: '技術スキル', currentValue: currentVector.technicalSkill, targetValue: targetVector?.technicalSkill, fullMark: 5 },
        { subject: '問題解決', currentValue: currentVector.problemSolving, targetValue: targetVector?.problemSolving, fullMark: 5 },
        { subject: 'コミュニケーション', currentValue: currentVector.communication, targetValue: targetVector?.communication, fullMark: 5 },
        { subject: 'リーダーシップ', currentValue: currentVector.leadership, targetValue: targetVector?.leadership, fullMark: 5 },
        { subject: 'ビジネス理解', currentValue: currentVector.businessAcumen, targetValue: targetVector?.businessAcumen, fullMark: 5 },
    ];

    return (
        <div className="aspect-square max-h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={chartData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} tick={{ fontSize: 10 }} />

                    <Radar
                        name="現在のスキル"
                        dataKey="currentValue"
                        stroke="#6366f1"
                        fill="#818cf8"
                        fillOpacity={0.5}
                    />

                    {!showCurrentOnly && targetVector && (
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
