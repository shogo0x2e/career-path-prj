import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ProfileInfoProps = {
    name: string;
    email: string;
    canDo: string;
    wantToDo: string;
    dontWantToDo: string;
};

export function ProfileInfo({ name, email, canDo, wantToDo, dontWantToDo }: ProfileInfoProps) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl">基本情報</CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-muted-foreground">氏名</p>
                            <p className="font-medium">{name}</p>
                        </div>

                        <div>
                            <p className="text-sm text-muted-foreground">メールアドレス</p>
                            <p className="font-medium">{email}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-emerald-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-emerald-700">できること</CardTitle>
                </CardHeader>
                <Separator className="bg-emerald-200" />
                <CardContent className="pt-4">
                    <div className="bg-emerald-50 p-4 rounded-md">
                        <p className="whitespace-pre-wrap">
                            {canDo || "未入力"}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-blue-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-blue-700">やりたいこと</CardTitle>
                </CardHeader>
                <Separator className="bg-blue-200" />
                <CardContent className="pt-4">
                    <div className="bg-blue-50 p-4 rounded-md">
                        <p className="whitespace-pre-wrap">
                            {wantToDo || "未入力"}
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-red-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-red-700">やりたくないこと</CardTitle>
                </CardHeader>
                <Separator className="bg-red-200" />
                <CardContent className="pt-4">
                    <div className="bg-red-50 p-4 rounded-md">
                        <p className="whitespace-pre-wrap">
                            {dontWantToDo || "未入力"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
