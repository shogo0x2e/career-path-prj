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
        position: "",
        experience: "",
        skills: [] as string[],
    });

    useEffect(() => {
        // クエリパラメータからデータを取得
        const name = searchParams.get("name") || "";
        const email = searchParams.get("email") || "";
        const position = searchParams.get("position") || "";
        const experience = searchParams.get("experience") || "";
        const skills = searchParams.get("skills") || "";

        // スキルを配列に変換
        const skillsArray = skills
            .split(",")
            .map(skill => skill.trim())
            .filter(skill => skill !== "");

        setProfileData({
            name,
            email,
            position,
            experience,
            skills: skillsArray,
        });
    }, [searchParams]);

    return (
        <div className="max-w-3xl mx-auto py-10 px-4">
            <div className="flex flex-col space-y-6">
                <h1 className={cn(
                    "text-2xl md:text-3xl font-bold",
                    "text-center md:text-left"
                )}>
                    プロフィール情報
                </h1>

                <div className={cn(
                    "bg-white shadow-md rounded-lg p-6",
                    "border border-gray-200"
                )}>
                    <div className="space-y-6">
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

                        <div>
                            <h2 className="text-xl font-semibold mb-2">職種</h2>
                            <hr className="mb-3" />
                            <p>
                                {profileData.position || "未入力"}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">経歴</h2>
                            <hr className="mb-3" />
                            <p className="whitespace-pre-wrap">
                                {profileData.experience || "未入力"}
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold mb-2">スキル</h2>
                            <hr className="mb-3" />
                            <div className="flex flex-wrap gap-2">
                                {profileData.skills.length > 0 ? (
                                    profileData.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className={cn(
                                                "px-3 py-1 rounded-full",
                                                "bg-blue-100 text-blue-800 font-medium",
                                                "text-sm"
                                            )}
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <p>未入力</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="/profile" passHref>
                    <button
                        className={cn(
                            "mt-4 px-6 py-2",
                            "bg-gray-200 text-gray-800 font-medium rounded-md",
                            "hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        )}
                    >
                        プロフィール編集に戻る
                    </button>
                </Link>
            </div>
        </div>
    );
}
