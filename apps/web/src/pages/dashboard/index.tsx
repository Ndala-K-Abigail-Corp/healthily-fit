import { useState } from "react";
import { Activity, BarChart3, Calendar, Flame, LineChart, Plus, Target, TrendingUp } from "lucide-react";

import { calculateBMI, getBMICategory } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DashboardLayout,
  ProgressChart,
  RecentActivity,
  StatsCard,
  WorkoutPlanCard,
  WorkoutGeneratorDialog,
} from "@/components/dashboard";
import { ErrorBoundary } from "@/components/error-boundary";
import { useActivityContext } from "@/context/activity-context";
import { useAuthContext } from "@/context/auth-context";
import { useProfileContext } from "@/context/profile-context";
import { useWorkoutContext } from "@/context/workout-context";

export function DashboardPage() {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();
  const { activePlan } = useWorkoutContext();
  const { activityLogs } = useActivityContext();
  const [showGeneratorDialog, setShowGeneratorDialog] = useState(false);

  // Calculate workouts completed this week
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const workoutsThisWeek = activityLogs.filter(
    (log) => log.type === "workout" && new Date(log.date) >= oneWeekAgo
  ).length;

  // Profile should exist due to ProtectedRoute, but handle edge case
  if (!profile) {
    return null;
  }

  const bmi = calculateBMI(profile.weightKg, profile.heightCm);
  const bmiCategory = getBMICategory(bmi);

  const formattedGoal = profile.fitnessGoal
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="animate-fadeIn">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2" style={{ fontSize: 'var(--font-size-3xl)', lineHeight: 'var(--line-height-heading)' }}>
            Welcome back, {user?.displayName || "there"}! 👋
          </h1>
          <p className="text-neutral-600 text-lg" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-neutral-600)' }}>
            Here's your fitness progress overview
          </p>
        </div>

        {/* Stats Grid - Top Priority */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-slideUp">
          <StatsCard
            icon={Flame}
            title="Workouts This Week"
            value={workoutsThisWeek.toString()}
            description="Keep up the momentum!"
          />
          <StatsCard
            icon={Target}
            title="Current Weight"
            value={`${profile.weightKg} kg`}
            description={
              profile.targetWeightKg
                ? `Goal: ${profile.targetWeightKg} kg`
                : "Set your target"
            }
          />
          <StatsCard
            icon={Activity}
            title="BMI"
            value={bmi.toFixed(1)}
            description={bmiCategory}
          />
          <StatsCard
            icon={TrendingUp}
            title="Fitness Goal"
            value={formattedGoal}
            description={profile.dietaryPreference}
          />
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Larger (2/3) */}
          <div className="xl:col-span-2 space-y-6">
            {/* Active Workout Plan */}
            <div className="animate-slideUp [animation-delay:100ms]">
              <ErrorBoundary>
                {activePlan ? (
                  <WorkoutPlanCard plan={activePlan} />
                ) : (
                <Card className="border-2 border-dashed border-neutral-300 hover:border-primary transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Active Workout Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 space-y-4">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Plus className="w-10 h-10 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-lg">No active workout plan</p>
                        <p className="text-sm text-neutral-600 mt-2">
                          Generate your personalized plan to get started on your fitness journey
                        </p>
                      </div>
                      <Button
                        size="lg"
                        onClick={() => setShowGeneratorDialog(true)}
                        className="mt-4"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Generate Workout Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              </ErrorBoundary>
            </div>

            {/* Weight Progress Chart */}
            <div className="animate-slideUp [animation-delay:300ms]">
              <ProgressChart currentWeight={profile.weightKg} />
            </div>
          </div>

          {/* Right Column - Smaller (1/3) */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="animate-slideUp [animation-delay:200ms]">
              <RecentActivity />
            </div>

            {/* Weekly Activity Chart - Compact */}
            <Card className="animate-slideUp [animation-delay:400ms]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 flex flex-col items-center justify-center">
                  <div className="w-full h-32 bg-neutral-100 rounded-lg p-2 flex items-end justify-around gap-1">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day, index) => (
                        <div
                          key={`weekday-${index}-${day}`}
                          className="flex flex-col items-center flex-1"
                        >
                          <div
                            className="w-full bg-primary/30 rounded-t transition-all duration-medium hover:bg-primary"
                            style={{ height: "10%" }}
                          />
                          <span className="text-xs text-neutral-600 mt-1">
                            {day.charAt(0)}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-xs text-neutral-600 mt-3 text-center">
                    Log workouts to track activity
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BMI & Health Insights - Full Width */}
        <Card className="animate-slideUp [animation-delay:500ms]">
          <CardHeader>
            <CardTitle className="flex items-center gap-sm">
              <TrendingUp className="w-5 h-5 text-accent" />
              BMI Trend & Health Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-lg">
              {/* BMI Range Indicator */}
              <div className="space-y-sm">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Your BMI: {bmi.toFixed(1)}</span>
                  <span
                    className={`font-semibold ${
                      bmiCategory === "Normal weight"
                        ? "text-success"
                        : bmiCategory === "Overweight"
                        ? "text-warning"
                        : "text-error"
                    }`}
                  >
                    {bmiCategory}
                  </span>
                </div>
                {/* BMI range bar */}
                <div className="relative h-8 bg-neutral-200 rounded-full overflow-hidden">
                  <div className="absolute inset-0 flex">
                    <div className="bg-blue-400" style={{ width: "18.5%" }} />
                    <div className="bg-success" style={{ width: "6.4%" }} />
                    <div className="bg-warning" style={{ width: "5%" }} />
                    <div className="bg-error flex-1" />
                  </div>
                  {/* Current BMI indicator */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-neutral-900"
                    style={{
                      left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%`,
                      transform: "translateX(-50%)",
                    }}
                  >
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-neutral-900 text-white text-xs px-2 py-1 rounded">
                      {bmi.toFixed(1)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-neutral-600">
                  <span>Underweight</span>
                  <span>Normal</span>
                  <span>Overweight</span>
                  <span>Obese</span>
                </div>
              </div>

              {/* Health Insights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md pt-md border-t">
                <div className="text-center p-md bg-primary/5 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {profile.age}
                  </div>
                  <div className="text-sm text-neutral-600 mt-xs">
                    Years Old
                  </div>
                </div>
                <div className="text-center p-md bg-accent/5 rounded-lg">
                  <div className="text-2xl font-bold text-accent">
                    {profile.heightCm} cm
                  </div>
                  <div className="text-sm text-neutral-600 mt-xs">Height</div>
                </div>
                <div className="text-center p-md bg-success/5 rounded-lg">
                  <div className="text-2xl font-bold text-success">
                    {profile.targetWeightKg
                      ? `${Math.abs(
                          profile.weightKg - profile.targetWeightKg
                        ).toFixed(1)} kg`
                      : "N/A"}
                  </div>
                  <div className="text-sm text-neutral-600 mt-xs">
                    {profile.targetWeightKg ? "To Goal" : "Set Target"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Workout Generator Dialog */}
      <WorkoutGeneratorDialog
        isOpen={showGeneratorDialog}
        onClose={() => setShowGeneratorDialog(false)}
        onSuccess={() => {
          // Dialog will close automatically
        }}
      />
    </DashboardLayout>
  );
}

