"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        position: "",
        experience: "",
        skills: "",
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
        router.push(`/diaplay?${params.toString()}`);
    };

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="flex flex-col space-y-6">
                <h1 className={cn(
                    "text-2xl md:text-3xl font-bold",
                    "text-center md:text-left"
                )}>
                    プロフィール入力
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className={cn(
                        "bg-white shadow-md rounded-lg p-6",
                        "border border-gray-200"
                    )}
                >
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block font-medium text-gray-700">
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
                            <label htmlFor="email" className="block font-medium text-gray-700">
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

                        <div className="space-y-1">
                            <label htmlFor="position" className="block font-medium text-gray-700">
                                現在の職種
                            </label>
                            <input
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                placeholder="ソフトウェアエンジニア"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="experience" className="block font-medium text-gray-700">
                                経歴
                            </label>
                            <textarea
                                id="experience"
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                placeholder="これまでの経験について記入してください"
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="skills" className="block font-medium text-gray-700">
                                スキル（カンマ区切り）
                            </label>
                            <input
                                id="skills"
                                name="skills"
                                value={formData.skills}
                                onChange={handleChange}
                                placeholder="React, TypeScript, Next.js"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className={cn(
                                "mt-6 w-full md:w-auto px-6 py-2",
                                "bg-blue-600 text-white font-medium rounded-md",
                                "hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            )}
                        >
                            送信する
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
