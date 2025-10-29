import { CheckCircle2, Calendar, TrendingUp, Award } from "lucide-react";
import type { ActivityLog } from "@healthily-fit/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkoutCompletionStatsProps {
  activityLogs: ActivityLog[];
  totalPlannedWorkouts?: number;
}

export function WorkoutCompletionStats({
  activityLogs,
  totalPlannedWorkouts = 12,
}: WorkoutCompletionStatsProps) {
  // Filter workout logs and parse dates safely
  const workoutLogs = activityLogs
    .filter((log) => log.type === "workout")
    .map((log) => ({
      ...log,
      dateObj: log.date ? new Date(log.date) : new Date(),
    }));

  const totalCompleted = workoutLogs.length;
  const completionRate =
    totalPlannedWorkouts > 0
      ? ((totalCompleted / totalPlannedWorkouts) * 100).toFixed(0)
      : "0";

  // Calculate this week's workouts
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const thisWeekWorkouts = workoutLogs.filter(
    (log) => log.dateObj >= oneWeekAgo
  ).length;

  // Calculate this month's workouts
  const oneMonthAgo = new Date();
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
  const thisMonthWorkouts = workoutLogs.filter(
    (log) => log.dateObj >= oneMonthAgo
  ).length;

  // Calculate average per week
  const firstWorkout = workoutLogs[workoutLogs.length - 1];
  const weeksActive = firstWorkout
    ? Math.max(
        1,
        Math.ceil(
          (new Date().getTime() - firstWorkout.dateObj.getTime()) /
            (7 * 24 * 60 * 60 * 1000)
        )
      )
    : 1;
  const avgPerWeek = (totalCompleted / weeksActive).toFixed(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* Total Completed */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-600">
            Total Completed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold">{totalCompleted}</p>
              <p className="text-xs text-neutral-600">workouts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This Week */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-600">
            This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold">{thisWeekWorkouts}</p>
              <p className="text-xs text-neutral-600">workouts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* This Month */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-600">
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-3xl font-bold">{thisMonthWorkouts}</p>
              <p className="text-xs text-neutral-600">workouts</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Completion Rate */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-600">
            Completion Rate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold">{completionRate}%</p>
              <p className="text-xs text-neutral-600">of planned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Average */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-neutral-600">
            Weekly Average
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold">{avgPerWeek}</p>
              <p className="text-xs text-neutral-600">workouts/week</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
