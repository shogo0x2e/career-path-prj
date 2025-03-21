// import { SkillAnalysisChart } from "./SkillAnalysisChart";
// import { CareerRecommendation } from "./CareerRecommendation";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { HardSkillEvaluation } from "@/features/profile/actions/generateHardSkillEvaluationPrompt";
// import { SoftSkillEvaluation } from "@/features/profile/actions/generateSoftSkillEvaluationPrompt";

// type SkillEvaluation = HardSkillEvaluation & SoftSkillEvaluation;
// import { useRouter } from "next/navigation";

// type SkillVector = {
//   technicalSkill: number;
//   problemSolving: number;
//   communication: number;
//   leadership: number;
//   businessAcumen: number;
// };

// type CareerVectorType = SkillEvaluation & {
//   label: string;
// };

// type CareerVectorsType = {
//   [key: string]: CareerVectorType;
// };

// type MarketPositionTabProps = {
//   analysis: {
//     skillEvaluation: SkillEvaluation;
//     matchingCareers: string[];
//     careerAdvice: string;
//   };
//   careerVectors: CareerVectorsType;
//   isLoading: boolean;
// };

// export function MarketPositionTab({
//   analysis,
//   careerVectors,
//   isLoading,
// }: MarketPositionTabProps) {
//   const router = useRouter();

//   const handleCareerClick = (career: string) => {
//     router.push(`/my/${career}/roadmap`);
//   };

//   console.log(analysis);
//   console.log(careerVectors);
//   // マッチするキャリアのうち、careerVectorsに存在するもののみをフィルタリング
//   const validCareers = analysis.matchingCareers.filter(
//     (career) => careerVectors && career in careerVectors
//   );

//   return (
//     <div className="space-y-8">
//       <Card className="border-blue-200">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-xl text-blue-700">
//             スキル分析とキャリア目標
//           </CardTitle>
//         </CardHeader>
//         <Separator className="bg-blue-200" />
//         <CardContent className="pt-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-60">
//               <p className="text-muted-foreground">分析中...</p>
//             </div>
//           ) : (
//             <div>
//               <div className="max-w-md mx-auto">
//                 <SkillAnalysisChart
//                   skillEvaluation={analysis.skillEvaluation}
//                 />
//               </div>

//               {/* <CareerRecommendation
//                 careerAdvice={analysis.careerAdvice}
//                 matchingCareers={validCareers} // フィルタリング済みの配列を渡す
//                 careerVectors={careerVectors}
//               /> */}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Card className="border-green-200">
//         <CardHeader className="pb-2">
//           <CardTitle className="text-xl text-green-700">
//             推奨キャリアパスの詳細
//           </CardTitle>
//         </CardHeader>
//         <Separator className="bg-green-200" />
//         <CardContent className="pt-4">
//           {isLoading ? (
//             <div className="flex justify-center items-center h-60">
//               <p className="text-muted-foreground">分析中...</p>
//             </div>
//           ) : validCareers.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* {analysis.matchingCareers.slice(0, 2).map((career) => (
//                 <Card key={career} className="overflow-hidden">
//                   <CardHeader className="bg-muted pb-2">
//                     <CardTitle className="text-base">
//                       {careerVectors[career]?.label || career}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="pt-4">
//                     <div className="space-y-4">
//                       <SkillComparisonItem
//                         label="技術スキル"
//                         value={careerVectors[career]?.technicalSkill || 0}
//                         gap={
//                           (careerVectors[career]?.technicalSkill || 0) -
//                           analysis.targetVector.technicalSkill
//                         }
//                       />
//                       <SkillComparisonItem
//                         label="問題解決能力"
//                         value={careerVectors[career]?.problemSolving || 0}
//                         gap={
//                           (careerVectors[career]?.problemSolving || 0) -
//                           analysis.targetVector.problemSolving
//                         }
//                       />
//                       <SkillComparisonItem
//                         label="コミュニケーション"
//                         value={careerVectors[career]?.communication || 0}
//                         gap={
//                           (careerVectors[career]?.communication || 0) -
//                           analysis.targetVector.communication
//                         }
//                       />
//                       <SkillComparisonItem
//                         label="リーダーシップ"
//                         value={careerVectors[career]?.leadership || 0}
//                         gap={
//                           (careerVectors[career]?.leadership || 0) -
//                           analysis.targetVector.leadership
//                         }
//                       />
//                       <SkillComparisonItem
//                         label="ビジネス理解"
//                         value={careerVectors[career]?.businessAcumen || 0}
//                         gap={
//                           (careerVectors[career]?.businessAcumen || 0) -
//                           analysis.targetVector.businessAcumen
//                         }
//                       />
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))} */}
//             </div>
//           ) : (
//             <div className="text-center py-8">
//               <p className="text-muted-foreground">
//                 推奨キャリアパスが見つかりませんでした
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// // function SkillComparisonItem({
// //   label,
// //   value,
// //   gap,
// // }: {
// //   label: string;
// //   value: number;
// //   gap: number;
// // }) {
// //   const percentage = (value / 5) * 100;

// //   return (
// //     <div className="space-y-1">
// //       <div className="flex justify-between items-center">
// //         <span className="text-sm font-medium">{label}</span>
// //         <div className="flex items-center">
// //           <span className="text-sm font-medium">{value.toFixed(1)}</span>
// //           {gap !== 0 && (
// //             <span
// //               className={`ml-1 text-xs ${
// //                 gap > 0 ? "text-green-600" : "text-red-600"
// //               }`}
// //             >
// //               {gap > 0 ? `+${gap.toFixed(1)}` : gap.toFixed(1)}
// //             </span>
// //           )}
// //         </div>
// //       </div>
// //       <div className="w-full bg-secondary h-2 rounded-full">
// //         <div
// //           className="h-2 rounded-full bg-primary"
// //           style={{ width: `${percentage}%` }}
// //         ></div>
// //       </div>
// //     </div>
// //   );
// // }
