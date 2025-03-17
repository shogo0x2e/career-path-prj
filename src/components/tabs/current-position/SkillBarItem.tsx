import { Progress } from "@/components/ui/progress";

type SkillBarItemProps = {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
};

export function SkillBarItem({
  label,
  value,
  maxValue = 5,
  color = "bg-primary",
}: SkillBarItemProps) {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm font-medium">
          {value.toFixed(1)}/{maxValue}.0
        </span>
      </div>
      <Progress value={percentage} className={color} />
    </div>
  );
}
