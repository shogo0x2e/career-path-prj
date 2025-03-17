import { ProfileInput } from "@/features/profile/types";

import { z } from "zod";

export const hardSkillEvaluationSchema = z.object({
  current: z.object({
    programming: z.number(),
    database: z.number(),
    softwareDevelopment: z.number(),
    systemDesign: z.number(),
  }),
  desired: z.object({
    programming: z.number(),
    database: z.number(),
    softwareDevelopment: z.number(),
    systemDesign: z.number(),
  }),
});

export type HardSkillEvaluation = z.infer<typeof hardSkillEvaluationSchema>;

export const generateHardSkillEvaluationPrompt = (profile: ProfileInput) => {
  return `
  # 指示
  あなたは、プロフィール評価の専門家です。以下の評価軸から、5段階で評価し、JSON 形式で出力してください。

  # 評価軸
    - プログラミング: 複数のプログラミング言語の知識、実装能力、オブジェクト指向設計の理解 
    - データベース: データベース設計、運用、最適化、論理・物理データモデルの設計 
    - ソフトウェア開発: 開発プロセス、テスト設計、テスト自動化、デバッグ技術の実績 
    - システム設計: 複雑なシステムの設計、アーキテクチャ構築、構造の分解と分析 

  # プロフィール
  ## できること
  ${profile.currentSkills}

  ## やりたいこと
  ${profile.desiredWork}

  ## やりたくないこと
  ${profile.unwantedWork}

  # 出力形式
  {
    "current": {
      "programming": 0,
      "database": 0,
      "softwareDevelopment": 0,
      "systemDesign": 0,
    },
    "desired": {
      "programming": 0,
      "database": 0,
      "softwareDevelopment": 0,
      "systemDesign": 0,
    },
  }

  # 注意
  必ず有効な JSON 形式で出力してください。その他の説明は一切不要です。
  `;
};
