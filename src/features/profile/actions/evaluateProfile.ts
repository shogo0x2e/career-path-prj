"use server";

import { getProfileEvaluationPrompt } from "@/constants/profile-evaluation/prompt";
import { retrieveChatCompletion } from "@/features/openai/actions/retrieveChatCompletion";
import { ProfileEvaluatedVectors } from "../types";
import { ProfileInput } from "../types";

export const evaluateProfile = async (
  profile: ProfileInput
): Promise<ProfileEvaluatedVectors> => {
  const prompt = getProfileEvaluationPrompt(profile);
  const completion = await retrieveChatCompletion(prompt);
  return completion;
};
