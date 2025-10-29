import { useState } from "react";
import { ArrowLeft, Check, CheckCircle2, Clock, Dumbbell, Flame } from "lucide-react";
import type { DailyWorkout } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatExerciseDuration } from "@/lib/workout-utils";
import { useActivityContext } from "@/context/activity-context";
import { WeightUpdateDialog } from "./weight-update-dialog";

interface WorkoutDayDetailProps {
  workout: DailyWorkout;
  workoutPlanId: string;
  onBack: () => void;
}

export function WorkoutDayDetail({
  workout,
  workoutPlanId,
  onBack,
}: WorkoutDayDetailProps) {
  const {
    logWorkoutCompletion,
    logExerciseCompletion,
    isWorkoutDayCompleted,
    getCompletedExercisesForDay,
  } = useActivityContext();

  const [isLoading, setIsLoading] = useState(false);
  const [showWeightDialog, setShowWeightDialog] = useState(false);
  const [localCompletedExercises, setLocalCompletedExercises] = useState<string[]>(
    getCompletedExercisesForDay(workoutPlanId, workout.dayNumber)
  );

  const isFullyCompleted = isWorkoutDayCompleted(workoutPlanId, workout.dayNumber);
  const completedCount = localCompletedExercises.length;
  const totalCount = workout.exercises.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const handleToggleExercise = async (exerciseId: string) => {
    if (isFullyCompleted) return; // Don't allow changes if fully completed

    try {
      setIsLoading(true);

      const isCurrentlyCompleted = localCompletedExercises.includes(exerciseId);

      if (isCurrentlyCompleted) {
        // Remove from local state (note: we don't remove from backend)
        setLocalCompletedExercises((prev) => prev.filter((id) => id !== exerciseId));
      } else {
        // Add to completed
        await logExerciseCompletion(workoutPlanId, workout.dayNumber, exerciseId);
        setLocalCompletedExercises((prev) => [...prev, exerciseId]);
      }
    } catch (error) {
      console.error("Error toggling exercise:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteAll = async () => {
    if (isFullyCompleted) return;

    try {
      setIsLoading(true);
      setShowWeightDialog(true);
    } catch (error) {
      console.error("Error completing all exercises:", error);
      setIsLoading(false);
    }
  };

  const handleWeightDialogComplete = async () => {
    try {
      const exerciseIds = workout.exercises.map((ex) => ex.exerciseId);
      await logWorkoutCompletion(
        workoutPlanId,
        workout.dayNumber,
        exerciseIds,
        workout.targetCalories || 0,
        workout.estimatedDurationMinutes || 0
      );
      setLocalCompletedExercises(exerciseIds);
    } catch (error) {
      console.error("Error completing workout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="flex-1">
            <CardTitle>{workout.title}</CardTitle>
            <p className="text-sm text-neutral-600 mt-1">{workout.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Workout Stats */}
        <div className="grid grid-cols-3 gap-4 p-4 bg-neutral-50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="font-semibold">{workout.estimatedDurationMinutes} min</div>
            <div className="text-xs text-neutral-600">Duration</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <div className="font-semibold">{workout.targetCalories} cal</div>
            <div className="text-xs text-neutral-600">Target</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-neutral-600 mb-1">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div className="font-semibold">{workout.exercises.length}</div>
            <div className="text-xs text-neutral-600">Exercises</div>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold">
              Progress: {completedCount} / {totalCount} exercises
            </span>
            <span className="text-sm text-neutral-600">
              {progressPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-medium"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Complete All Button */}
        {!isFullyCompleted && (
          <Button
            onClick={handleCompleteAll}
            disabled={isLoading}
            className="w-full"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Complete All Exercises
          </Button>
        )}

        {isFullyCompleted && (
          <div className="flex items-center justify-center gap-2 p-4 bg-success/10 border border-success/20 rounded-lg">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="font-semibold text-success">Workout Completed!</span>
          </div>
        )}

        {/* Exercise List */}
        <div>
          <h4 className="font-semibold mb-3">Exercises</h4>
          <div className="space-y-2">
            {workout.exercises.map((exercise, index) => {
              const isCompleted = localCompletedExercises.includes(exercise.exerciseId);

              return (
                <div
                  key={`${exercise.exerciseId}-${index}`}
                  className={`p-4 rounded-lg border transition-all ${
                    isCompleted
                      ? "bg-success/10 border-success/30"
                      : "bg-white border-neutral-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <button
                      onClick={() => handleToggleExercise(exercise.exerciseId)}
                      disabled={isLoading || isFullyCompleted}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-success border-success"
                          : "border-neutral-300 hover:border-primary"
                      } ${
                        isLoading || isFullyCompleted
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      {isCompleted && <Check className="w-4 h-4 text-white" />}
                    </button>

                    {/* Exercise Details */}
                    <div className="flex-1">
                      <h5 className={`font-semibold ${isCompleted ? "text-success" : ""}`}>
                        {exercise.exerciseName}
                      </h5>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-neutral-600">
                        {exercise.sets && (
                          <span>{exercise.sets} sets</span>
                        )}
                        {exercise.reps && (
                          <span>{exercise.reps} reps</span>
                        )}
                        {exercise.durationMinutes && (
                          <span>{formatExerciseDuration(exercise.durationMinutes)}</span>
                        )}
                        {exercise.restSeconds && (
                          <span>{exercise.restSeconds}s rest</span>
                        )}
                      </div>
                      {exercise.notes && (
                        <p className="text-xs text-neutral-500 mt-2 italic">
                          {exercise.notes}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>

      <WeightUpdateDialog
        open={showWeightDialog}
        onOpenChange={setShowWeightDialog}
        onComplete={handleWeightDialogComplete}
      />
    </Card>
  );
}

