import { useEffect, useState } from "react";
import { TrendingUp, Activity } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard";
import { WeightHistoryChart } from "@/components/dashboard/weight-history-chart";
import { WorkoutCompletionStats } from "@/components/dashboard/workout-completion-stats";
import { CaloriesBurnedChart } from "@/components/dashboard/calories-burned-chart";
import { StreakTracker } from "@/components/dashboard/streak-tracker";
import { useActivityContext } from "@/context/activity-context";
import { useProfileContext } from "@/context/profile-context";
import { useWorkoutContext } from "@/context/workout-context";

/**
 * Progress page - View analytics and progress reports
 */
export function ProgressPage() {
  const { activityLogs, fetchUserActivities, isLoading } = useActivityContext();
  const { profile } = useProfileContext();
  const { activePlan } = useWorkoutContext();
  const [dateRange, setDateRange] = useState<"30d" | "90d" | "all">("90d");

  useEffect(() => {
    // Fetch activities based on date range
    const fetchData = async () => {
      if (dateRange === "all") {
        await fetchUserActivities();
      } else {
        const days = dateRange === "30d" ? 30 : 90;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);
        await fetchUserActivities(startDate);
      }
    };

    fetchData();
  }, [dateRange]);

  if (!profile) {
    return null;
  }

  const totalPlannedWorkouts = activePlan?.dailyWorkouts.length || 12;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              Progress Tracking
            </h1>
            <p className="text-neutral-600 mt-sm">
              View your fitness journey and achievements
            </p>
          </div>

          {/* Date Range Selector */}
          <div className="flex gap-2">
            <button
              onClick={() => setDateRange("30d")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === "30d"
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setDateRange("90d")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === "90d"
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              90 Days
            </button>
            <button
              onClick={() => setDateRange("all")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                dateRange === "all"
                  ? "bg-primary text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
            <p className="text-neutral-600">Loading your progress...</p>
          </div>
        ) : (
          <>
            {/* Workout Completion Stats */}
            <WorkoutCompletionStats
              activityLogs={activityLogs}
              totalPlannedWorkouts={totalPlannedWorkouts}
            />

            {/* Weight & Calories Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WeightHistoryChart
                activityLogs={activityLogs}
                currentWeight={profile.weightKg}
              />
              <CaloriesBurnedChart activityLogs={activityLogs} />
            </div>

            {/* Streak Tracker */}
            <StreakTracker activityLogs={activityLogs} />

            {/* Empty State */}
            {activityLogs.length === 0 && (
              <div className="text-center py-12 bg-neutral-50 rounded-lg">
                <Activity className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
                <p className="text-lg font-semibold text-neutral-700">
                  No Activity Data Yet
                </p>
                <p className="text-sm text-neutral-600 mt-2">
                  Complete workouts to start tracking your progress
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

