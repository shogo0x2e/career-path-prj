"use client";

import Link from "next/link";
import { Tabs } from "@/features/result/components/Tabs";
import { CurrentPositionTab } from "@/features/result/components/CurrentPositionTab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAtom } from "jotai";
import { evaluateState } from "@/atoms/evaluate-state";
import { useRouter } from "next/navigation";
import { getDistance } from "@/utils/get-distance";
import { careerVectors } from "@/constants/career-vectors";
import { evaluateRoadMap } from "@/features/roadmap/actions/evaluateRoadMap";
import { generatedRoadmapsState } from "@/atoms/generated-roadmaps-state";

const tabs = [
  { id: "current", label: "あなたの現在地" },
  { id: "market", label: "市場におけるあなたの役割" },
];

const ResultPage = () => {
  const [evaluatedState] = useAtom(evaluateState);
  const [generatedRoadmaps, setGeneratedRoadmaps] = useAtom(
    generatedRoadmapsState
  );
  const router = useRouter();
  if (!evaluatedState) {
    router.push("/my/assessment");
    return null;
  }

  const onCareerClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const career = formData.get("career");

    const roadmap = await evaluateRoadMap(
      evaluatedState.profileSummary,
      career as keyof typeof careerVectors
    );

    setGeneratedRoadmaps({
      ...generatedRoadmaps,
      [career as string]: roadmap,
    });

    router.push(`/my/${career}/roadmap`);
  };

  const isLoading = false;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
          キャリア分析結果
        </h1>

        <Card className="p-6">
          <Tabs tabs={tabs} defaultTabId="current">
            {(activeTabId) => (
              <>
                {activeTabId === "current" && (
                  <CurrentPositionTab
                    profileData={{
                      canDo: evaluatedState?.profileSummary.currentSkills,
                      wantToDo:
                        evaluatedState?.profileSummary.desiredWork ??
                        "まだ見つかっていない",
                      dontWantToDo: evaluatedState?.profileSummary.unwantedWork,
                    }}
                    skillEvaluation={{
                      current: {
                        ...evaluatedState.hardSkillEvaluation.current,
                        ...evaluatedState.softSkillEvaluation.current,
                      },
                      desired: {
                        ...evaluatedState.hardSkillEvaluation.desired,
                        ...evaluatedState.softSkillEvaluation.desired,
                      },
                    }}
                    isLoading={isLoading}
                  />
                )}

                {activeTabId === "market" && (
                  // <MarketPositionTab
                  //   analysis={analysis}
                  //   careerVectors={careerVectors}
                  //   isLoading={isLoading}
                  // />
                  <div className="space-y-6 w-full">
                    <h2 className="text-xl font-semibold">
                      あなたの目標に近いキャリアパス
                    </h2>
                    {Object.entries(careerVectors)
                      .map(([key, vector]) => ({
                        key,
                        vector,
                        distance: getDistance(
                          {
                            ...evaluatedState.hardSkillEvaluation.desired,
                            ...evaluatedState.softSkillEvaluation.desired,
                          },
                          vector
                        ),
                      }))
                      .sort((a, b) => a.distance - b.distance)
                      .slice(0, 3)
                      .map(({ key, vector, distance }) => (
                        <form key={key} onSubmit={onCareerClick}>
                          <input type="hidden" name="career" value={key} />
                          <button
                            type="submit"
                            className="hover:cursor-pointer"
                          >
                            <Card key={key} className="p-4">
                              <div className="grid grid-cols-1 gap-2">
                                <h3 className="text-lg font-medium">
                                  {vector.label}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  スキルベクトル類似度:{" "}
                                  {(1 - distance / Math.sqrt(56)).toFixed(2)}
                                </p>
                              </div>
                            </Card>
                          </button>
                        </form>
                      ))}
                  </div>
                )}
              </>
            )}
          </Tabs>
        </Card>

        <div className="flex justify-center md:justify-start">
          <Link href="/my/assessment" passHref>
            <Button variant="outline">入力画面に戻る</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
