"use server";

import { ProfileSummary } from "@/features/profile/actions/generateProfileSummary";
import {
  companyRecommendationSchema,
  generateCompanyRecommendationPrompt,
} from "./generateCompanyRecommendationPrompt";
import { retrieveChatCompletion } from "@/features/openai/actions/retrieveChatCompletion";
import { generateRoadMapPrompt, roadMapSchema } from "./generateRoadMapPrompt";
import { careerVectors } from "@/constants/career-vectors";

export const evaluateRoadMap = async (
  profileSummary: ProfileSummary,
  career: keyof typeof careerVectors
) => {
  const companyRecommendationPrompt = await generateCompanyRecommendationPrompt(
    profileSummary,
    career
  );

  const companyRecommendationCompletion = await retrieveChatCompletion(
    companyRecommendationPrompt
  );

  if (!companyRecommendationCompletion) {
    throw new Error("Failed to retrieve chat completion");
  }

  const companyRecommendation = companyRecommendationSchema.parse(
    JSON.parse(companyRecommendationCompletion)
  );

  const roadmapPrompt = await generateRoadMapPrompt(
    profileSummary,
    companyRecommendation.company,
    career
  );

  const roadmapCompletion = await retrieveChatCompletion(roadmapPrompt);

  if (!roadmapCompletion) {
    throw new Error("Failed to retrieve chat completion");
  }

  const roadmap = roadMapSchema.parse(JSON.parse(roadmapCompletion));

  return roadmap;
};
