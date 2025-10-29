import { cn } from "@/lib/utils";

interface ProgressBarProps {
  className?: string;
  max: number;
  value: number;
}

export function ProgressBar({ className, max, value }: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        "w-full h-2 bg-neutral-200 rounded-full overflow-hidden",
        className
      )}
    >
      <div
        className="h-full bg-primary transition-all duration-medium ease-out"
        style={{ width: `${percentage}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}

