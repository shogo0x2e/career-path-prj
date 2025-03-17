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
        <div className="mt-6 pt-4 border-t border-gray-100">
            <h3 className="font-medium text-lg mb-3">分析結果</h3>
            <p className="mb-4 text-gray-700">{careerAdvice}</p>

            <h4 className="font-medium text-md mb-2">推奨キャリアパス:</h4>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
                {matchingCareers.map((career, idx) => (
                    <li key={idx} className="font-medium">
                        {careerVectors[career].label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
