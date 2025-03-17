import { ProfileInfo } from "./ProfileInfo";
import { SkillAnalysisChart } from "./SkillAnalysisChart";
import { SkillBarItem } from "./SkillBarItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type ProfileDataType = {
    name: string;
    email: string;
    canDo: string;
    wantToDo: string;
    dontWantToDo: string;
};

type SkillVector = {
    technicalSkill: number;
    problemSolving: number;
    communication: number;
    leadership: number;
    businessAcumen: number;
};

type CurrentPositionTabProps = {
    profileData: ProfileDataType;
    currentVector: SkillVector;
    isLoading: boolean;
};

export function CurrentPositionTab({ profileData, currentVector, isLoading }: CurrentPositionTabProps) {
    return (
        <div className="space-y-8">
            <ProfileInfo
                name={profileData.name}
                email={profileData.email}
                canDo={profileData.canDo}
                wantToDo={profileData.wantToDo}
                dontWantToDo={profileData.dontWantToDo}
            />

            <Card className="border-purple-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-xl text-purple-700">あなたの現在のスキル</CardTitle>
                </CardHeader>
                <Separator className="bg-purple-200" />
                <CardContent className="pt-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-60">
                            <p className="text-muted-foreground">分析中...</p>
                        </div>
                    ) : (
                        <div>
                            <div className="max-w-md mx-auto">
                                <SkillAnalysisChart
                                    currentVector={currentVector}
                                    showCurrentOnly={true}
                                />
                            </div>

                            <div className="mt-6 pt-4 border-t border-muted">
                                <h3 className="font-medium text-lg mb-3">スキル分析</h3>
                                <div className="space-y-4">
                                    <SkillBarItem
                                        label="技術スキル"
                                        value={currentVector.technicalSkill}
                                        color="bg-blue-500"
                                    />
                                    <SkillBarItem
                                        label="問題解決能力"
                                        value={currentVector.problemSolving}
                                        color="bg-green-500"
                                    />
                                    <SkillBarItem
                                        label="コミュニケーション"
                                        value={currentVector.communication}
                                        color="bg-yellow-500"
                                    />
                                    <SkillBarItem
                                        label="リーダーシップ"
                                        value={currentVector.leadership}
                                        color="bg-purple-500"
                                    />
                                    <SkillBarItem
                                        label="ビジネス理解"
                                        value={currentVector.businessAcumen}
                                        color="bg-red-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
