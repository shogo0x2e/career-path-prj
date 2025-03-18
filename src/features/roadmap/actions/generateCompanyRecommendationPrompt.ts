import { ProfileSummary } from "@/features/profile/actions/generateProfileSummary";
import { z } from "zod";

export const companyRecommendationSchema = z.object({
  company: z.string(),
});

export type CompanyRecommendation = z.infer<typeof companyRecommendationSchema>;

export const generateCompanyRecommendationPrompt = async (
  profileSummary: ProfileSummary,
  career: string
) => {
  return `
  
  # 指示
  あなたは、プロフィール評価の専門家です。企業一覧から ${career} を実現するための企業を推薦し JSON 形式で出力してください。

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

  # 出力形式
  {
    "company": "企業 A"
  }

  # 注意
  - 必ず有効な JSON 形式で出力してください。その他の説明や markdown の記号は一切不要です。
  `;
};
