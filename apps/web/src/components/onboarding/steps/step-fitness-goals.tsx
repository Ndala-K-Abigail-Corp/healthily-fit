import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FitnessGoalEnum } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const FitnessGoalsSchema = z.object({
  fitnessGoal: FitnessGoalEnum,
  targetWeightKg: z
    .number()
    .min(20, "Target weight must be at least 20 kg")
    .max(500)
    .optional()
    .or(z.literal(0))
    .transform((val) => (val === 0 ? undefined : val)),
});

type FitnessGoalsData = z.infer<typeof FitnessGoalsSchema>;

interface StepFitnessGoalsProps {
  defaultValues?: Partial<FitnessGoalsData>;
  onBack: () => void;
  onNext: (data: FitnessGoalsData) => void;
}

export function StepFitnessGoals({
  defaultValues,
  onBack,
  onNext,
}: StepFitnessGoalsProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<FitnessGoalsData>({
    defaultValues: {
      fitnessGoal: defaultValues?.fitnessGoal || "general_health",
      targetWeightKg: defaultValues?.targetWeightKg,
    },
    resolver: zodResolver(FitnessGoalsSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Fitness Goals</h2>
          <p className="text-neutral-600 mt-sm">
            What do you want to achieve with your fitness journey?
          </p>
        </div>

        {/* Fitness Goal */}
        <div className="space-y-2">
          <Label htmlFor="fitnessGoal">Primary Fitness Goal *</Label>
          <select
            id="fitnessGoal"
            className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("fitnessGoal")}
          >
            {FitnessGoalEnum.options.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("_", " ")}
              </option>
            ))}
          </select>
          {errors.fitnessGoal && (
            <p className="text-sm text-error">{errors.fitnessGoal.message}</p>
          )}
        </div>

        {/* Target Weight */}
        <div className="space-y-2">
          <Label htmlFor="targetWeightKg">Target Weight (kg)</Label>
          <Input
            id="targetWeightKg"
            type="number"
            min="20"
            max="500"
            step="0.1"
            placeholder="Optional - Enter your target weight"
            {...register("targetWeightKg", { valueAsNumber: true })}
          />
          <p className="text-xs text-neutral-600">
            Leave empty if you don't have a specific weight goal
          </p>
          {errors.targetWeightKg && (
            <p className="text-sm text-error">
              {errors.targetWeightKg.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}

