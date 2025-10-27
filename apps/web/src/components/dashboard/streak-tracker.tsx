import { Calendar, Flame, Award, TrendingUp } from "lucide-react";
import type { ActivityLog } from "@healthily-fit/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StreakTrackerProps {
  activityLogs: ActivityLog[];
}

export function StreakTracker({ activityLogs }: StreakTrackerProps) {
  // Calculate current streak
  const calculateCurrentStreak = (): number => {
    if (activityLogs.length === 0) return 0;

    const sortedLogs = [...activityLogs]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .filter((log) => log.type === "workout");

    let streak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if there's a workout today or yesterday
    const lastWorkoutDate = new Date(sortedLogs[0]?.date);
    lastWorkoutDate.setHours(0, 0, 0, 0);

    const daysDiff = Math.floor(
      (today.getTime() - lastWorkoutDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff > 1) return 0; // Streak broken

    // Count consecutive days (allowing 1 day gap)
    const workoutDates = new Set(
      sortedLogs.map((log) => {
        const date = new Date(log.date);
        date.setHours(0, 0, 0, 0);
        return date.toISOString().split("T")[0];
      })
    );

    let currentDate = new Date(today);
    while (true) {
      const dateString = currentDate.toISOString().split("T")[0];
      if (workoutDates.has(dateString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        // Allow one day gap
        currentDate.setDate(currentDate.getDate() - 1);
        const nextDateString = currentDate.toISOString().split("T")[0];
        if (workoutDates.has(nextDateString)) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
    }

    return streak;
  };

  // Calculate best streak
  const calculateBestStreak = (): number => {
    if (activityLogs.length === 0) return 0;

    const workoutDates = [...activityLogs]
      .filter((log) => log.type === "workout")
      .map((log) => {
        const date = new Date(log.date);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      })
      .sort((a, b) => a - b);

    let maxStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < workoutDates.length; i++) {
      const daysDiff = (workoutDates[i] - workoutDates[i - 1]) / (1000 * 60 * 60 * 24);

      if (daysDiff <= 2) {
        // Allow 1 day gap
        currentStreak++;
        maxStreak = Math.max(maxStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return maxStreak;
  };

  const currentStreak = calculateCurrentStreak();
  const bestStreak = calculateBestStreak();

  // Calculate this month's progress
  const now = new Date();
  const thisMonth = activityLogs.filter((log) => {
    const logDate = new Date(log.date);
    return (
      log.type === "workout" &&
      logDate.getMonth() === now.getMonth() &&
      logDate.getFullYear() === now.getFullYear()
    );
  }).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-warning" />
          Workout Streak
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Current Streak */}
          <div className="text-center p-4 bg-gradient-to-br from-warning/10 to-warning/5 rounded-lg">
            <Flame className="w-8 h-8 text-warning mx-auto mb-2" />
            <p className="text-4xl font-bold text-warning">{currentStreak}</p>
            <p className="text-sm text-neutral-600 mt-1">Day Streak</p>
            {currentStreak > 0 && (
              <p className="text-xs text-neutral-500 mt-2">Keep it going! 🔥</p>
            )}
          </div>

          {/* Best Streak */}
          <div className="text-center p-4 bg-gradient-to-br from-success/10 to-success/5 rounded-lg">
            <Award className="w-8 h-8 text-success mx-auto mb-2" />
            <p className="text-4xl font-bold text-success">{bestStreak}</p>
            <p className="text-sm text-neutral-600 mt-1">Best Streak</p>
            {bestStreak > 0 && (
              <p className="text-xs text-neutral-500 mt-2">Personal record</p>
            )}
          </div>

          {/* This Month */}
          <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
            <Calendar className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-4xl font-bold text-primary">{thisMonth}</p>
            <p className="text-sm text-neutral-600 mt-1">This Month</p>
            {thisMonth > 0 && (
              <p className="text-xs text-neutral-500 mt-2">
                {now.toLocaleDateString("en-US", { month: "long" })}
              </p>
            )}
          </div>
        </div>

        {/* Motivational Message */}
        {currentStreak === 0 && activityLogs.length > 0 && (
          <div className="mt-4 p-3 bg-accent/10 rounded-lg text-center">
            <p className="text-sm text-neutral-700">
              Start a new streak today! Complete a workout to begin. 💪
            </p>
          </div>
        )}

        {currentStreak >= 7 && (
          <div className="mt-4 p-3 bg-success/10 rounded-lg text-center">
            <p className="text-sm text-success font-semibold">
              🎉 Amazing! You've maintained a {currentStreak}-day streak!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

