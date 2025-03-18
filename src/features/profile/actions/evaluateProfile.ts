"use server";

import {
  generateHardSkillEvaluationPrompt,
  hardSkillEvaluationSchema,
} from "@/features/profile/actions/generateHardSkillEvaluationPrompt";
import { retrieveChatCompletion } from "@/features/openai/actions/retrieveChatCompletion";
import { ProfileEvaluatedData, ProfileInput } from "../types";
import {
  generateSoftSkillEvaluationPrompt,
  softSkillEvaluationSchema,
} from "./generateSoftSkillEvaluationPrompt";
import {
  generateProfileSummary,
  profileSummarySchema,
} from "./generateProfileSummary";

/**
 * 入力されたプロフィールをソフトスキルとハードスキルの評価軸に基づいて評価する
 * @param profile プロフィール
 * @returns ソフトスキルとハードスキルの評価
 */
export const evaluateProfile = async (
  profile: ProfileInput
): Promise<ProfileEvaluatedData> => {
  const [hardSkillCompletion, softSkillCompletion, profileSummaryCompletion] =
    await Promise.all(
      [
        generateHardSkillEvaluationPrompt(profile),
        generateSoftSkillEvaluationPrompt(profile),
        generateProfileSummary(profile),
      ].map(async (prompt) => {
        const completion = await retrieveChatCompletion(prompt);

        if (!completion) {
          throw new Error("Failed to retrieve chat completion");
        }

        return completion;
      })
    );

  const hardSkillEvaluation = hardSkillEvaluationSchema.parse(
    JSON.parse(hardSkillCompletion)
  );
  const softSkillEvaluation = softSkillEvaluationSchema.parse(
    JSON.parse(softSkillCompletion)
  );
  const profileSummary = profileSummarySchema.parse(
    JSON.parse(profileSummaryCompletion)
  );

  return {
    hardSkillEvaluation,
    softSkillEvaluation,
    profileSummary,
  };
};
