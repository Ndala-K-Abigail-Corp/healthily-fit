import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DietaryPreferenceEnum,
  FitnessGoalEnum,
  HealthConditionEnum,
  ProfileInputSchema,
  type Profile,
  type ProfileInput,
} from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileContext } from "@/context/profile-context";

interface ProfileEditFormProps {
  onCancel: () => void;
  onSuccess: () => void;
  profile: Profile;
}

export function ProfileEditForm({
  onCancel,
  onSuccess,
  profile,
}: ProfileEditFormProps) {
  const { updateProfile } = useProfileContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>(
    profile.healthConditions || []
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<ProfileInput>({
    defaultValues: {
      age: profile.age,
      dietaryPreference: profile.dietaryPreference,
      fitnessGoal: profile.fitnessGoal,
      healthConditions: profile.healthConditions,
      heightCm: profile.heightCm,
      targetWeightKg: profile.targetWeightKg,
      weightKg: profile.weightKg,
    },
    resolver: zodResolver(ProfileInputSchema),
  });

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const onSubmit = async (data: ProfileInput) => {
    try {
      setIsLoading(true);
      setError(null);

      const profileData: ProfileInput = {
        ...data,
        healthConditions: selectedConditions as any[],
      };

      await updateProfile(profileData);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardContent className="pt-lg space-y-4">
          <h3 className="font-heading text-lg font-bold">Personal Information</h3>
          
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              min="13"
              max="120"
              {...register("age", { valueAsNumber: true })}
              disabled={isLoading}
            />
            {errors.age && (
              <p className="text-sm text-error">{errors.age.message}</p>
            )}
          </div>

          {/* Height and Weight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="heightCm">Height (cm) *</Label>
              <Input
                id="heightCm"
                type="number"
                min="50"
                max="300"
                {...register("heightCm", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.heightCm && (
                <p className="text-sm text-error">{errors.heightCm.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="weightKg">Weight (kg) *</Label>
              <Input
                id="weightKg"
                type="number"
                min="20"
                max="500"
                step="0.1"
                {...register("weightKg", { valueAsNumber: true })}
                disabled={isLoading}
              />
              {errors.weightKg && (
                <p className="text-sm text-error">{errors.weightKg.message}</p>
              )}
            </div>
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
              {...register("targetWeightKg", { valueAsNumber: true })}
              disabled={isLoading}
            />
            {errors.targetWeightKg && (
              <p className="text-sm text-error">{errors.targetWeightKg.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Health Information */}
      <Card>
        <CardContent className="pt-lg space-y-4">
          <h3 className="font-heading text-lg font-bold">Health Information</h3>

          {/* Dietary Preference */}
          <div className="space-y-2">
            <Label htmlFor="dietaryPreference">Dietary Preference *</Label>
            <select
              id="dietaryPreference"
              className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("dietaryPreference")}
              disabled={isLoading}
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
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
                  disabled={isLoading}
                >
                  {condition.charAt(0).toUpperCase() +
                    condition.slice(1).replace("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fitness Goals */}
      <Card>
        <CardContent className="pt-lg space-y-4">
          <h3 className="font-heading text-lg font-bold">Fitness Goals</h3>

          {/* Fitness Goal */}
          <div className="space-y-2">
            <Label htmlFor="fitnessGoal">Fitness Goal *</Label>
            <select
              id="fitnessGoal"
              className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              {...register("fitnessGoal")}
              disabled={isLoading}
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
        </CardContent>
      </Card>

      {error && (
        <div className="rounded-md bg-error/10 p-3">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      <div className="flex justify-end gap-sm">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}

