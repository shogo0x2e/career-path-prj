"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProfileInfo } from "@/components/ProfileInfo";
import { SkillAnalysisSection } from "@/components/SkillAnalysisSection";

// エンジニア職種とスキルベクトルのマッピング（5次元のスキルマップ）
const careerVectors = {
    "Software Engineer": {
        technicalSkill: 3.5,
        problemSolving: 3.5,
        communication: 3.0,
        leadership: 2.0,
        businessAcumen: 2.0,
        label: "ソフトウェアエンジニア"
    },
    "Tech Lead": {
        technicalSkill: 4.5,
        problemSolving: 4.0,
        communication: 3.5,
        leadership: 3.5,
        businessAcumen: 2.5,
        label: "テックリード"
    },
    "Engineering Manager": {
        technicalSkill: 3.0,
        problemSolving: 3.5,
        communication: 4.0,
        leadership: 4.5,
        businessAcumen: 3.5,
        label: "エンジニアリングマネージャー"
    },
    "Product Manager": {
        technicalSkill: 2.5,
        problemSolving: 4.0,
        communication: 4.5,
        leadership: 3.5,
        businessAcumen: 4.5,
        label: "プロダクトマネージャー"
    },
    "DevOps Engineer": {
        technicalSkill: 4.0,
        problemSolving: 4.0,
        communication: 3.0,
        leadership: 2.5,
        businessAcumen: 2.5,
        label: "DevOpsエンジニア"
    },
    "Full-stack Developer": {
        technicalSkill: 4.0,
        problemSolving: 3.8,
        communication: 3.2,
        leadership: 2.5,
        businessAcumen: 2.8,
        label: "フルスタック開発者"
    },
    "Frontend Developer": {
        technicalSkill: 3.8,
        problemSolving: 3.5,
        communication: 3.3,
        leadership: 2.0,
        businessAcumen: 2.5,
        label: "フロントエンド開発者"
    },
    "Backend Developer": {
        technicalSkill: 4.2,
        problemSolving: 3.7,
        communication: 2.8,
        leadership: 2.0,
        businessAcumen: 2.2,
        label: "バックエンド開発者"
    },
};

export default function DisplayPage() {
    const searchParams = useSearchParams();
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        canDo: "",
        wantToDo: "",
        dontWantToDo: "",
    });

    // AIによる分析結果のステート
    const [analysis, setAnalysis] = useState({
        currentVector: {
            technicalSkill: 0,
            problemSolving: 0,
            communication: 0,
            leadership: 0,
            businessAcumen: 0,
        },
        targetVector: {
            technicalSkill: 0,
            problemSolving: 0,
            communication: 0,
            leadership: 0,
            businessAcumen: 0,
        },
        matchingCareers: [] as string[],
        careerAdvice: "",
    });

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // クエリパラメータからデータを取得
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const canDo = searchParams.get("canDo") || "";
        const wantToDo = searchParams.get("wantToDo") || "";
        const dontWantToDo = searchParams.get("dontWantToDo") || "";

        setProfileData({
            name,
            email,
            canDo,
            wantToDo,
            dontWantToDo,
        });

        // データが取得できたらAI分析結果をシミュレーション
        if (canDo || wantToDo || dontWantToDo) {
            // ここで本来はAIによる分析APIを呼び出します
            // 今回はシミュレーションのためにランダムなデータを生成
            setTimeout(() => {
                // 基本ベクトルを生成（実際のアプリではAIが分析）
                const currentVector = {
                    technicalSkill: Math.random() * 2.5 + 2, // 2.0-4.5の範囲
                    problemSolving: Math.random() * 2 + 2, // 2.0-4.0の範囲
                    communication: Math.random() * 2 + 1.5, // 1.5-3.5の範囲
                    leadership: Math.random() * 2 + 1, // 1.0-3.0の範囲
                    businessAcumen: Math.random() * 2 + 1, // 1.0-3.0の範囲
                };

                // 目標ベクトル（wantToDoに基づく）
                const targetVector = {
                    technicalSkill: Math.min(5, currentVector.technicalSkill + (Math.random() * 1.5)), // 現在より少し高め
                    problemSolving: Math.min(5, currentVector.problemSolving + (Math.random() * 1.5)),
                    communication: Math.min(5, currentVector.communication + (Math.random() * 1.5)),
                    leadership: Math.min(5, currentVector.leadership + (Math.random() * 1.5)),
                    businessAcumen: Math.min(5, currentVector.businessAcumen + (Math.random() * 1.5)),
                };

                // マッチするキャリアパスを見つける（ベクトル間の距離を計算）
                const matchingCareers = findMatchingCareers(targetVector);

                // キャリアアドバイスの生成（実際にはAIによる生成）
                const careerAdvice = generateCareerAdvice(currentVector, targetVector, matchingCareers);

                setAnalysis({
                    currentVector,
                    targetVector,
                    matchingCareers,
                    careerAdvice,
                });

                setIsLoading(false);
            }, 1000);
        } else {
            setIsLoading(false);
        }
    }, [searchParams]);

    // ターゲットベクトルに最も近いキャリアを見つける関数
    function findMatchingCareers(targetVector) {
        const careers = Object.keys(careerVectors);
        const distances = careers.map(career => {
            const vector = careerVectors[career];
            const distance = calculateDistance(targetVector, vector);
            return { career, distance };
        });

        // 距離でソートして上位3つを取得
        distances.sort((a, b) => a.distance - b.distance);
        return distances.slice(0, 3).map(item => item.career);
    }

    // ベクトル間の距離を計算する関数（ユークリッド距離）
    function calculateDistance(v1, v2) {
        const dimensions = ['technicalSkill', 'problemSolving', 'communication', 'leadership', 'businessAcumen'];
        return Math.sqrt(
            dimensions.reduce((sum, dim) => sum + Math.pow(v1[dim] - v2[dim], 2), 0)
        );
    }

    // キャリアアドバイスを生成する関数
    function generateCareerAdvice(current, target, matchingCareers) {
        const firstMatch = careerVectors[matchingCareers[0]].label;

        // 技術的なギャップの検出
        const techGap = target.technicalSkill - current.technicalSkill;
        const leadershipGap = target.leadership - current.leadership;
        const businessGap = target.businessAcumen - current.businessAcumen;

        let advice = `あなたの経験とスキルを分析した結果、${firstMatch}の適性が最も高いと判断されました。`;

        if (techGap > 1) {
            advice += ` 技術スキルをさらに高めるため、最新の開発手法や言語の学習を継続することをお勧めします。`;
        }

        if (leadershipGap > 1) {
            advice += ` リーダーシップスキルを向上させるために、小規模なプロジェクトのリード経験を積むことが効果的でしょう。`;
        }

        if (businessGap > 1) {
            advice += ` ビジネス理解を深めるため、製品戦略策定やステークホルダーとの対話の機会を増やすことをお勧めします。`;
        }

        return advice;
    }

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="flex flex-col space-y-6">
                <h1 className={cn(
                    "text-2xl md:text-3xl font-bold",
                    "text-center md:text-left"
                )}>
                    キャリア分析結果
                </h1>

                <div className={cn(
                    "bg-white shadow-md rounded-lg p-6",
                    "border border-gray-200"
                )}>
                    <div className="space-y-8">
                        <ProfileInfo
                            name={profileData.name}
                            email={profileData.email}
                            canDo={profileData.canDo}
                            wantToDo={profileData.wantToDo}
                            dontWantToDo={profileData.dontWantToDo}
                        />

                        <SkillAnalysisSection
                            isLoading={isLoading}
                            analysis={analysis}
                            careerVectors={careerVectors}
                        />
                    </div>
                </div>

                <div className="flex justify-center md:justify-start">
                    <Link href="/profile" passHref>
                        <button
                            className={cn(
                                "px-6 py-2",
                                "bg-gray-200 text-gray-800 font-medium rounded-md",
                                "hover:bg-gray-300 transition-colors",
                                "focus:outline-none focus:ring-2 focus:ring-gray-500"
                            )}
                        >
                            入力画面に戻る
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
