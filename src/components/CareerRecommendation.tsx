import { Badge } from "@/components/ui/badge";

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

type CareerRecommendationProps = {
    careerAdvice: string;
    matchingCareers: string[];
    careerVectors: CareerVectorsType;
};

export function CareerRecommendation({
    careerAdvice,
    matchingCareers,
    careerVectors
}: CareerRecommendationProps) {
    return (
        <div className="mt-6 pt-4 border-t border-muted">
            <h3 className="font-medium text-lg mb-3">分析結果</h3>
            <p className="mb-4 text-muted-foreground">{careerAdvice}</p>

            <h4 className="font-medium text-md mb-2">推奨キャリアパス:</h4>
            <div className="flex flex-wrap gap-2">
                {matchingCareers.map((career, idx) => (
                    <Badge
                        key={idx}
                        variant="secondary"
                        className="text-base px-3 py-1"
                    >
                        {careerVectors[career].label}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
