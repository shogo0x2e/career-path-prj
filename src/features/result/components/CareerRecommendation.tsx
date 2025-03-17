import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

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
  careerVectors,
}: CareerRecommendationProps) {
  const router = useRouter();

  const handleCareerClick = (career: string) => {
    router.push(`/my/${career}/roadmap`);
  };

  // キャリアが存在しない場合の表示（コード安全のために）
  if (!matchingCareers || matchingCareers.length === 0) {
    return (
      <div className="mt-6 pt-4 border-t border-muted">
        <h3 className="font-medium text-lg mb-3">分析結果</h3>
        <p className="mb-4 text-muted-foreground">{careerAdvice || "キャリアアドバイスを生成中..."}</p>
        <p className="text-muted-foreground">推奨キャリアパスが見つかりませんでした</p>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-4 border-t border-muted">
      <h3 className="font-medium text-lg mb-3">分析結果</h3>
      <p className="mb-4 text-muted-foreground">{careerAdvice || "キャリアアドバイスを生成中..."}</p>

      <h4 className="font-medium text-md mb-2">推奨キャリアパス:</h4>
      <div className="flex flex-wrap gap-2">
        {matchingCareers.map((career, idx) => (
          <Badge
            key={idx}
            variant="secondary"
            className="text-base px-3 py-1 cursor-pointer hover:bg-secondary/80"
            onClick={() => handleCareerClick(career)}
          >
            {/* オプショナルチェーンと代替テキストを追加 */}
            {careerVectors[career]?.label || career}
          </Badge>
        ))}
      </div>
    </div>
  );
}
