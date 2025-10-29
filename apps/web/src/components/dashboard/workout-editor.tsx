import { useState } from "react";
import { ArrowLeft, Plus, Save, Trash2, X } from "lucide-react";
import type { WorkoutPlan, DailyWorkout, WorkoutSet } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EXERCISE_DATABASE } from "@/lib/workout-templates";
import { cloneWorkoutPlan, validateWorkoutPlan } from "@/lib/workout-utils";

interface WorkoutEditorProps {
  plan: WorkoutPlan;
  onSave: (updatedPlan: Omit<WorkoutPlan, "id">) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function WorkoutEditor({
  plan,
  onSave,
  onCancel,
  isLoading = false,
}: WorkoutEditorProps) {
  const [editedPlan, setEditedPlan] = useState<Omit<WorkoutPlan, "id">>(
    cloneWorkoutPlan(plan, plan.id)
  );
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const updateWorkout = (
    dayNumber: number,
    updates: Partial<DailyWorkout>
  ) => {
    setEditedPlan((prev) => ({
      ...prev,
      dailyWorkouts: prev.dailyWorkouts.map((w) =>
        w.dayNumber === dayNumber ? { ...w, ...updates } : w
      ),
    }));
  };

  const updateExercise = (
    dayNumber: number,
    exerciseIndex: number,
    updates: Partial<WorkoutSet>
  ) => {
    setEditedPlan((prev) => ({
      ...prev,
      dailyWorkouts: prev.dailyWorkouts.map((w) =>
        w.dayNumber === dayNumber
          ? {
              ...w,
              exercises: w.exercises.map((ex, idx) =>
                idx === exerciseIndex ? { ...ex, ...updates } : ex
              ),
            }
          : w
      ),
    }));
  };

  const removeExercise = (dayNumber: number, exerciseIndex: number) => {
    setEditedPlan((prev) => ({
      ...prev,
      dailyWorkouts: prev.dailyWorkouts.map((w) =>
        w.dayNumber === dayNumber
          ? {
              ...w,
              exercises: w.exercises.filter((_, idx) => idx !== exerciseIndex),
            }
          : w
      ),
    }));
  };

  const addExercise = (dayNumber: number) => {
    const firstExercise = EXERCISE_DATABASE[0];
    const newExercise: WorkoutSet = {
      exerciseId: firstExercise.id,
      exerciseName: firstExercise.name,
      sets: 3,
      reps: 10,
      restSeconds: 60,
    };

    setEditedPlan((prev) => ({
      ...prev,
      dailyWorkouts: prev.dailyWorkouts.map((w) =>
        w.dayNumber === dayNumber
          ? {
              ...w,
              exercises: [...w.exercises, newExercise],
            }
          : w
      ),
    }));
  };

  const removeWorkout = (dayNumber: number) => {
    if (
      confirm(
        "Are you sure you want to remove this workout? This action cannot be undone."
      )
    ) {
      setEditedPlan((prev) => ({
        ...prev,
        dailyWorkouts: prev.dailyWorkouts.filter(
          (w) => w.dayNumber !== dayNumber
        ),
      }));
    }
  };

  const handleSave = async () => {
    const validation = validateWorkoutPlan(editedPlan as WorkoutPlan);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    await onSave(editedPlan);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            disabled={isLoading}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h2 className="font-heading text-2xl font-bold">Edit Workout Plan</h2>
            <p className="text-sm text-neutral-600 mt-1">
              Customize your workout plan exercises and schedule
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isLoading}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <Card className="border-error">
          <CardContent className="pt-4">
            <p className="font-semibold text-error mb-2">
              Please fix the following errors:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-error">
              {validationErrors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Plan Details */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Plan Name/Notes</Label>
            <Input
              id="notes"
              value={editedPlan.notes || ""}
              onChange={(e) =>
                setEditedPlan((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Enter plan name or notes"
              disabled={isLoading}
            />
          </div>
        </CardContent>
      </Card>

      {/* Workouts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Workouts</h3>
          <p className="text-sm text-neutral-600">
            {editedPlan.dailyWorkouts.length} workout
            {editedPlan.dailyWorkouts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {editedPlan.dailyWorkouts.map((workout) => (
          <Card key={workout.dayNumber}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`workout-title-${workout.dayNumber}`}>
                      Workout Title
                    </Label>
                    <span className="text-xs text-neutral-500">
                      Day {workout.dayNumber}
                    </span>
                  </div>
                  <Input
                    id={`workout-title-${workout.dayNumber}`}
                    value={workout.title}
                    onChange={(e) =>
                      updateWorkout(workout.dayNumber, {
                        title: e.target.value,
                      })
                    }
                    disabled={isLoading}
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeWorkout(workout.dayNumber)}
                  disabled={isLoading || editedPlan.dailyWorkouts.length <= 1}
                  className="ml-4"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Workout Description */}
              <div className="space-y-2">
                <Label htmlFor={`workout-desc-${workout.dayNumber}`}>
                  Description
                </Label>
                <Input
                  id={`workout-desc-${workout.dayNumber}`}
                  value={workout.description || ""}
                  onChange={(e) =>
                    updateWorkout(workout.dayNumber, {
                      description: e.target.value,
                    })
                  }
                  placeholder="Optional workout description"
                  disabled={isLoading}
                />
              </div>

              {/* Exercises */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Exercises</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addExercise(workout.dayNumber)}
                    disabled={isLoading}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>

                {workout.exercises.length === 0 ? (
                  <div className="text-center py-8 border border-dashed rounded-lg">
                    <p className="text-sm text-neutral-500">
                      No exercises yet. Click "Add Exercise" to get started.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {workout.exercises.map((exercise, exerciseIdx) => (
                      <div
                        key={exerciseIdx}
                        className="p-4 bg-neutral-50 rounded-lg space-y-3"
                      >
                        {/* Exercise Selection */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <Label
                              htmlFor={`exercise-name-${workout.dayNumber}-${exerciseIdx}`}
                            >
                              Exercise
                            </Label>
                            <select
                              id={`exercise-name-${workout.dayNumber}-${exerciseIdx}`}
                              value={exercise.exerciseId}
                              onChange={(e) => {
                                const selectedExercise =
                                  EXERCISE_DATABASE.find(
                                    (ex) => ex.id === e.target.value
                                  );
                                if (selectedExercise) {
                                  updateExercise(
                                    workout.dayNumber,
                                    exerciseIdx,
                                    {
                                      exerciseId: selectedExercise.id,
                                      exerciseName: selectedExercise.name,
                                    }
                                  );
                                }
                              }}
                              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              disabled={isLoading}
                            >
                              {EXERCISE_DATABASE.map((ex) => (
                                <option key={ex.id} value={ex.id}>
                                  {ex.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              removeExercise(workout.dayNumber, exerciseIdx)
                            }
                            disabled={isLoading}
                            className="mt-7"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Exercise Parameters */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div className="space-y-2">
                            <Label
                              htmlFor={`sets-${workout.dayNumber}-${exerciseIdx}`}
                            >
                              Sets
                            </Label>
                            <Input
                              id={`sets-${workout.dayNumber}-${exerciseIdx}`}
                              type="number"
                              min="1"
                              max="10"
                              value={exercise.sets}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                  updateExercise(workout.dayNumber, exerciseIdx, {
                                    sets: 1,
                                  });
                                } else {
                                  const parsed = parseInt(value);
                                  if (!isNaN(parsed) && parsed >= 1) {
                                    updateExercise(workout.dayNumber, exerciseIdx, {
                                      sets: parsed,
                                    });
                                  }
                                }
                              }}
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor={`reps-${workout.dayNumber}-${exerciseIdx}`}
                            >
                              Reps
                            </Label>
                            <Input
                              id={`reps-${workout.dayNumber}-${exerciseIdx}`}
                              type="number"
                              min="0"
                              max="100"
                              value={exercise.reps ?? ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                  updateExercise(workout.dayNumber, exerciseIdx, {
                                    reps: undefined,
                                  });
                                } else {
                                  const parsed = parseInt(value);
                                  if (!isNaN(parsed) && parsed >= 0) {
                                    updateExercise(workout.dayNumber, exerciseIdx, {
                                      reps: parsed,
                                    });
                                  }
                                }
                              }}
                              placeholder="Optional"
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor={`duration-${workout.dayNumber}-${exerciseIdx}`}
                            >
                              Duration (min)
                            </Label>
                            <Input
                              id={`duration-${workout.dayNumber}-${exerciseIdx}`}
                              type="number"
                              min="0"
                              max="120"
                              value={exercise.durationMinutes ?? ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                  updateExercise(workout.dayNumber, exerciseIdx, {
                                    durationMinutes: undefined,
                                  });
                                } else {
                                  const parsed = parseInt(value);
                                  if (!isNaN(parsed) && parsed >= 0) {
                                    updateExercise(workout.dayNumber, exerciseIdx, {
                                      durationMinutes: parsed,
                                    });
                                  }
                                }
                              }}
                              placeholder="Optional"
                              disabled={isLoading}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor={`rest-${workout.dayNumber}-${exerciseIdx}`}
                            >
                              Rest (sec)
                            </Label>
                            <Input
                              id={`rest-${workout.dayNumber}-${exerciseIdx}`}
                              type="number"
                              min="0"
                              max="300"
                              value={exercise.restSeconds}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value === "") {
                                  updateExercise(workout.dayNumber, exerciseIdx, {
                                    restSeconds: 60,
                                  });
                                } else {
                                  const parsed = parseInt(value);
                                  if (!isNaN(parsed) && parsed >= 0) {
                                    updateExercise(workout.dayNumber, exerciseIdx, {
                                      restSeconds: parsed,
                                    });
                                  }
                                }
                              }}
                              disabled={isLoading}
                            />
                          </div>
                        </div>

                        {/* Exercise Notes */}
                        <div className="space-y-2">
                          <Label
                            htmlFor={`notes-${workout.dayNumber}-${exerciseIdx}`}
                          >
                            Notes
                          </Label>
                          <Input
                            id={`notes-${workout.dayNumber}-${exerciseIdx}`}
                            value={exercise.notes || ""}
                            onChange={(e) =>
                              updateExercise(workout.dayNumber, exerciseIdx, {
                                notes: e.target.value,
                              })
                            }
                            placeholder="Optional exercise notes"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

