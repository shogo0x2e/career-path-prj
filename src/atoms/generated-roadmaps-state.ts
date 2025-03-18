import { RoadMap } from "@/features/roadmap/actions/generateRoadMapPrompt";
import { atom } from "jotai";

export const generatedRoadmapsState = atom<
  | {
      [key: string]: RoadMap;
    }
  | undefined
>(undefined);
