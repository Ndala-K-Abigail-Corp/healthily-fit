import { useState, useMemo } from "react";
import { Calendar, CheckCircle2, Clock, Edit2, Flame, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import type { WorkoutPlan } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculatePlanProgress, getCurrentWeekWorkouts, formatDayOfWeek } from "@/lib/workout-utils";
import { useActivityContext } from "@/context/activity-context";
import { WeightUpdateDialog } from "./weight-update-dialog";

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
  onEdit?: () => void;
}

export function WorkoutPlanCard({ plan, onEdit }: WorkoutPlanCardProps) {
  const { logWorkoutCompletion, isWorkoutDayCompleted } = useActivityContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showWeightDialog, setShowWeightDialog] = useState(false);
  const [completingWorkout, setCompletingWorkout] = useState<{
    dayNumber: number;
    exercises: string[];
    calories: number;
    duration: number;
  } | null>(null);

  const startDate = useMemo(() => new Date(plan.startDate), [plan.startDate]);
  const endDate = useMemo(() => new Date(plan.endDate), [plan.endDate]);

  const formattedStart = useMemo(
    () => startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    [startDate]
  );
  const formattedEnd = useMemo(
    () => endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    [endDate]
  );

  const progress = useMemo(() => calculatePlanProgress(plan), [plan]);
  const currentWeekWorkouts = useMemo(() => getCurrentWeekWorkouts(plan), [plan]);

  const handleMarkComplete = (dayNumber: number) => {
    const workout = plan.dailyWorkouts.find((w) => w.dayNumber === dayNumber);
    if (!workout) return;

    setCompletingWorkout({
      dayNumber,
      exercises: workout.exercises.map((ex) => String(ex.exerciseId)),
      calories: workout.targetCalories || 0,
      duration: workout.estimatedDurationMinutes || 0,
    });
    setShowWeightDialog(true);
  };

  const handleWeightDialogComplete = async (weightKg?: number) => {
    if (!completingWorkout) return;

    try {
      setIsLoading(true);
      await logWorkoutCompletion(
        plan.id,
        completingWorkout.dayNumber,
        completingWorkout.exercises,
        completingWorkout.calories,
        completingWorkout.duration,
        weightKg
      );
    } catch (error) {
      console.error("Error completing workout log:", error);
    } finally {
      setIsLoading(false);
      setCompletingWorkout(null);
      setShowWeightDialog(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-sm">
            <Calendar className="w-5 h-5 text-primary" /> Active Workout Plan
          </CardTitle>
          {onEdit && (
            <Button variant="outline" size="sm" onClick={onEdit}>
              <Edit2 className="w-4 h-4 mr-2" /> Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Plan Overview */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-600" />
            <span className="text-neutral-600">{formattedStart} - {formattedEnd}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-success" />
            <span className="font-semibold text-success">{progress}% Complete</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <div
            className="bg-primary rounded-full h-2"
            style={{ width: `${progress}%`, transition: 'width 0.5s ease' }}
          />
        </div>

        {/* Plan Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 border-y border-neutral-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{plan.totalWeeks}</div>
            <div className="text-xs text-neutral-600 mt-1">Weeks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{plan.dailyWorkouts.length}</div>
            <div className="text-xs text-neutral-600 mt-1">Workouts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">
              {plan.dailyWorkouts.reduce((sum, w) => sum + w.exercises.length, 0)}
            </div>
            <div className="text-xs text-neutral-600 mt-1">Exercises</div>
          </div>
        </div>

        {/* This Week's Workouts */}
        <div>
          <h4 className="font-semibold text-sm mb-3">This Week's Workouts</h4>
          {currentWeekWorkouts.length > 0 ? (
            <div className="space-y-2">
              {currentWeekWorkouts.map((workout) => {
                const isCompleted = isWorkoutDayCompleted(plan.id, workout.dayNumber);
                return (
                  <div
                    key={workout.dayNumber}
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isCompleted ? "bg-success/10 border border-success/20" : "bg-neutral-50 hover:bg-neutral-100"
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-success" />}
                        <span className={`font-semibold text-sm ${isCompleted ? "text-success" : ""}`}>
                          {formatDayOfWeek(workout.dayOfWeek)}
                        </span>
                        <span className="text-xs text-neutral-500">Day {workout.dayNumber}</span>
                      </div>
                      <p className="text-xs text-neutral-600 mt-1">{workout.title}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-4 text-xs text-neutral-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{workout.estimatedDurationMinutes} min</span>
                        </div>
                        {workout.targetCalories && (
                          <div className="flex items-center gap-1">
                            <Flame className="w-3 h-3" />
                            <span>{workout.targetCalories} cal</span>
                          </div>
                        )}
                      </div>
                      {!isCompleted && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleMarkComplete(workout.dayNumber)}
                          disabled={isLoading}
                        >
                          {isLoading ? "Logging..." : "Complete"}
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-neutral-500 italic text-center py-4">
              No workouts scheduled for this week
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to="/dashboard/workouts" className="flex-1">
            <Button variant="default" className="w-full">View Full Plan</Button>
          </Link>
          {progress === 100 && (
            <Button variant="outline" className="gap-2">
              <CheckCircle2 className="w-4 h-4" /> Mark Complete
            </Button>
          )}
        </div>

        {plan.notes && <p className="text-xs text-neutral-500 italic pt-2 border-t">{plan.notes}</p>}
      </CardContent>

      <WeightUpdateDialog
        open={showWeightDialog}
        onOpenChange={setShowWeightDialog}
        onComplete={handleWeightDialogComplete}
      />
    </Card>
  );
}
