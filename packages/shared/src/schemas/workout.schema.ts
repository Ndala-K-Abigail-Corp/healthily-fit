import { z } from "zod";

/**
 * Exercise difficulty enum
 */
export const ExerciseDifficultyEnum = z.enum(["beginner", "intermediate", "advanced"]);

/**
 * Exercise schema - global collection
 */
export const ExerciseSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string(),
  videoUrl: z.string().url().optional(),
  targetMuscles: z.array(z.string()),
  difficulty: ExerciseDifficultyEnum,
  contraindications: z.array(z.string()).default([]),
  equipmentNeeded: z.array(z.string()).default([]),
  caloriesPerMinute: z.number().min(0).optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

/**
 * Workout set schema
 */
export const WorkoutSetSchema = z.object({
  exerciseId: z.string(),
  exerciseName: z.string(),
  sets: z.number().int().min(1),
  reps: z.number().int().min(1).optional(),
  durationMinutes: z.number().min(1).optional(),
  restSeconds: z.number().int().min(0).default(60),
  notes: z.string().optional(),
});

export type WorkoutSet = z.infer<typeof WorkoutSetSchema>;

/**
 * Daily workout schema
 */
export const DailyWorkoutSchema = z.object({
  dayNumber: z.number().int().min(1),
  dayOfWeek: z.enum(["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]),
  title: z.string(),
  description: z.string().optional(),
  exercises: z.array(WorkoutSetSchema),
  estimatedDurationMinutes: z.number().min(0),
  targetCalories: z.number().min(0).optional(),
});

export type DailyWorkout = z.infer<typeof DailyWorkoutSchema>;

/**
 * Workout plan status enum
 */
export const WorkoutPlanStatusEnum = z.enum(["active", "completed", "cancelled"]);

/**
 * Workout plan schema - collection: workoutPlans
 */
export const WorkoutPlanSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  status: WorkoutPlanStatusEnum,
  dailyWorkouts: z.array(DailyWorkoutSchema),
  totalWeeks: z.number().int().min(1),
  generatedAt: z.date(),
  notes: z.string().optional(),
});

export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;
export type WorkoutPlanStatus = z.infer<typeof WorkoutPlanStatusEnum>;


