import { HardSkillEvaluation } from "@/features/profile/actions/generateHardSkillEvaluationPrompt";
import { ProfileSummary } from "@/features/profile/actions/generateProfileSummary";
import { SoftSkillEvaluation } from "@/features/profile/actions/generateSoftSkillEvaluationPrompt";
import { atom } from "jotai";

export const evaluateState = atom<
  | {
      hardSkillEvaluation: HardSkillEvaluation;
      softSkillEvaluation: SoftSkillEvaluation;
      profileSummary: ProfileSummary;
    }
  | undefined
>(undefined);
