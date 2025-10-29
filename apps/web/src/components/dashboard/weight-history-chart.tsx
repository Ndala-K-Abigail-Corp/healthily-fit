import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ActivityLog } from "@healthily-fit/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface WeightHistoryChartProps {
  activityLogs: ActivityLog[];
  currentWeight: number;
}

export function WeightHistoryChart({ activityLogs, currentWeight }: WeightHistoryChartProps) {
  // Extract weight data from activity logs
  const weightData = activityLogs
    .filter((log) => log.weightKg != null)
    .map((log) => ({
      date: new Date(log.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      weight: log.weightKg,
    }))
    .reverse(); // Show oldest first

  // Add current weight if we have data
  if (weightData.length > 0) {
    weightData.push({
      date: "Today",
      weight: currentWeight,
    });
  } else {
    // If no historical data, just show current
    weightData.push({
      date: "Current",
      weight: currentWeight,
    });
  }

  // Calculate weight change
  const firstWeight = weightData[0]?.weight || currentWeight;
  const lastWeight = weightData[weightData.length - 1]?.weight || currentWeight;
  const weightChange = lastWeight - firstWeight;
  const weightChangePercentage = firstWeight > 0 ? ((weightChange / firstWeight) * 100).toFixed(1) : "0.0";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Weight History</span>
          <div className="flex items-center gap-2">
            {weightChange !== 0 && (
              <>
                {weightChange > 0 ? (
                  <TrendingUp className="w-4 h-4 text-error" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-success" />
                )}
                <span className={`text-sm ${weightChange > 0 ? "text-error" : "text-success"}`}>
                  {weightChange > 0 ? "+" : ""}
                  {weightChange.toFixed(1)} kg ({weightChangePercentage}%)
                </span>
              </>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {weightData.length > 1 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: "#8b5cf6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-600">
              Track your weight after workouts to see your progress over time
            </p>
            <p className="text-2xl font-bold text-primary mt-4">{currentWeight} kg</p>
            <p className="text-sm text-neutral-500 mt-1">Current Weight</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

