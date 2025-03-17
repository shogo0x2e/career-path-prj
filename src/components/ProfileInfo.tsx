import { cn } from "@/lib/utils";

type ProfileInfoProps = {
    name: string;
    email: string;
    canDo: string;
    wantToDo: string;
    dontWantToDo: string;
};

export function ProfileInfo({ name, email, canDo, wantToDo, dontWantToDo }: ProfileInfoProps) {
    return (
        <>
            {/* 基本情報セクション */}
            <div>
                <h2 className="text-xl font-semibold mb-2">基本情報</h2>
                <hr className="mb-3" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-600">氏名</p>
                        <p className="font-medium">{name}</p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600">メールアドレス</p>
                        <p className="font-medium">{email}</p>
                    </div>
                </div>
            </div>

            {/* できること */}
            <div>
                <h2 className="text-xl font-semibold mb-2 text-emerald-700">できること</h2>
                <hr className="mb-3 border-emerald-200" />
                <div className="bg-emerald-50 p-4 rounded-md">
                    <p className="whitespace-pre-wrap">
                        {canDo || "未入力"}
                    </p>
                </div>
            </div>

            {/* やりたいこと */}
            <div>
                <h2 className="text-xl font-semibold mb-2 text-blue-700">やりたいこと</h2>
                <hr className="mb-3 border-blue-200" />
                <div className="bg-blue-50 p-4 rounded-md">
                    <p className="whitespace-pre-wrap">
                        {wantToDo || "未入力"}
                    </p>
                </div>
            </div>

            {/* やりたくないこと */}
            <div>
                <h2 className="text-xl font-semibold mb-2 text-red-700">やりたくないこと</h2>
                <hr className="mb-3 border-red-200" />
                <div className="bg-red-50 p-4 rounded-md">
                    <p className="whitespace-pre-wrap">
                        {dontWantToDo || "未入力"}
                    </p>
                </div>
            </div>
        </>
    );
}
