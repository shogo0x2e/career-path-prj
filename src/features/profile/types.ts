import { z } from "zod";
import { HardSkillEvaluation } from "./actions/generateHardSkillEvaluationPrompt";
import { SoftSkillEvaluation } from "./actions/generateSoftSkillEvaluationPrompt";

export const ProfileInputSchema = z.object({
  currentSkills: z.string().min(1),
  desiredWork: z.string().optional(),
  unwantedWork: z.string().min(1),
});

export type ProfileInput = z.infer<typeof ProfileInputSchema>;

export type ProfileEvaluatedVectors = {
  hardSkillEvaluation: HardSkillEvaluation;
  softSkillEvaluation: SoftSkillEvaluation;
};
