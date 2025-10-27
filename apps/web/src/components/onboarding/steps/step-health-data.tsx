import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  DietaryPreferenceEnum,
  HealthConditionEnum,
} from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const HealthDataSchema = z.object({
  dietaryPreference: DietaryPreferenceEnum,
  healthConditions: z.array(HealthConditionEnum),
});

type HealthDataType = z.infer<typeof HealthDataSchema>;

interface StepHealthDataProps {
  defaultValues?: Partial<HealthDataType>;
  onBack: () => void;
  onNext: (data: HealthDataType) => void;
}

export function StepHealthData({
  defaultValues,
  onBack,
  onNext,
}: StepHealthDataProps) {
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    defaultValues?.healthConditions || []
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<HealthDataType>({
    defaultValues: {
      dietaryPreference: defaultValues?.dietaryPreference || "omnivore",
      healthConditions: defaultValues?.healthConditions || [],
    },
    resolver: zodResolver(HealthDataSchema),
  });

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const onSubmit = (data: HealthDataType) => {
    onNext({
      ...data,
      healthConditions: selectedConditions as any[],
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Health Information</h2>
          <p className="text-neutral-600 mt-sm">
            Help us customize safe workouts for you
          </p>
        </div>

        {/* Dietary Preference */}
        <div className="space-y-2">
          <Label htmlFor="dietaryPreference">Dietary Preference *</Label>
          <select
            id="dietaryPreference"
            className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("dietaryPreference")}
          >
            {DietaryPreferenceEnum.options.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() +
                  option.slice(1).replace("_", " ")}
              </option>
            ))}
          </select>
          {errors.dietaryPreference && (
            <p className="text-sm text-error">
              {errors.dietaryPreference.message}
            </p>
          )}
        </div>

        {/* Health Conditions */}
        <div className="space-y-2">
          <Label>Health Conditions</Label>
          <p className="text-sm text-neutral-600">
            Select any that apply (helps us ensure safe workouts)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
            {HealthConditionEnum.options.map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => toggleCondition(condition)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  selectedConditions.includes(condition)
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background border-border hover:border-primary"
                }`}
              >
                {condition.charAt(0).toUpperCase() +
                  condition.slice(1).replace("_", " ")}
              </button>
            ))}
          </div>
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

