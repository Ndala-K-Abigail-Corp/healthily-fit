import type { WorkoutPlan, DailyWorkout, WorkoutSet } from "@healthily-fit/shared";

/**
 * Clone a workout plan for editing
 */
export function cloneWorkoutPlan(
  plan: WorkoutPlan,
  customizedFrom?: string
): Omit<WorkoutPlan, "id"> {
  return {
    userId: plan.userId,
    startDate: new Date(plan.startDate),
    endDate: new Date(plan.endDate),
    status: plan.status,
    dailyWorkouts: plan.dailyWorkouts.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((ex) => ({ ...ex })),
    })),
    totalWeeks: plan.totalWeeks,
    generatedAt: new Date(),
    isCustom: true,
    customizedFrom: customizedFrom || plan.id,
    notes: plan.notes,
  };
}

/**
 * Create an empty custom workout plan
 */
export function createEmptyWorkoutPlan(
  userId: string,
  totalWeeks: number = 4
): Omit<WorkoutPlan, "id"> {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + totalWeeks * 7);

  return {
    userId,
    startDate,
    endDate,
    status: "active",
    dailyWorkouts: [],
    totalWeeks,
    generatedAt: new Date(),
    isCustom: true,
    notes: "Custom workout plan",
  };
}

/**
 * Calculate total estimated duration of a workout plan
 */
export function calculatePlanDuration(plan: WorkoutPlan): number {
  return plan.dailyWorkouts.reduce(
    (total, workout) => total + workout.estimatedDurationMinutes,
    0
  );
}

/**
 * Calculate total target calories for a workout plan
 */
export function calculatePlanCalories(plan: WorkoutPlan): number {
  return plan.dailyWorkouts.reduce(
    (total, workout) => total + (workout.targetCalories || 0),
    0
  );
}

/**
 * Get workout by day number
 */
export function getWorkoutByDay(
  plan: WorkoutPlan,
  dayNumber: number
): DailyWorkout | null {
  return plan.dailyWorkouts.find((w) => w.dayNumber === dayNumber) || null;
}

/**
 * Get current week workouts
 */
export function getCurrentWeekWorkouts(
  plan: WorkoutPlan,
  currentDate: Date = new Date()
): DailyWorkout[] {
  const daysSinceStart = Math.floor(
    (currentDate.getTime() - new Date(plan.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const currentWeek = Math.floor(daysSinceStart / 7);

  if (currentWeek < 0 || currentWeek >= plan.totalWeeks) {
    return [];
  }

  const startDay = currentWeek * 3 + 1; // 3 workouts per week
  const endDay = startDay + 3;

  return plan.dailyWorkouts.filter(
    (w) => w.dayNumber >= startDay && w.dayNumber < endDay
  );
}

/**
 * Format workout day of week for display
 */
export function formatDayOfWeek(day: DailyWorkout["dayOfWeek"]): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

/**
 * Format workout date based on plan start date
 */
export function getWorkoutDate(
  plan: WorkoutPlan,
  dayOfWeek: DailyWorkout["dayOfWeek"]
): Date | null {
  const daysMap: Record<DailyWorkout["dayOfWeek"], number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };

  const startDate = new Date(plan.startDate);
  const startDayOfWeek = startDate.getDay();
  const targetDayOfWeek = daysMap[dayOfWeek];

  let daysToAdd = targetDayOfWeek - startDayOfWeek;
  if (daysToAdd < 0) {
    daysToAdd += 7;
  }

  const workoutDate = new Date(startDate);
  workoutDate.setDate(startDate.getDate() + daysToAdd);

  return workoutDate;
}

/**
 * Check if a workout plan is active
 */
export function isPlanActive(plan: WorkoutPlan): boolean {
  if (plan.status !== "active") {
    return false;
  }

  const now = new Date();
  const endDate = new Date(plan.endDate);

  return now <= endDate;
}

/**
 * Check if a workout plan has expired
 */
export function isPlanExpired(plan: WorkoutPlan): boolean {
  const now = new Date();
  const endDate = new Date(plan.endDate);

  return now > endDate;
}

/**
 * Calculate progress percentage of a plan
 */
export function calculatePlanProgress(plan: WorkoutPlan): number {
  const now = new Date();
  const startDate = new Date(plan.startDate);
  const endDate = new Date(plan.endDate);

  if (now < startDate) {
    return 0;
  }

  if (now > endDate) {
    return 100;
  }

  const totalDuration = endDate.getTime() - startDate.getTime();
  const elapsed = now.getTime() - startDate.getTime();

  return Math.round((elapsed / totalDuration) * 100);
}

/**
 * Validate workout plan
 */
export function validateWorkoutPlan(
  plan: Partial<WorkoutPlan>
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!plan.userId) {
    errors.push("User ID is required");
  }

  if (!plan.startDate) {
    errors.push("Start date is required");
  }

  if (!plan.endDate) {
    errors.push("End date is required");
  }

  if (plan.startDate && plan.endDate) {
    if (new Date(plan.endDate) <= new Date(plan.startDate)) {
      errors.push("End date must be after start date");
    }
  }

  if (!plan.dailyWorkouts || plan.dailyWorkouts.length === 0) {
    errors.push("At least one daily workout is required");
  }

  if (plan.dailyWorkouts) {
    plan.dailyWorkouts.forEach((workout, index) => {
      if (!workout.exercises || workout.exercises.length === 0) {
        errors.push(
          `Day ${workout.dayNumber || index + 1} must have at least one exercise`
        );
      }
    });
  }

  if (plan.totalWeeks && plan.totalWeeks < 1) {
    errors.push("Total weeks must be at least 1");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format exercise duration for display
 */
export function formatExerciseDuration(set: WorkoutSet): string {
  if (set.durationMinutes) {
    return `${set.durationMinutes} min`;
  }

  if (set.reps) {
    return `${set.sets} x ${set.reps} reps`;
  }

  return `${set.sets} sets`;
}

/**
 * Get total exercises count in a workout
 */
export function getTotalExercisesCount(workout: DailyWorkout): number {
  return workout.exercises.length;
}

/**
 * Get unique equipment needed for a workout
 */
export function getEquipmentNeeded(
  workout: DailyWorkout,
  exerciseDatabase: Array<{ id: string; equipmentNeeded: string[] }>
): string[] {
  const equipmentSet = new Set<string>();

  workout.exercises.forEach((exercise) => {
    const exerciseData = exerciseDatabase.find(
      (ex) => ex.id === exercise.exerciseId
    );
    if (exerciseData) {
      exerciseData.equipmentNeeded.forEach((eq) => equipmentSet.add(eq));
    }
  });

  return Array.from(equipmentSet);
}

