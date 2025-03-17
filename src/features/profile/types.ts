import { z } from "zod";
import { HardSkillEvaluation } from "./actions/generateHardSkillEvaluationPrompt";
import { SoftSkillEvaluation } from "./actions/generateSoftSkillEvaluationPrompt";
import { ProfileSummary } from "./actions/generateProfileSummary";

export const profileInputSchema = z.object({
  currentSkills: z.string().min(1),
  desiredWork: z.string().optional(),
  unwantedWork: z.string().min(1),
});

export type ProfileInput = z.infer<typeof profileInputSchema>;

export type ProfileEvaluatedData = {
  hardSkillEvaluation: HardSkillEvaluation;
  softSkillEvaluation: SoftSkillEvaluation;
  profileSummary: ProfileSummary;
};
