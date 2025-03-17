"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    canDo: "", // できること
    wantToDo: "", // やりたいこと
    dontWantToDo: "", // やりたくないこと
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // URLパラメータでデータを渡す
    const params = new URLSearchParams();
    Object.entries(formData).forEach(([key, value]) => {
      params.append(key, value);
    });

    // トースト通知の代わりに
    alert("情報が正常に送信されました。");

    // 表示ページへリダイレクト
    router.push(`/result?${params.toString()}`);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex flex-col space-y-6">
        <h1
          className={cn(
            "text-2xl md:text-3xl font-bold",
            "text-center md:text-left"
          )}
        >
          エンジニアキャリアプランニング
        </h1>

        <form
          onSubmit={handleSubmit}
          className={cn(
            "bg-white shadow-md rounded-lg p-6",
            "border border-gray-200"
          )}
        >
          <div className="space-y-6">
            {/* 基本情報セクション */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-semibold mb-4">基本情報</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block font-medium text-gray-700"
                  >
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="山田 太郎"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block font-medium text-gray-700"
                  >
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@mail.com"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* キャリアプランニングセクション */}
            <div>
              <h2 className="text-xl font-semibold mb-4">
                キャリアプランニング
              </h2>

              <div className="space-y-4">
                {/* できること */}
                <div className="space-y-2">
                  <label
                    htmlFor="canDo"
                    className="block font-medium text-gray-700"
                  >
                    できること
                  </label>
                  <textarea
                    id="canDo"
                    name="canDo"
                    value={formData.canDo}
                    onChange={handleChange}
                    placeholder="あなたのスキルや得意なこと、これまでの実績などを記入してください"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* やりたいこと */}
                <div className="space-y-2">
                  <label
                    htmlFor="wantToDo"
                    className="block font-medium text-gray-700"
                  >
                    やりたいこと
                  </label>
                  <textarea
                    id="wantToDo"
                    name="wantToDo"
                    value={formData.wantToDo}
                    onChange={handleChange}
                    placeholder="今後チャレンジしたい領域や、興味のある技術、目指したいキャリアパスなどを記入してください"
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* やりたくないこと */}
                <div className="space-y-2">
                  <label
                    htmlFor="dontWantToDo"
                    className="block font-medium text-gray-700"
                  >
                    やりたくないこと
                  </label>
                  <textarea
                    id="dontWantToDo"
                    name="dontWantToDo"
                    value={formData.dontWantToDo}
                    onChange={handleChange}
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
}
