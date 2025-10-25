import { z } from "zod";

/**
 * Health conditions enum
 */
export const HealthConditionEnum = z.enum([
  "none",
  "diabetes",
  "hypertension",
  "heart_disease",
  "asthma",
  "arthritis",
  "back_pain",
  "knee_issues",
  "other",
]);

/**
 * Dietary preference enum
 */
export const DietaryPreferenceEnum = z.enum([
  "omnivore",
  "vegetarian",
  "vegan",
  "pescatarian",
  "keto",
  "paleo",
  "other",
]);

/**
 * Fitness goal enum
 */
export const FitnessGoalEnum = z.enum([
  "weight_loss",
  "muscle_gain",
  "maintenance",
  "endurance",
  "flexibility",
  "general_health",
]);

/**
 * Profile schema - stored in users/{uid}/profile/main
 */
export const ProfileSchema = z.object({
  userId: z.string().min(1),
  age: z.number().int().min(13).max(120),
  heightCm: z.number().min(50).max(300),
  weightKg: z.number().min(20).max(500),
  healthConditions: z.array(HealthConditionEnum),
  dietaryPreference: DietaryPreferenceEnum,
  fitnessGoal: FitnessGoalEnum,
  targetWeightKg: z.number().min(20).max(500).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Profile = z.infer<typeof ProfileSchema>;
export type HealthCondition = z.infer<typeof HealthConditionEnum>;
export type DietaryPreference = z.infer<typeof DietaryPreferenceEnum>;
export type FitnessGoal = z.infer<typeof FitnessGoalEnum>;

/**
 * Profile input schema for creation/update (without server-managed fields)
 */
export const ProfileInputSchema = ProfileSchema.omit({
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type ProfileInput = z.infer<typeof ProfileInputSchema>;


