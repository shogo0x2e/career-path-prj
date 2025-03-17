import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type TimelineItem = {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills?: string[];
  date?: string;
};

type TimelineProps = {
  items: TimelineItem[];
  currentPosition: string;
  targetCareer: string;
};

export function Timeline({ items, currentPosition, targetCareer }: TimelineProps) {
  return (
    <div className="relative pl-8 border-l-2 border-muted">
      {/* 現在地点 */}
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 z-10" />
      <div className="mb-10">
        <p className="text-sm font-medium text-blue-500">現在</p>
        <h3 className="text-xl font-semibold mt-1">{currentPosition}</h3>
        <p className="text-sm text-muted-foreground mt-1">スタート地点</p>
      </div>

      {/* タイムラインアイテム */}
      {items.map((item, index) => (
        <div key={item.id} className="mb-10">
          <div className="absolute left-[-9px] w-4 h-4 rounded-full bg-primary z-10" />
          <div className="flex items-center">
            <p className="text-sm font-medium text-muted-foreground">{item.duration}</p>
          </div>
          <Card className="p-4 mt-2">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
            {item.skills && item.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
            )}
            {item.date && <p className="text-xs text-muted-foreground mt-3">{item.date}</p>}
          </Card>
        </div>
      ))}

      {/* 終点 (目標キャリア) */}
      <div className="absolute left-[-9px] bottom-0 w-4 h-4 rounded-full bg-green-500 z-10" />
      <div>
        <p className="text-sm font-medium text-green-500">目標</p>
        <h3 className="text-xl font-semibold mt-1">{targetCareer}</h3>
        <p className="text-sm text-muted-foreground mt-1">キャリア目標達成</p>
      </div>
    </div>
  );
}
