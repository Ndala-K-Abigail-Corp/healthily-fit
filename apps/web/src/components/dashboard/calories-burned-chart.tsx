import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { ActivityLog } from "@healthily-fit/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

interface CaloriesBurnedChartProps {
  activityLogs: ActivityLog[];
}

export function CaloriesBurnedChart({ activityLogs }: CaloriesBurnedChartProps) {
  // Group calories by week
  const weeklyData: { [key: string]: number } = {};

  activityLogs.forEach((log) => {
    if (log.caloriesBurned) {
      const date = new Date(log.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Start of week (Sunday)
      const weekKey = weekStart.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });

      weeklyData[weekKey] = (weeklyData[weekKey] || 0) + log.caloriesBurned;
    }
  });

  const chartData = Object.entries(weeklyData)
    .map(([week, calories]) => ({
      week,
      calories: Math.round(calories),
    }))
    .reverse()
    .slice(-8); // Show last 8 weeks

  const totalCalories = activityLogs.reduce(
    (sum, log) => sum + (log.caloriesBurned || 0),
    0
  );

  const avgCaloriesPerWorkout =
    activityLogs.length > 0
      ? Math.round(totalCalories / activityLogs.length)
      : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Calories Burned</CardTitle>
          <div className="flex items-center gap-4 text-sm">
            <div>
              <span className="text-neutral-600">Total: </span>
              <span className="font-semibold">{Math.round(totalCalories)} cal</span>
            </div>
            <div>
              <span className="text-neutral-600">Avg: </span>
              <span className="font-semibold">{avgCaloriesPerWorkout} cal</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto rounded-full bg-warning/10 flex items-center justify-center mb-4">
              <Flame className="w-8 h-8 text-warning" />
            </div>
            <p className="text-neutral-600">
              Complete workouts to track calories burned
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

