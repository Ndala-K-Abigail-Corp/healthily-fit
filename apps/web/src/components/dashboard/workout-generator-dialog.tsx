import { useState } from "react";
import { Activity, Calendar, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import type { WorkoutPlan } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
<<<<<<< HEAD
=======
  DialogDescription,
>>>>>>> feature/dashboard
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkoutContext } from "@/context/workout-context";
import { calculatePlanCalories, calculatePlanDuration } from "@/lib/workout-utils";

interface WorkoutGeneratorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (plan: WorkoutPlan) => void;
}

export function WorkoutGeneratorDialog({
  isOpen,
  onClose,
  onSuccess,
}: WorkoutGeneratorDialogProps) {
  const { generatePlan, isLoading } = useWorkoutContext();
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    try {
      setError(null);
      const plan = await generatePlan();
      setGeneratedPlan(plan);
    } catch (err: any) {
      setError(err.message || "Failed to generate workout plan");
    }
  };

  const handleRegenerate = async () => {
    setGeneratedPlan(null);
    await handleGenerate();
  };

  const handleAccept = () => {
    if (generatedPlan && onSuccess) {
      onSuccess(generatedPlan);
    }
    handleClose();
  };

  const handleClose = () => {
    setGeneratedPlan(null);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Generate Workout Plan
          </DialogTitle>
<<<<<<< HEAD
=======
          <DialogDescription>
            Create a personalized 4-week workout plan based on your profile, fitness goals, and health conditions. 
            You can review and accept the generated plan or regenerate for different exercises.
          </DialogDescription>
>>>>>>> feature/dashboard
        </DialogHeader>

        <div className="space-y-6">
          {!generatedPlan ? (
            /* Pre-generation state */
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Activity className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">
                  Ready to Create Your Personalized Workout Plan?
                </h3>
                <p className="text-neutral-600 text-sm max-w-md mx-auto">
                  We'll generate a customized 4-week workout plan based on your
                  profile, fitness goals, and any health conditions you've shared.
                </p>
              </div>

              {error && (
                <div className="bg-error/10 text-error p-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="bg-neutral-50 p-4 rounded-lg space-y-3">
                <p className="font-semibold text-sm">Your plan will include:</p>
                <ul className="text-sm text-neutral-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    Exercises tailored to your fitness level
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    Safe workouts that avoid contraindicated exercises
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    Progressive difficulty over 4 weeks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
                    3 workouts per week with rest days
                  </li>
                </ul>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isLoading}
                className="px-8"
              >
                {isLoading ? "Generating..." : "Generate My Plan"}
              </Button>
            </div>
          ) : (
            /* Post-generation preview */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold text-lg mb-2">
                  Your Workout Plan is Ready!
                </h3>
                <p className="text-neutral-600 text-sm">
                  Review your personalized plan below
                </p>
              </div>

              {/* Plan Summary */}
              <div className="bg-neutral-50 rounded-lg p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-2xl font-bold">{generatedPlan.totalWeeks}</div>
                    <div className="text-xs text-neutral-600">Weeks</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Activity className="w-5 h-5 text-accent mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {generatedPlan.dailyWorkouts.length}
                    </div>
                    <div className="text-xs text-neutral-600">Workouts</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Clock className="w-5 h-5 text-success mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {Math.round(calculatePlanDuration(generatedPlan) / generatedPlan.dailyWorkouts.length)}
                    </div>
                    <div className="text-xs text-neutral-600">Min/Workout</div>
                  </div>
                  <div className="text-center p-3 bg-background rounded-lg">
                    <Activity className="w-5 h-5 text-warning mx-auto mb-2" />
                    <div className="text-2xl font-bold">
                      {Math.round(calculatePlanCalories(generatedPlan) / generatedPlan.dailyWorkouts.length)}
                    </div>
                    <div className="text-xs text-neutral-600">Cal/Workout</div>
                  </div>
                </div>

                {generatedPlan.notes && (
                  <p className="text-sm text-neutral-600 text-center pt-2 border-t">
                    {generatedPlan.notes}
                  </p>
                )}
              </div>

              {/* Sample Workouts */}
              <div>
                <h4 className="font-semibold text-sm mb-3">
                  Week 1 Preview
                </h4>
                <div className="space-y-2">
                  {generatedPlan.dailyWorkouts.slice(0, 3).map((workout) => (
                    <div
                      key={workout.dayNumber}
                      className="p-3 bg-neutral-50 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">
                          {workout.title}
                        </span>
                        <span className="text-xs text-neutral-600">
                          {workout.estimatedDurationMinutes} min
                        </span>
                      </div>
                      <p className="text-xs text-neutral-600">
                        {workout.exercises.length} exercises
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleRegenerate}
                  variant="outline"
                  disabled={isLoading}
                  className="flex-1 gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  {isLoading ? "Regenerating..." : "Regenerate"}
                </Button>
                <Button
                  onClick={handleAccept}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Accept & Start
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

