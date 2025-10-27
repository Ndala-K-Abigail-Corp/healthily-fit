import type { ProfileInput } from "@healthily-fit/shared";
import { Activity, Apple, Heart, Target, TrendingUp, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { calculateBMI, getBMICategory } from "@/lib/bmi-calculator";

interface StepSummaryProps {
  data: Partial<ProfileInput>;
  isSubmitting: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

export function StepSummary({
  data,
  isSubmitting,
  onBack,
  onSubmit,
}: StepSummaryProps) {
  const bmi =
    data.weightKg && data.heightCm
      ? calculateBMI(data.weightKg, data.heightCm)
      : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Review Your Profile</h2>
          <p className="text-neutral-600 mt-sm">
            Please review your information before submitting
          </p>
        </div>

        {/* Personal Info Card */}
        <Card>
          <CardContent className="pt-lg space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <User className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Personal Information</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-neutral-600">Age</p>
                <p className="font-medium">{data.age} years</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Gender</p>
                <p className="font-medium">
                  {data.gender === "prefer_not_to_say"
                    ? "Prefer not to say"
                    : data.gender
                    ? data.gender.charAt(0).toUpperCase() +
                      data.gender.slice(1)
                    : "Not specified"}
                </p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Height</p>
                <p className="font-medium">{data.heightCm} cm</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Weight</p>
                <p className="font-medium">{data.weightKg} kg</p>
              </div>
              {bmi && (
                <div>
                  <p className="text-sm text-neutral-600">BMI</p>
                  <p className="font-medium">
                    {bmi.toFixed(1)} - {bmiCategory}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Health Info Card */}
        <Card>
          <CardContent className="pt-lg space-y-4">
            <div className="flex items-center gap-2 text-accent">
              <Heart className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Health Information</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600">Dietary Preference</p>
                <div className="flex items-center gap-2 mt-1">
                  <Apple className="w-4 h-4 text-success" />
                  <p className="font-medium">
                    {data.dietaryPreference
                      ? data.dietaryPreference
                          .charAt(0)
                          .toUpperCase() +
                        data.dietaryPreference.slice(1).replace("_", " ")
                      : "Not specified"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Health Conditions</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {data.healthConditions && data.healthConditions.length > 0 ? (
                    data.healthConditions.map((condition) => (
                      <span
                        key={condition}
                        className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-md"
                      >
                        {condition.charAt(0).toUpperCase() +
                          condition.slice(1).replace("_", " ")}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-neutral-500 italic">
                      None selected
                    </p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fitness Goals Card */}
        <Card>
          <CardContent className="pt-lg space-y-4">
            <div className="flex items-center gap-2 text-success">
              <Target className="w-5 h-5" />
              <h3 className="font-semibold text-lg">Fitness Goals</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600">Primary Goal</p>
                <div className="flex items-center gap-2 mt-1">
                  <Activity className="w-4 h-4 text-primary" />
                  <p className="font-medium">
                    {data.fitnessGoal
                      ? data.fitnessGoal.charAt(0).toUpperCase() +
                        data.fitnessGoal.slice(1).replace("_", " ")
                      : "Not specified"}
                  </p>
                </div>
              </div>
              {data.targetWeightKg && (
                <div>
                  <p className="text-sm text-neutral-600">Target Weight</p>
                  <div className="flex items-center gap-2 mt-1">
                    <TrendingUp className="w-4 h-4 text-success" />
                    <p className="font-medium">{data.targetWeightKg} kg</p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating Profile..." : "Complete Profile"}
        </Button>
      </div>
    </div>
  );
}

