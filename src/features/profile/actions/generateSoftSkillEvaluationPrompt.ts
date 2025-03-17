import { ProfileInput } from "../types";

export type SoftSkillEvaluation = {
  current: {
    communication: number;
    teamwork: number;
    leadership: number;
  };
  desired: {
    communication: number;
    teamwork: number;
    leadership: number;
  };
};

export const generateSoftSkillEvaluationPrompt = (profile: ProfileInput) => {
  return `
  # 指示
  あなたは、プロフィール評価の専門家です。以下の評価軸から、5段階で評価し、JSON 形式で出力してください。

  # 評価軸
    - コミュニケーション: 意思疎通、プレゼンテーション、文書作成、フィードバックの受容と提供 
    - チームワーク: 他メンバーとの連携、協力作業、役割分担への適応 
    - リーダーシップ: チームのまとめ役、プロジェクト管理、組織内での影響力発揮 

  # プロフィール
  ## できること
  ${profile.currentSkills}

  ## やりたいこと
  ${profile.desiredWork}

  ## やりたくないこと
  ${profile.unwantedWork}

  # 出力形式
  {
    current: {
      communication: 0,
      teamwork: 0,
      leadership: 0,
    },
    desired: {
      communication: 0,
      teamwork: 0,
      leadership: 0,
    },
  }
  `;
};
