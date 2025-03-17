"use client";

import Link from "next/link";
import { Tabs } from "@/features/result/components/Tabs";
import { CurrentPositionTab } from "@/features/result/components/CurrentPositionTab";
import { MarketPositionTab } from "@/features/result/components/MarketPositionTab";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// エンジニア職種とスキルベクトルのマッピング（5次元のスキルマップ）
const careerVectors = {
  "SoftwareEngineer": {
    technicalSkill: 3.5,
    problemSolving: 3.5,
    communication: 3.0,
    leadership: 2.0,
    businessAcumen: 2.0,
    label: "ソフトウェアエンジニア",
  },
  "TechLead": {
    technicalSkill: 4.5,
    problemSolving: 4.0,
    communication: 3.5,
    leadership: 3.5,
    businessAcumen: 2.5,
    label: "テックリード",
  },
  "EngineeringManager": {
    technicalSkill: 3.0,
    problemSolving: 3.5,
    communication: 4.0,
    leadership: 4.5,
    businessAcumen: 3.5,
    label: "エンジニアリングマネージャー",
  },
  "ProductManager": {
    technicalSkill: 2.5,
    problemSolving: 4.0,
    communication: 4.5,
    leadership: 3.5,
    businessAcumen: 4.5,
    label: "プロダクトマネージャー",
  },
  "DevOpsEngineer": {
    technicalSkill: 4.0,
    problemSolving: 4.0,
    communication: 3.0,
    leadership: 2.5,
    businessAcumen: 2.5,
    label: "DevOpsエンジニア",
  },
  "Full-stackDeveloper": {
    technicalSkill: 4.0,
    problemSolving: 3.8,
    communication: 3.2,
    leadership: 2.5,
    businessAcumen: 2.8,
    label: "フルスタック開発者",
  },
  "FrontendDeveloper": {
    technicalSkill: 3.8,
    problemSolving: 3.5,
    communication: 3.3,
    leadership: 2.0,
    businessAcumen: 2.5,
    label: "フロントエンド開発者",
  },
  "BackendDeveloper": {
    technicalSkill: 4.2,
    problemSolving: 3.7,
    communication: 2.8,
    leadership: 2.0,
    businessAcumen: 2.2,
    label: "バックエンド開発者",
  },
};

const tabs = [
  { id: "current", label: "あなたの現在地" },
  { id: "market", label: "市場におけるあなたの役割" },
];

const ResultPage = () => {
  const profileData = {
    name: "山田 太郎",
    email: "yama@example.com",
    canDo: "ソフトウェア開発、データ分析、ビジネスモデリング",
    wantToDo: "データサイエンスの専門家として活躍",
    dontWantToDo: "マーケティングのコンサルタントとして働くこと",
  };

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
    matchingCareers: ["SoftwareEngineer", "TechLead", "EngineeringManager"],
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
                    profileData={profileData}
                    currentVector={analysis.currentVector}
                    isLoading={isLoading}
                  />
                )}

                {activeTabId === "market" && (
                  <MarketPositionTab
                    analysis={analysis}
                    careerVectors={careerVectors}
                    isLoading={isLoading}
                  />
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
