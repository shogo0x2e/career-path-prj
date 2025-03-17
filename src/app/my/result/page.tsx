"use client";

import Link from "next/link";
import { Tabs } from "@/features/result/components/Tabs";
import { CurrentPositionTab } from "@/features/result/components/CurrentPositionTab";
import { MarketPositionTab } from "@/features/result/components/MarketPositionTab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAtom } from "jotai";
import { evaluateState } from "@/atoms/evaluate-state";
import { useRouter } from "next/navigation";
import { getDistance } from "@/utils/get-ditance";
import { careerVectors } from "@/constants/career-vectors";

const tabs = [
  { id: "current", label: "あなたの現在地" },
  { id: "market", label: "市場におけるあなたの役割" },
];

const ResultPage = () => {
  const [evaluatedState] = useAtom(evaluateState);
  const router = useRouter();
  if (!evaluatedState) {
    router.push("/my/assessment");
    return null;
  }

  const analysis = {
    currentVector: {
      technicalSkill: 3.5,
      problemSolving: 3.5,
      communication: 3.0,
      leadership: 2.0,
      businessAcumen: 2.0,
    },
    targetVector: {
      technicalSkill: 4.0,
      problemSolving: 4.0,
      communication: 3.5,
      leadership: 3.0,
      businessAcumen: 2.5,
    },
    matchingCareers: ["Software Engineer", "Tech Lead", "Engineering Manager"],
    careerAdvice:
      "あなたの経験とスキルを分析した結果、ソフトウェアエンジニアの適性が最も高いと判断されました。",
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
                  <div className="space-y-6">
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
                        <Card key={key} className="p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium">
                                {vector.label}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                スキルベクトル類似度:{" "}
                                {(1 - distance / Math.sqrt(56)).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </Card>
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
