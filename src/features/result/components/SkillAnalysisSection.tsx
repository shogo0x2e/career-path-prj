import { SkillAnalysisChart } from "@/features/result/components/SkillAnalysisChart";
import { CareerRecommendation } from "@/features/result/components/CareerRecommendation";

type SkillVector = {
  technicalSkill: number;
  problemSolving: number;
  communication: number;
  leadership: number;
  businessAcumen: number;
};

type AnalysisType = {
  currentVector: SkillVector;
  targetVector: SkillVector;
  matchingCareers: string[];
  careerAdvice: string;
};

type CareerVectorsType = {
  [key: string]: {
    technicalSkill: number;
    problemSolving: number;
    communication: number;
    leadership: number;
    businessAcumen: number;
    label: string;
  };
};

type SkillAnalysisSectionProps = {
  isLoading: boolean;
  analysis: AnalysisType;
  careerVectors: CareerVectorsType;
};

export function SkillAnalysisSection({
  isLoading,
  analysis,
  careerVectors,
}: SkillAnalysisSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2 text-purple-700">スキル分析</h2>
      <hr className="mb-3 border-purple-200" />

      {isLoading ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-gray-500">分析中...</p>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-md border border-gray-200">
          <SkillAnalysisChart
            currentVector={analysis.currentVector}
            targetVector={analysis.targetVector}
          />

          <CareerRecommendation
            careerAdvice={analysis.careerAdvice}
            matchingCareers={analysis.matchingCareers}
            careerVectors={careerVectors}
          />
        </div>
      )}
    </div>
  );
}
