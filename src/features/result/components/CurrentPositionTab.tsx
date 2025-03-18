import { ProfileInfo } from "./ProfileInfo";
import { SkillAnalysisChart } from "@/features/result/components/SkillAnalysisChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { HardSkillEvaluation } from "@/features/profile/actions/generateHardSkillEvaluationPrompt";
import { SoftSkillEvaluation } from "@/features/profile/actions/generateSoftSkillEvaluationPrompt";

type ProfileDataType = {
  canDo: string;
  wantToDo: string;
  dontWantToDo: string;
};

type SkillEvaluation = SoftSkillEvaluation & HardSkillEvaluation;

type CurrentPositionTabProps = {
  profileData: ProfileDataType;
  skillEvaluation: SkillEvaluation;
  isLoading: boolean;
};

export function CurrentPositionTab({
  profileData,
  skillEvaluation,
  isLoading,
}: CurrentPositionTabProps) {
  return (
    <div className="space-y-8">
      <ProfileInfo
        canDo={profileData.canDo}
        wantToDo={profileData.wantToDo}
        dontWantToDo={profileData.dontWantToDo}
      />

      <Card className="border-purple-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-purple-700">
            あなたの現在のスキル
          </CardTitle>
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
                  skillEvaluation={skillEvaluation}
                  showCurrentOnly={true}
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
