"use server";

import { generateHardSkillEvaluationPrompt } from "@/features/profile/actions/generateHardSkillEvaluationPrompt";
import { retrieveChatCompletion } from "@/features/openai/actions/retrieveChatCompletion";
import { ProfileEvaluatedVectors } from "../types";
import { ProfileInput } from "../types";
import { generateSoftSkillEvaluationPrompt } from "./generateSoftSkillEvaluationPrompt";

export const evaluateProfile = async (
  profile: ProfileInput
): Promise<ProfileEvaluatedVectors> => {
  const [hardSkillEvaluation, softSkillEvaluation] = await Promise.all(
    [
      generateHardSkillEvaluationPrompt(profile),
      generateSoftSkillEvaluationPrompt(profile),
    ].map(async (prompt) => {
      const completion = await retrieveChatCompletion(prompt);
      return JSON.parse(completion.choices[0].message.content);
    })
  );

  return {
    hardSkillEvaluation,
    softSkillEvaluation,
  };
};
