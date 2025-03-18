import { ProfileSummary } from "@/features/profile/actions/generateProfileSummary";
import { z } from "zod";

export const roadMapSchema = z.object({
  label: z.string(),
  description: z.string(),
  timelineItems: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      durationMonths: z.number(),
      durationText: z.string(),
      skills: z.array(z.string()),
      date: z.string(),
    })
  ),
});

export type RoadMap = z.infer<typeof roadMapSchema>;

export const generateRoadMapPrompt = async (
  profileSummary: ProfileSummary,
  company: string,
  career: string
) => {
  return `
  
  # 指示
  あなたは、プロフィール評価の専門家です。提示されたキャリアを実現するためのロードマップを JSON 形式で出力してください。

  # 現状

  ## できること
  ${profileSummary.currentSkills}

  ## やりたいこと
  ${profileSummary.desiredWork}

  ## やりたくないこと
  ${profileSummary.unwantedWork}

  # 企業一覧

  ## 企業 A
  - Web フロントエンド開発に注力
  - UI/UX デザインに高い関心
  - インフラエンジニアのポジションを募集中
  - React/Next.js を主要技術スタックとして採用
  - デザインシステムの整備に力を入れている

  ## 企業 B
  - Fintech スタートアップ
  - セキュリティを重視した堅牢な開発体制
  - スクラム開発を実践
  - プロダクトマネージャー(PdM)のポジションを募集中
  - TypeScript/Goを主要技術スタックとして採用

  ## 企業 C
  - フレックスタイム制を導入
  - リモートワーク推奨
  - テックリードのポジションを募集中
  - マイクロサービスアーキテクチャを採用
  - 技術選定の自由度が高い

  # 書式
  {
    "label": "${career}",
    "description": "技術スキルと問題解決能力を活かして、高品質なソフトウェア開発を行うキャリアパス",
    "timelineItems": [
      {
        id: "1",
        title: "企業Aに長期インターンを開始",
        description: "実務経験を積むため、週3日のインターンシップを開始。基本的なコーディングスキルを向上させる。",
        durationMonths: 6,
        durationText: "6ヶ月",
        skills: ["JavaScript", "React", "Git"],
        date: "2024年4月"
      },
      {
        id: "2",
        title: "企業Bに転職",
        description: "より専門的なスキルを身につけるため、フルスタック開発を行うスタートアップに参画。",
        durationMonths: 12,
        durationText: "1年",
        skills: ["TypeScript", "Node.js", "AWS", "データベース設計"],
        date: "2025年10月"
      },
      {
        id: "3",
        title: "オープンソースプロジェクトにコントリビュート",
        description: "技術コミュニティとの繋がりを強化し、OSS活動を通じて専門性を高める。",
        durationMonths: 11,
        durationText: "11ヶ月",
        skills: ["オープンソース貢献", "コミュニケーション", "コードレビュー"],
        date: "2026年9月"
      },
      {
        id: "4",
        title: "テックリードとして小規模プロジェクトを担当",
        description: "3-4人のチームをリードし、設計から実装までを主導する経験を積む。",
        durationMonths: 18,
        durationText: "1年6ヶ月",
        skills: ["リーダーシップ", "プロジェクト管理", "アーキテクチャ設計"],
        date: "2028年3月"
      }
    ]
  },

  # 注意
  - 今日は ${new Date().toLocaleDateString()} です。
  - ${company} は必ずロードマップに含めてください。
  - 4 つのステップを出力してください。
  - 必ず有効な JSON 形式で出力してください。その他の説明や markdown の記号は一切不要です。
  `;
};
