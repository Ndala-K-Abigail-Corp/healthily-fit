import { useState } from "react";
import type { Profile } from "@healthily-fit/shared";
import {
  Activity,
  Apple,
  Calendar,
  Edit2,
  Heart,
  Ruler,
  Target,
  TrendingUp,
  Weight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateBMI, getBMICategory, getBMICategoryColor } from "@/lib/bmi-calculator";

import { ProfileEditForm } from "./profile-edit-form";

interface ProfileViewProps {
  profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  const bmi = calculateBMI(profile.weightKg, profile.heightCm);
  const bmiCategory = getBMICategory(bmi);
  const bmiColor = getBMICategoryColor(bmiCategory);

  const formattedGoal = profile.fitnessGoal
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const formattedDiet =
    profile.dietaryPreference.charAt(0).toUpperCase() +
    profile.dietaryPreference.slice(1).replace("_", " ");

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-2xl font-bold">Edit Profile</h2>
          <Button variant="outline" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </div>
        <ProfileEditForm
          profile={profile}
          onSuccess={() => setIsEditing(false)}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold">My Profile</h2>
          <p className="text-neutral-600 mt-sm">
            Your health and fitness information
          </p>
        </div>
        <Button onClick={() => setIsEditing(true)} className="gap-2">
          <Edit2 className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      {/* BMI Overview Card */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold ${bmiColor}`}>
                {bmi.toFixed(1)}
              </div>
              <div className="text-sm text-neutral-600 mt-xs">BMI</div>
              <div className={`text-xs font-medium mt-1 ${bmiColor}`}>
                {bmiCategory}
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-900">
                {profile.weightKg}
              </div>
              <div className="text-sm text-neutral-600 mt-xs">
                Current Weight (kg)
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-neutral-900">
                {profile.targetWeightKg || "—"}
              </div>
              <div className="text-sm text-neutral-600 mt-xs">
                Target Weight (kg)
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Age</p>
                  <p className="font-semibold">{profile.age} years</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Height</p>
                  <p className="font-semibold">{profile.heightCm} cm</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                  <Weight className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Weight</p>
                  <p className="font-semibold">{profile.weightKg} kg</p>
                </div>
              </div>
              {profile.targetWeightKg && (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Goal Weight</p>
                    <p className="font-semibold">{profile.targetWeightKg} kg</p>
                    <p className="text-xs text-neutral-500">
                      {Math.abs(profile.weightKg - profile.targetWeightKg).toFixed(1)} kg{" "}
                      {profile.weightKg > profile.targetWeightKg ? "to lose" : "to gain"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health & Diet Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-error" />
            Health & Diet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
              <Apple className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-neutral-600">Dietary Preference</p>
              <p className="font-semibold">{formattedDiet}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-error" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-neutral-600 mb-2">Health Conditions</p>
              {profile.healthConditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.healthConditions.map((condition) => (
                    <span
                      key={condition}
                      className="px-3 py-1 text-sm bg-error/10 text-error rounded-full"
                    >
                      {condition.charAt(0).toUpperCase() +
                        condition.slice(1).replace("_", " ")}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-neutral-500 italic">None reported</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fitness Goals */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Fitness Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-neutral-600">Primary Goal</p>
              <p className="font-semibold text-lg">{formattedGoal}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

