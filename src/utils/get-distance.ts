import { CareerVector } from "@/features/profile/types";

export function getDistance(
  vector1: CareerVector,
  vector2: CareerVector
): number {
  // ベクトル間のユークリッド距離を計算
  const squaredDiffs = Object.keys(vector1).reduce((sum, key) => {
    const k = key as keyof CareerVector;
    const diff = vector1[k] - vector2[k];
    return sum + diff * diff;
  }, 0);

  return Math.sqrt(squaredDiffs);
}
