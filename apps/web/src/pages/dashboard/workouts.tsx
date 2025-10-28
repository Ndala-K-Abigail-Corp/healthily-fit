import { useState } from "react";
import {
  Activity,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Dumbbell,
  Edit2,
  Flame,
  Plus,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DashboardLayout,
  WorkoutGeneratorDialog,
  WorkoutEditor,
} from "@/components/dashboard";
import { useWorkoutContext } from "@/context/workout-context";
import {
  calculatePlanProgress,
  formatDayOfWeek,
  formatExerciseDuration,
} from "@/lib/workout-utils";
import type { WorkoutPlan } from "@healthily-fit/shared";

/**
 * Workouts page - View and manage workout plans
 */
export function WorkoutsPage() {
  const { activePlan, allPlans, deletePlan, updatePlan, createCustomPlan, isLoading } =
    useWorkoutContext();
  const [showGeneratorDialog, setShowGeneratorDialog] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    activePlan?.id || null
  );
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);

  const selectedPlan = selectedPlanId
    ? allPlans.find((p) => p.id === selectedPlanId) || activePlan
    : activePlan;

  const editingPlan = editingPlanId
    ? allPlans.find((p) => p.id === editingPlanId)
    : null;

  const handleActivate = async (planId: string) => {
    if (confirm("Set this plan as your active workout plan? Your current active plan will be cancelled.")) {
      try {
        // Cancel the current active plan if it exists
        if (activePlan && activePlan.id !== planId) {
          await updatePlan(activePlan.id, { status: "cancelled" });
        }
        // Activate the selected plan
        await updatePlan(planId, { status: "active" });
      } catch (error) {
        console.error("Failed to activate plan:", error);
      }
    }
  };

  const handleMarkComplete = async (planId: string) => {
    if (confirm("Mark this workout plan as complete?")) {
      await updatePlan(planId, { status: "completed" });
    }
  };

  const handleDelete = async (planId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this workout plan? This action cannot be undone."
      )
    ) {
      await deletePlan(planId);
      if (selectedPlanId === planId) {
        setSelectedPlanId(activePlan?.id || null);
      }
      if (editingPlanId === planId) {
        setEditingPlanId(null);
      }
    }
  };

  const handleSaveEdit = async (updatedPlan: Omit<WorkoutPlan, "id">) => {
    if (!editingPlanId) return;

    try {
      // Save as a customized version
      await createCustomPlan({
        ...updatedPlan,
        isCustom: true,
        customizedFrom: editingPlanId,
      });

      // Mark original as cancelled if it was active
      const originalPlan = allPlans.find((p) => p.id === editingPlanId);
      if (originalPlan?.status === "active") {
        await updatePlan(editingPlanId, { status: "cancelled" });
      }

      setEditingPlanId(null);
    } catch (error) {
      console.error("Failed to save edited plan:", error);
    }
  };

  // If editing a plan, show the editor
  if (editingPlan) {
    return (
      <DashboardLayout>
        <WorkoutEditor
          plan={editingPlan}
          onSave={handleSaveEdit}
          onCancel={() => setEditingPlanId(null)}
          isLoading={isLoading}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Workouts</h1>
            <p className="text-neutral-600 mt-sm">
              Manage and track your workout plans
            </p>
          </div>
          <Button
            onClick={() => setShowGeneratorDialog(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Plan
          </Button>
        </div>

        {allPlans.length === 0 ? (
          /* No Plans State */
          <Card>
            <CardContent className="pt-lg">
              <div className="text-center py-xl space-y-md">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Dumbbell className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg">No workout plans yet</p>
                  <p className="text-sm text-neutral-600 mt-sm">
                    Generate your first personalized workout plan to get started
                  </p>
                </div>
                <Button
                  className="mt-md"
                  onClick={() => setShowGeneratorDialog(true)}
                >
                  Generate Workout Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          /* Plans List & Details */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Plans Sidebar */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-semibold text-sm text-neutral-600 px-2">
                Your Plans
              </h3>
              {allPlans.map((plan) => {
                const progress = calculatePlanProgress(plan);
                const isSelected = selectedPlanId === plan.id;

                return (
                  <Card
                    key={plan.id}
                    className={`cursor-pointer transition-all ${
                      isSelected
                        ? "border-primary shadow-md"
                        : "hover:border-neutral-300"
                    }`}
                    onClick={() => setSelectedPlanId(plan.id)}
                  >
                    <CardContent className="pt-4 pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          {plan.status === "active" && (
                            <span className="px-2 py-0.5 text-xs bg-success/10 text-success rounded-full font-medium">
                              Active
                            </span>
                          )}
                          {plan.status === "completed" && (
                            <span className="px-2 py-0.5 text-xs bg-neutral-200 text-neutral-600 rounded-full font-medium">
                              Completed
                            </span>
                          )}
                          {plan.status === "cancelled" && (
                            <span className="px-2 py-0.5 text-xs bg-warning/10 text-warning rounded-full font-medium">
                              Archived
                            </span>
                          )}
                          {plan.isCustom && (
                            <span className="px-2 py-0.5 text-xs bg-accent/10 text-accent rounded-full font-medium">
                              Custom
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-semibold truncate">
                        {plan.notes || `${plan.totalWeeks}-Week Plan`}
                      </p>
                      <p className="text-xs text-neutral-600 mt-1">
                        {plan.dailyWorkouts.length} workouts • {progress}%
                        complete
                      </p>
                      <div className="w-full bg-neutral-200 rounded-full h-1 mt-2">
                        <div
                          className="bg-primary rounded-full h-1 transition-all"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Plan Details */}
            {selectedPlan && (
              <div className="lg:col-span-2 space-y-4">
                {/* Plan Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          {selectedPlan.notes || `${selectedPlan.totalWeeks}-Week Plan`}
                        </CardTitle>
                        <p className="text-sm text-neutral-600 mt-2">
                          {new Date(selectedPlan.startDate).toLocaleDateString()} -{" "}
                          {new Date(selectedPlan.endDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {selectedPlan.status !== "active" && (
                          <Button
                            size="sm"
                            onClick={() => handleActivate(selectedPlan.id)}
                            disabled={isLoading}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Set as Active
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingPlanId(selectedPlan.id)}
                          disabled={isLoading}
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        {selectedPlan.status === "active" &&
                          calculatePlanProgress(selectedPlan) === 100 && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleMarkComplete(selectedPlan.id)}
                              disabled={isLoading}
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Complete
                            </Button>
                          )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(selectedPlan.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Workouts List */}
                <div className="space-y-3">
                  {selectedPlan.dailyWorkouts.map((workout, index) => (
                    <Card key={workout.dayNumber}>
                      <CardContent className="pt-4 pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">
                                {formatDayOfWeek(workout.dayOfWeek)} -{" "}
                                {workout.title}
                              </h4>
                              <span className="text-xs text-neutral-500">
                                Day {workout.dayNumber}
                              </span>
                            </div>
                            {workout.description && (
                              <p className="text-sm text-neutral-600">
                                {workout.description}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-3 text-xs text-neutral-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {workout.estimatedDurationMinutes}m
                            </div>
                            {workout.targetCalories && (
                              <div className="flex items-center gap-1">
                                <Flame className="w-3 h-3" />
                                {workout.targetCalories} cal
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Exercises */}
                        <div className="space-y-2">
                          {workout.exercises.map((exercise, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-2 bg-neutral-50 rounded text-sm"
                            >
                              <div className="flex items-center gap-2">
                                <Activity className="w-4 h-4 text-accent" />
                                <span className="font-medium">
                                  {exercise.exerciseName}
                                </span>
                              </div>
                              <span className="text-xs text-neutral-600">
                                {formatExerciseDuration(exercise)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Workout Generator Dialog */}
      <WorkoutGeneratorDialog
        isOpen={showGeneratorDialog}
        onClose={() => setShowGeneratorDialog(false)}
        onSuccess={(plan) => {
          setSelectedPlanId(plan.id);
        }}
      />
    </DashboardLayout>
  );
}

