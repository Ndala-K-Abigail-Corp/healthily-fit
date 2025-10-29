import { z } from "zod";

/**
 * Activity type enum
 */
export const ActivityTypeEnum = z.enum([
  "workout",
  "cardio",
  "strength",
  "flexibility",
  "sports",
  "other",
]);

/**
 * Activity log schema - collection: activityLogs
 */
export const ActivityLogSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  date: z.date(),
  type: ActivityTypeEnum,
  durationMinutes: z.number().min(1),
  caloriesBurned: z.number().min(0).optional(),
  workoutPlanId: z.string().optional(),
  exercisesCompleted: z.array(z.string()).default([]),
  notes: z.string().optional(),
  weightKg: z.number().min(20).max(500).optional(), // Weight at time of activity
  createdAt: z.date(),
});

export type ActivityLog = z.infer<typeof ActivityLogSchema>;
export type ActivityType = z.infer<typeof ActivityTypeEnum>;

/**
 * Activity log input schema (without server-managed fields)
 */
export const ActivityLogInputSchema = ActivityLogSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
});

export type ActivityLogInput = z.infer<typeof ActivityLogInputSchema>;

/**
 * Progress history range enum
 */
export const ProgressRangeEnum = z.enum(["7d", "30d", "90d"]);

export type ProgressRange = z.infer<typeof ProgressRangeEnum>;

/**
 * Progress data point schema
 */
export const ProgressDataPointSchema = z.object({
  date: z.date(),
  weightKg: z.number(),
  bmi: z.number().optional(),
});

export type ProgressDataPoint = z.infer<typeof ProgressDataPointSchema>;


