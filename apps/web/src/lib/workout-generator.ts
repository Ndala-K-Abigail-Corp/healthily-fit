import type { Profile, WorkoutPlan, DailyWorkout, WorkoutSet } from "@healthily-fit/shared";
import { calculateBMI, getBMICategory } from "@healthily-fit/shared";
import {
  EXERCISE_DATABASE,
  filterExercisesByConditions,
  filterExercisesByDifficulty,
  getExercisesForAgeGroup,
  getExercisesByType,
  type ExerciseTemplate,
} from "./workout-templates";

/**
<<<<<<< HEAD
 * Determine fitness level based on profile
 */
function determineFitnessLevel(
  profile: Profile
): "beginner" | "intermediate" | "advanced" {
=======
 * Validation result for profile completeness
 */
export interface ProfileValidation {
  isValid: boolean;
  missingFields: string[];
  errors: string[];
}

/**
 * Validate profile before generating workout
 */
export function validateProfileForWorkout(profile: Partial<Profile>): ProfileValidation {
  const missingFields: string[] = [];
  const errors: string[] = [];

  if (!profile.age || profile.age < 13 || profile.age > 120) {
    missingFields.push("age");
    errors.push("Age must be between 13 and 120 years");
  }
  if (!profile.gender) {
    missingFields.push("gender");
    errors.push("Gender is required");
  }
  if (!profile.heightCm || profile.heightCm < 50 || profile.heightCm > 300) {
    missingFields.push("height");
    errors.push("Height must be between 50 and 300 cm");
  }
  if (!profile.weightKg || profile.weightKg < 20 || profile.weightKg > 500) {
    missingFields.push("weight");
    errors.push("Weight must be between 20 and 500 kg");
  }
  if (!profile.fitnessGoal) {
    missingFields.push("fitnessGoal");
    errors.push("Fitness goal is required");
  }
  if (!profile.healthConditions) {
    missingFields.push("healthConditions");
    errors.push("Health conditions information is required");
  }
  if (!profile.dietaryPreference) {
    missingFields.push("dietaryPreference");
    errors.push("Dietary preference is required");
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
    errors,
  };
}

/**
 * Determine fitness level
 */
function determineFitnessLevel(profile: Profile): "beginner" | "intermediate" | "advanced" {
>>>>>>> feature/dashboard
  const bmi = calculateBMI(profile.weightKg, profile.heightCm);
  const bmiCategory = getBMICategory(bmi);
  const age = profile.age;

<<<<<<< HEAD
  // Conservative approach: default to beginner for safety
  if (age >= 65 || profile.healthConditions.length > 1) {
    return "beginner";
  }

  // Overweight/obese or health conditions -> beginner
  if (
    bmiCategory === "Overweight" ||
    bmiCategory === "Obese" ||
    profile.healthConditions.length > 0
  ) {
    return "beginner";
  }

  // Normal weight adults with no conditions can start intermediate
  if (age < 65 && bmiCategory === "Normal weight") {
    return "intermediate";
  }
=======
  if (age >= 65 || profile.healthConditions.length > 1) return "beginner";
  if (bmiCategory === "Overweight" || bmiCategory === "Obese" || profile.healthConditions.length > 0)
    return "beginner";
  if (age < 65 && bmiCategory === "Normal weight") return "intermediate";
>>>>>>> feature/dashboard

  return "beginner";
}

/**
<<<<<<< HEAD
 * Get workout duration based on fitness level and age
 */
function getWorkoutDuration(
  fitnessLevel: "beginner" | "intermediate" | "advanced",
  age: number
): number {
  if (age >= 65) {
    return 20; // Shorter sessions for seniors
  }

  switch (fitnessLevel) {
    case "beginner":
      return 25;
    case "intermediate":
      return 35;
    case "advanced":
      return 45;
=======
 * Workout duration based on fitness level and age
 */
function getWorkoutDuration(fitnessLevel: "beginner" | "intermediate" | "advanced", age: number): number {
  if (age >= 65) return 20;
  switch (fitnessLevel) {
    case "beginner": return 25;
    case "intermediate": return 35;
    case "advanced": return 45;
>>>>>>> feature/dashboard
  }
}

/**
<<<<<<< HEAD
 * Determine exercise mix based on fitness goal
 */
function getExerciseMixForGoal(goal: string): {
  cardio: number;
  strength: number;
  flexibility: number;
} {
  switch (goal) {
    case "weight_loss":
      return { cardio: 60, strength: 30, flexibility: 10 };
    case "muscle_gain":
      return { cardio: 20, strength: 70, flexibility: 10 };
    case "endurance":
      return { cardio: 70, strength: 20, flexibility: 10 };
    case "flexibility":
      return { cardio: 30, strength: 20, flexibility: 50 };
    case "general_health":
    case "maintenance":
    default:
      return { cardio: 40, strength: 40, flexibility: 20 };
=======
 * Exercise mix based on goal
 */
export function getExerciseMixForGoal(goal: string) {
  switch (goal) {
    case "weight_loss": return { cardio: 60, strength: 30, flexibility: 10 };
    case "muscle_gain": return { cardio: 20, strength: 70, flexibility: 10 };
    case "endurance": return { cardio: 70, strength: 20, flexibility: 10 };
    case "flexibility": return { cardio: 30, strength: 20, flexibility: 50 };
    case "general_health":
    case "maintenance":
    default: return { cardio: 40, strength: 40, flexibility: 20 };
>>>>>>> feature/dashboard
  }
}

/**
<<<<<<< HEAD
 * Select exercises based on type and count needed
 */
function selectExercises(
  availableExercises: ExerciseTemplate[],
  type: "cardio" | "strength" | "flexibility" | "balance",
  count: number
): ExerciseTemplate[] {
  const typeExercises = getExercisesByType(availableExercises, type);

  // Shuffle and select
=======
 * Select exercises
 */
function selectExercises(availableExercises: ExerciseTemplate[], type: "cardio" | "strength" | "flexibility" | "balance", count: number) {
  const typeExercises = getExercisesByType(availableExercises, type);
>>>>>>> feature/dashboard
  const shuffled = [...typeExercises].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
<<<<<<< HEAD
 * Create workout sets from exercises
 */
function createWorkoutSets(
  exercises: ExerciseTemplate[],
  fitnessLevel: "beginner" | "intermediate" | "advanced"
): WorkoutSet[] {
  const setsMap = {
    beginner: 2,
    intermediate: 3,
    advanced: 4,
  };

  const repsMap = {
    beginner: 10,
    intermediate: 12,
    advanced: 15,
  };

  const sets = setsMap[fitnessLevel];
  const reps = repsMap[fitnessLevel];

  return exercises.map((exercise) => {
    const isCardio = exercise.type === "cardio";
    const isFlexibility = exercise.type === "flexibility";
=======
 * Create workout sets
 */
function createWorkoutSets(exercises: ExerciseTemplate[], fitnessLevel: "beginner" | "intermediate" | "advanced"): WorkoutSet[] {
  const setsMap = { beginner: 2, intermediate: 3, advanced: 4 };
  const repsMap = { beginner: 10, intermediate: 12, advanced: 15 };
  const sets = setsMap[fitnessLevel];
  const reps = repsMap[fitnessLevel];

 return exercises.map((exercise) => {
    const isCardio = exercise.type === "cardio";
    const isFlexibility = exercise.type === "flexibility";
    let note = exercise.description || "";

    if (fitnessLevel === "beginner" && exercise.modifications?.beginner) note = exercise.modifications.beginner;
    if (fitnessLevel === "advanced" && exercise.modifications?.senior) note = exercise.modifications.senior;
>>>>>>> feature/dashboard

    return {
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: isFlexibility ? 1 : sets,
      reps: isCardio || isFlexibility ? undefined : reps,
      durationMinutes: isCardio ? 5 : isFlexibility ? 3 : undefined,
      restSeconds: isFlexibility ? 0 : fitnessLevel === "beginner" ? 90 : 60,
<<<<<<< HEAD
      notes: exercise.modifications?.[fitnessLevel === "beginner" ? "beginner" : fitnessLevel === "advanced" ? undefined : undefined] || exercise.description,
=======
      notes: note,
>>>>>>> feature/dashboard
    };
  });
}

/**
<<<<<<< HEAD
 * Generate a daily workout
=======
 * Generate daily workout
>>>>>>> feature/dashboard
 */
function generateDailyWorkout(
  dayNumber: number,
  dayOfWeek: DailyWorkout["dayOfWeek"],
  availableExercises: ExerciseTemplate[],
  profile: Profile,
  fitnessLevel: "beginner" | "intermediate" | "advanced"
): DailyWorkout {
<<<<<<< HEAD
  const exerciseMix = getExerciseMixForGoal(profile.fitnessGoal);
  const duration = getWorkoutDuration(fitnessLevel, profile.age);
  const ageGroup = getExercisesForAgeGroup(profile.age);

  // Determine workout type for this day
  const workoutTypes: Array<{
    primary: "cardio" | "strength" | "flexibility";
    secondary?: "cardio" | "strength" | "flexibility";
  }> = [
    { primary: "cardio", secondary: "flexibility" }, // Day 1
    { primary: "strength" }, // Day 2
    { primary: "cardio", secondary: "strength" }, // Day 3
    { primary: "strength", secondary: "flexibility" }, // Day 4
  ];

  const workoutType = workoutTypes[(dayNumber - 1) % workoutTypes.length];

  let selectedExercises: ExerciseTemplate[] = [];

  // Select primary exercises
  if (workoutType.primary === "cardio") {
    selectedExercises.push(
      ...selectExercises(availableExercises, "cardio", 2)
    );
  } else if (workoutType.primary === "strength") {
    selectedExercises.push(
      ...selectExercises(availableExercises, "strength", 4)
    );
  } else if (workoutType.primary === "flexibility") {
    selectedExercises.push(
      ...selectExercises(availableExercises, "flexibility", 5)
    );
  }

  // Add secondary exercises
  if (workoutType.secondary === "strength") {
    selectedExercises.push(
      ...selectExercises(availableExercises, "strength", 2)
    );
  } else if (workoutType.secondary === "flexibility") {
    selectedExercises.push(
      ...selectExercises(availableExercises, "flexibility", 3)
    );
  }

  // Add balance exercises for seniors
  if (ageGroup === "senior") {
    selectedExercises.push(
      ...selectExercises(availableExercises, "balance", 1)
    );
  }

  const workoutSets = createWorkoutSets(selectedExercises, fitnessLevel);

  // Calculate estimated calories
  const estimatedCalories = selectedExercises.reduce((total, exercise) => {
    const sets = workoutSets.find((s) => s.exerciseId === exercise.id);
    const duration =
      sets?.durationMinutes || (sets?.reps ? (sets.reps * sets.sets) / 10 : 5);
    return total + exercise.caloriesPerMinute * duration;
=======
  const duration = getWorkoutDuration(fitnessLevel, profile.age);
  const ageGroup = getExercisesForAgeGroup(profile.age);

  const workoutTypes = [
    { primary: "cardio", secondary: "flexibility" },
    { primary: "strength" },
    { primary: "cardio", secondary: "strength" },
    { primary: "strength", secondary: "flexibility" },
  ];
  const workoutType = workoutTypes[(dayNumber - 1) % workoutTypes.length];

  let selected: ExerciseTemplate[] = [];

  if (workoutType.primary === "cardio") selected.push(...selectExercises(availableExercises, "cardio", 2));
  if (workoutType.primary === "strength") selected.push(...selectExercises(availableExercises, "strength", 4));
  if (workoutType.primary === "flexibility") selected.push(...selectExercises(availableExercises, "flexibility", 5));

  if (workoutType.secondary === "strength") selected.push(...selectExercises(availableExercises, "strength", 2));
  if (workoutType.secondary === "flexibility") selected.push(...selectExercises(availableExercises, "flexibility", 3));
  if (ageGroup === "senior") selected.push(...selectExercises(availableExercises, "balance", 1));

  const workoutSets = createWorkoutSets(selected, fitnessLevel);

  const estimatedCalories = selected.reduce((total, exercise) => {
    const s = workoutSets.find((w) => w.exerciseId === exercise.id);
    const dur = s?.durationMinutes ?? (s?.reps ? (s.reps * s.sets) / 10 : 5);
    return total + exercise.caloriesPerMinute * dur;
>>>>>>> feature/dashboard
  }, 0);

  return {
    dayNumber,
    dayOfWeek,
    title: `${workoutType.primary.charAt(0).toUpperCase() + workoutType.primary.slice(1)}${workoutType.secondary ? ` & ${workoutType.secondary.charAt(0).toUpperCase() + workoutType.secondary.slice(1)}` : ""} Day`,
<<<<<<< HEAD
    description: `Focus on ${workoutType.primary} with ${workoutType.secondary ? workoutType.secondary : "recovery"} exercises`,
    exercises: workoutSets,
    estimatedDurationMinutes: duration,
    targetCalories: Math.round(estimatedCalories),
  };
}

/**
 * Generate a complete workout plan for a user profile
 */
export function generateWorkoutPlan(profile: Profile): Omit<WorkoutPlan, "id"> {
  // Determine fitness level
  const fitnessLevel = determineFitnessLevel(profile);
  const ageGroup = getExercisesForAgeGroup(profile.age);

  // Filter exercises based on profile
  let availableExercises = EXERCISE_DATABASE.filter((ex) =>
    ex.ageGroups.includes(ageGroup)
  );

  // Filter by health conditions
  availableExercises = filterExercisesByConditions(
    availableExercises,
    profile.healthConditions as string[]
  );

  // Filter by difficulty
  availableExercises = filterExercisesByDifficulty(
    availableExercises,
    fitnessLevel
  );

  // Generate 4-week plan (12 workouts, 3 per week)
  const totalWeeks = 4;
  const workoutsPerWeek = 3;
  const daysOfWeek: DailyWorkout["dayOfWeek"][] = [
    "monday",
    "wednesday",
    "friday",
  ];
=======
    description: `Focus on ${workoutType.primary} with ${workoutType.secondary ?? "recovery"} exercises`,
    exercises: workoutSets,
    estimatedDurationMinutes: duration ?? 0,
    targetCalories: Math.round(estimatedCalories) ?? 0,
  };
}
/**
 * Clean object for Firestore (replace undefined with null)
 */
export function cleanForFirestore<T>(obj: T): T {
  const sanitize = (value: any): any => {
    if (value === undefined) return null;
    if (value === null) return null;
    if (value instanceof Date) return value; // Preserve Date objects!
    if (Array.isArray(value)) return value.map(sanitize);
    if (typeof value === "object") {
      const newObj: any = {};
      for (const k in value) {
        newObj[k] = sanitize(value[k]);
      }
      return newObj;
    }
    return value;
  };
  return sanitize(obj);
}
/**
 * Generate workout plan
 */
export function generateWorkoutPlan(profile: Profile): Omit<WorkoutPlan, "id"> {
  const fitnessLevel = determineFitnessLevel(profile);
  const ageGroup = getExercisesForAgeGroup(profile.age);

  let availableExercises = EXERCISE_DATABASE.filter((ex) => ex.ageGroups.includes(ageGroup));
  availableExercises = filterExercisesByConditions(availableExercises, profile.healthConditions as string[]);
  availableExercises = filterExercisesByDifficulty(availableExercises, fitnessLevel);

  const totalWeeks = 4;
  const workoutsPerWeek = 3;
  const daysOfWeek: DailyWorkout["dayOfWeek"][] = ["monday", "wednesday", "friday"];
>>>>>>> feature/dashboard

  const dailyWorkouts: DailyWorkout[] = [];

  for (let week = 0; week < totalWeeks; week++) {
    for (let day = 0; day < workoutsPerWeek; day++) {
      const dayNumber = week * workoutsPerWeek + day + 1;
<<<<<<< HEAD
      const dayOfWeek = daysOfWeek[day];

      dailyWorkouts.push(
        generateDailyWorkout(
          dayNumber,
          dayOfWeek,
          availableExercises,
          profile,
          fitnessLevel
        )
=======
      dailyWorkouts.push(
        generateDailyWorkout(dayNumber, daysOfWeek[day], availableExercises, profile, fitnessLevel)
>>>>>>> feature/dashboard
      );
    }
  }

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + totalWeeks * 7);

<<<<<<< HEAD
  return {
=======
  const plan: Omit<WorkoutPlan, "id"> = {
>>>>>>> feature/dashboard
    userId: profile.userId,
    startDate,
    endDate,
    status: "active",
    dailyWorkouts,
    totalWeeks,
    generatedAt: new Date(),
    isCustom: false,
    notes: `Personalized ${fitnessLevel} level workout plan for ${profile.fitnessGoal.replace("_", " ")} goal`,
  };
<<<<<<< HEAD
}

/**
 * Regenerate workout plan with different exercises
 */
export function regenerateWorkoutPlan(profile: Profile): Omit<WorkoutPlan, "id"> {
  // Same as generate but with different random seed
  return generateWorkoutPlan(profile);
}

=======

  return cleanForFirestore(plan);
}

/**
 * Regenerate workout plan
 */
export function regenerateWorkoutPlan(profile: Profile): Omit<WorkoutPlan, "id"> {
  return generateWorkoutPlan(profile);
}
>>>>>>> feature/dashboard
