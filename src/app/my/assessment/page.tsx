"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { evaluateProfile } from "@/features/profile/actions/evaluateProfile";
import { evaluateState } from "@/atoms/evaluate-state";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FullLoadingSpinner } from "@/components/full-loading-spinner";
import { ZodError } from "zod";

type FormData = {
  currentSkills: string;
  desiredWork: string;
  unwantedWork: string;
};

const UserAssessmentPage = () => {
  const router = useRouter();
  const [, setEvaluatedState] = useAtom(evaluateState);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | undefined>(
    undefined
  );

  const currentSkills = watch("currentSkills");

  const generateAndNavigate = async (data: FormData) => {
    setIsGenerating(true);
    const profile = await evaluateProfile({
      currentSkills: data.currentSkills,
      desiredWork: data.desiredWork,
      unwantedWork: data.unwantedWork,
    });

    if (currentSkills.length !== 0) {
      setEvaluatedState(profile);
      router.push("/my/result");
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      generateAndNavigate(data);
    } catch (error) {
      console.error("評価処理でエラーが発生しました:", error);
      if (error instanceof ZodError) {
        setPendingMessage("AI の分析に時間がかかっています...");
        try {
          generateAndNavigate(data);
        } catch {
          alert(
            "AI が解析に失敗しました。もう一度お試しいただくか、プロフィールの内容を書き換えた上で再度お試しください。"
          );
        }
      }
    }
  };

  if (isGenerating) {
    return <FullLoadingSpinner message={pendingMessage ?? "AI が分析中..."} />;
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col space-y-6">
        <h1
          className={cn(
            "text-2xl md:text-3xl font-bold",
            "text-center md:text-left"
          )}
        >
          How-Vison
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={cn(
            "bg-white shadow-md rounded-lg p-6",
            "border border-gray-200"
          )}
        >
          <div className="space-y-6">
            {/* キャリアプランニングセクション */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                キャリアプランニング
              </h2>

              <div className="space-y-4">
                {/* できること */}
                <div className="space-y-2">
                  <label
                    htmlFor="currentSkills"
                    className="block font-medium text-gray-700"
                  >
                    できること
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="currentSkills"
                    {...register("currentSkills", {
                      required: "このフィールドは必須です",
                    })}
                    placeholder="あなたのスキルや得意なこと、これまでの実績などを記入してください"
                    rows={5}
                    className={cn(
                      "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
                      errors.currentSkills
                        ? "border-red-500"
                        : "border-gray-300"
                    )}
                  />
                  {errors.currentSkills && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentSkills.message}
                    </p>
                  )}
                </div>

                {/* やりたいこと */}
                <div className="space-y-2">
                  <label
                    htmlFor="desiredWork"
                    className="block font-medium text-gray-700"
                  >
                    やりたいこと
                  </label>
                  <textarea
                    id="desiredWork"
                    {...register("desiredWork")}
                    placeholder="今後チャレンジしたい領域や、興味のある技術、目指したいキャリアパスなどを記入してください"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* やりたくないこと */}
                <div className="space-y-2">
                  <label
                    htmlFor="unwantedWork"
                    className="block font-medium text-gray-700"
                  >
                    やりたくないこと
                  </label>
                  <textarea
                    id="unwantedWork"
                    {...register("unwantedWork")}
                    placeholder="避けたい業務や環境、関わりたくない技術などを記入してください"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-center md:justify-end">
              <button
                type="submit"
                className={cn(
                  "px-8 py-3",
                  "bg-blue-600 text-white font-medium rounded-md",
                  "hover:bg-blue-700 transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                )}
              >
                分析結果を見る
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserAssessmentPage;
