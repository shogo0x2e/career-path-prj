"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timeline } from "@/features/roadmap/components/Timeline";
import { generatedRoadmapsState } from "@/atoms/generated-roadmaps-state";
import { useAtom } from "jotai";

// モックデータ
// const careerRoadmapData: Record<string, {
//   label: string;
//   description: string;
//   timelineItems: TimelineItem[];
// }> = {
//   "SoftwareEngineer": {
//     label: "ソフトウェアエンジニア",
//     description: "技術スキルと問題解決能力を活かして、高品質なソフトウェア開発を行うキャリアパス",
//     timelineItems: [
//       {
//         id: "1",
//         title: "企業Aに長期インターンを開始",
//         description: "実務経験を積むため、週3日のインターンシップを開始。基本的なコーディングスキルを向上させる。",
//         durationMonths: 6,
//         durationText: "6ヶ月",
//         skills: ["JavaScript", "React", "Git"],
//         date: "2024年4月"
//       },
//       {
//         id: "2",
//         title: "企業Bに転職",
//         description: "より専門的なスキルを身につけるため、フルスタック開発を行うスタートアップに参画。",
//         durationMonths: 12,
//         durationText: "1年",
//         skills: ["TypeScript", "Node.js", "AWS", "データベース設計"],
//         date: "2025年10月"
//       },
//       {
//         id: "3",
//         title: "オープンソースプロジェクトにコントリビュート",
//         description: "技術コミュニティとの繋がりを強化し、OSS活動を通じて専門性を高める。",
//         durationMonths: 11,
//         durationText: "11ヶ月",
//         skills: ["オープンソース貢献", "コミュニケーション", "コードレビュー"],
//         date: "2026年9月"
//       },
//       {
//         id: "4",
//         title: "テックリードとして小規模プロジェクトを担当",
//         description: "3-4人のチームをリードし、設計から実装までを主導する経験を積む。",
//         durationMonths: 18,
//         durationText: "1年6ヶ月",
//         skills: ["リーダーシップ", "プロジェクト管理", "アーキテクチャ設計"],
//         date: "2028年3月"
//       }
//     ]
//   },
//   "TechLead": {
//     label: "テックリード",
//     description: "技術的な専門知識とリーダーシップを組み合わせ、チームを導く重要な役割",
//     timelineItems: [
//       {
//         id: "1",
//         title: "企業Cでシニアエンジニアとして勤務",
//         description: "複雑な技術的課題に取り組み、深い専門知識を構築する。",
//         durationMonths: 12,
//         durationText: "1年",
//         skills: ["システム設計", "パフォーマンス最適化", "トラブルシューティング"],
//         date: "2024年4月"
//       },
//       {
//         id: "2",
//         title: "メンタリングプログラムを開始",
//         description: "ジュニアエンジニアの成長を支援し、教育スキルを向上させる。",
//         durationMonths: 8,
//         durationText: "8ヶ月",
//         skills: ["メンタリング", "コミュニケーション", "コードレビュー"],
//         date: "2025年5月"
//       },
//       {
//         id: "3",
//         title: "中規模プロジェクトのリーダーに就任",
//         description: "6-8人のチームをリードし、技術的な意思決定を担当。",
//         durationMonths: 16,
//         durationText: "1年4ヶ月",
//         skills: ["チームマネジメント", "技術戦略", "意思決定"],
//         date: "2027年1月"
//       },
//       {
//         id: "4",
//         title: "技術カンファレンスでの登壇",
//         description: "業界イベントで自社の技術的取り組みについて講演し、影響力を高める。",
//         durationMonths: 6,
//         durationText: "6ヶ月",
//         skills: ["プレゼンテーション", "業界知識", "コミュニティ活動"],
//         date: "2028年5月"
//       }
//     ]
//   },
//   "EngineeringManager": {
//     label: "エンジニアリングマネージャー",
//     description: "技術知識とマネジメントスキルを兼ね備え、チーム全体のパフォーマンスを最適化する役割",
//     timelineItems: [
//       {
//         id: "1",
//         title: "リーダーシップトレーニングに参加",
//         description: "マネジメントスキル向上のための研修プログラムを受講。",
//         durationMonths: 3,
//         durationText: "3ヶ月",
//         skills: ["リーダーシップ理論", "フィードバック", "チーム構築"],
//         date: "2024年4月"
//       },
//       {
//         id: "2",
//         title: "テックリードとして複数チームを担当",
//         description: "技術的なリーダーシップと調整能力を発揮する経験を積む。",
//         durationMonths: 18,
//         durationText: "1年6ヶ月",
//         skills: ["技術調整", "リソース管理", "プロジェクト計画"],
//         date: "2025年7月"
//       },
//       {
//         id: "3",
//         title: "副エンジニアリングマネージャーに就任",
//         description: "シニアマネージャーの下で、マネジメント実務を学ぶ。",
//         durationMonths: 12,
//         durationText: "1年",
//         skills: ["1on1ミーティング", "パフォーマンス評価", "採用活動"],
//         date: "2027年1月"
//       },
//       {
//         id: "4",
//         title: "組織改革プロジェクトに参画",
//         description: "部門全体の効率化と生産性向上のための取り組みをリード。",
//         durationMonths: 14,
//         durationText: "1年2ヶ月",
//         skills: ["組織開発", "変革管理", "経営戦略"],
//         date: "2028年1月"
//       }
//     ]
//   },
//   "ProductManager": {
//     label: "プロダクトマネージャー",
//     description: "ユーザーニーズと技術的実現可能性のバランスを取りながら、製品開発の方向性を定める役割",
//     timelineItems: [
//       {
//         id: "1",
//         title: "ユーザーリサーチチームに参加",
//         description: "顧客理解とデータ分析のスキルを強化する。",
//         durationMonths: 9,
//         durationText: "9ヶ月",
//         skills: ["ユーザーインタビュー", "データ分析", "市場調査"],
//         date: "2024年4月"
//       },
//       {
//         id: "2",
//         title: "アソシエイトプロダクトマネージャーとして転職",
//         description: "小規模な機能開発のオーナーシップを持ち、実践を通じて学ぶ。",
//         durationMonths: 15,
//         durationText: "1年3ヶ月",
//         skills: ["プロダクトロードマップ", "ユーザーストーリー", "優先順位付け"],
//         date: "2026年1月"
//       },
//       {
//         id: "3",
//         title: "プロダクト戦略のワークショップ開催",
//         description: "ステークホルダーを巻き込んだ協働ワークショップを企画・実施。",
//         durationMonths: 6,
//         durationText: "6ヶ月",
//         skills: ["ファシリテーション", "ステークホルダー管理", "戦略策定"],
//         date: "2027年4月"
//       },
//       {
//         id: "4",
//         title: "新規プロダクトラインの立ち上げ",
//         description: "ゼロから新しい製品カテゴリーの企画・開発を主導。",
//         durationMonths: 18,
//         durationText: "1年6ヶ月",
//         skills: ["新規事業開発", "マーケティング戦略", "収益モデル設計"],
//         date: "2028年10月"
//       }
//     ]
//   }
// };

// カスタムフックで処理するべきだが、現段階ではシンプルに
const formatCareerPathKey = (career: string) => {
  return career.replace(/ /g, "_");
};

export default function RoadmapPage() {
  const params = useParams();
  const careerKey = params.career as string;
  const formattedCareerKey = formatCareerPathKey(careerKey);

  const [generatedRoadmaps] = useAtom(generatedRoadmapsState);

  if (!generatedRoadmaps) {
    return <div>ロードマップが生成されていません</div>;
  }

  // データが存在しない場合のフォールバック
  const roadmapData = generatedRoadmaps[formattedCareerKey] || {
    label: careerKey,
    description: "このキャリアパスへのロードマップはまだ準備中です。",
    timelineItems: [],
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold">
            {roadmapData.label}へのロードマップ
          </h1>
          <Link href="/my/result" passHref>
            <Button variant="outline">結果に戻る</Button>
          </Link>
        </div>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle>キャリア目標: {roadmapData.label}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {roadmapData.description}
              </p>
            </div>

            {roadmapData.timelineItems.length > 0 && (
              <div className="mt-2 sm:mt-0">
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 px-3 py-1"
                >
                  {/* 総月数を計算 */}
                  {(() => {
                    const totalMonths = roadmapData.timelineItems.reduce(
                      (sum, item) => sum + item.durationMonths,
                      0
                    );
                    const years = Math.floor(totalMonths / 12);
                    const months = totalMonths % 12;

                    return (
                      <>
                        達成目安:
                        {years > 0 ? ` ${years}年` : ""}
                        {months > 0 ? ` ${months}ヶ月` : ""}
                      </>
                    );
                  })()}
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              {roadmapData.description}
            </p>

            <div className="py-6">
              <Timeline
                items={roadmapData.timelineItems}
                targetCareer={roadmapData.label}
              />
            </div>

            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-medium mb-4">
                このロードマップについて
              </h3>
              <p className="text-sm text-muted-foreground">
                このロードマップは、あなたの現在のスキルと経験に基づいて生成されています。
                各ステップに記載されている期間は目安であり、実際の進捗はあなたの学習ペースや環境によって異なります。
                定期的に進捗を振り返り、必要に応じてロードマップを調整することをお勧めします。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
