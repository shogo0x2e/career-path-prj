"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function DisplayPage() {
    const searchParams = useSearchParams();
    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        canDo: "",
        wantToDo: "",
        dontWantToDo: "",
    });

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
    }, [searchParams]);

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
                        {/* 基本情報セクション */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">基本情報</h2>
                            <hr className="mb-3" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">氏名</p>
                                    <p className="font-medium">{profileData.name}</p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-600">メールアドレス</p>
                                    <p className="font-medium">{profileData.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* できること */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-emerald-700">できること</h2>
                            <hr className="mb-3 border-emerald-200" />
                            <div className="bg-emerald-50 p-4 rounded-md">
                                <p className="whitespace-pre-wrap">
                                    {profileData.canDo || "未入力"}
                                </p>
                            </div>
                        </div>

                        {/* やりたいこと */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-blue-700">やりたいこと</h2>
                            <hr className="mb-3 border-blue-200" />
                            <div className="bg-blue-50 p-4 rounded-md">
                                <p className="whitespace-pre-wrap">
                                    {profileData.wantToDo || "未入力"}
                                </p>
                            </div>
                        </div>

                        {/* やりたくないこと */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-red-700">やりたくないこと</h2>
                            <hr className="mb-3 border-red-200" />
                            <div className="bg-red-50 p-4 rounded-md">
                                <p className="whitespace-pre-wrap">
                                    {profileData.dontWantToDo || "未入力"}
                                </p>
                            </div>
                        </div>

                        {/* キャリア提案 */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2 text-purple-700">キャリア提案</h2>
                            <hr className="mb-3 border-purple-200" />
                            <div className="bg-purple-50 p-4 rounded-md">
                                <p>
                                    入力情報を基にしたキャリア提案がここに表示されます。
                                    （実際のアプリでは、AIによる分析結果や提案を表示します。）
                                </p>
                            </div>
                        </div>
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
