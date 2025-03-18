import { z } from "zod";
import { profileInputSchema } from "../types";

export const profileSummarySchema = profileInputSchema.extend({
  currentSkills: z.string().min(1),
  desiredWork: z.string().optional(),
  unwantedWork: z.string().min(1),
});

export type ProfileSummary = z.infer<typeof profileSummarySchema>;

export const generateProfileSummary = (profile: ProfileSummary) => {
  return `
  # 指示
  あなたは、プロフィール評価の専門家です。以下のプロフィールについて、サマリーを作成してください。

  # プロフィール
  ## できること
  ${profile.currentSkills}

  ## やりたいこと
  ${profile.desiredWork}

  ## やりたくないこと
  ${profile.unwantedWork}

  # 出力例
  {
    "currentSkills": "ソフトウェア開発、データ分析、ビジネスモデリング",
    "desiredWork": "データサイエンスの専門家として活躍",
    "unwantedWork": "マーケティングのコンサルタントとして働くこと"
  }

  # 注意
  必ず有効な JSON 形式で出力してください。その他の説明は一切不要です。
  `;
};
