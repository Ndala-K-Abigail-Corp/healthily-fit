import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface StatsCardProps {
  description?: string;
  icon: LucideIcon;
  title: string;
  trend?: string;
  value: string | number;
}

export function StatsCard({
  description,
  icon: Icon,
  title,
  trend,
  value,
}: StatsCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-medium">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-neutral-600" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">{value}</div>
        {description && (
          <CardDescription className="mt-1">{description}</CardDescription>
        )}
        {trend && (
          <p className="text-xs text-success mt-1">
            {trend.startsWith("+") ? "↑" : "↓"} {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}


