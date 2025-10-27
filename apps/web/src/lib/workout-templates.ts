import type { ExerciseDifficultyEnum } from "@healthily-fit/shared";
import { z } from "zod";

/**
 * Exercise template for workout generation
 */
export interface ExerciseTemplate {
  id: string;
  name: string;
  description: string;
  targetMuscles: string[];
  difficulty: z.infer<typeof ExerciseDifficultyEnum>;
  contraindications: string[]; // Health conditions that should avoid this
  equipmentNeeded: string[];
  caloriesPerMinute: number;
  type: "cardio" | "strength" | "flexibility" | "balance";
  ageGroups: ("youth" | "adult" | "senior")[];
  modifications?: {
    beginner?: string;
    senior?: string;
  };
}

/**
 * Base exercise database
 */
export const EXERCISE_DATABASE: ExerciseTemplate[] = [
  // Cardio exercises
  {
    id: "walking",
    name: "Brisk Walking",
    description: "Walk at a brisk pace, maintaining good posture",
    targetMuscles: ["legs", "cardiovascular"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 4,
    type: "cardio",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      senior: "Walk at a comfortable pace, use walking poles if needed",
    },
  },
  {
    id: "jogging",
    name: "Light Jogging",
    description: "Jog at a comfortable pace",
    targetMuscles: ["legs", "cardiovascular"],
    difficulty: "intermediate",
    contraindications: ["knee_issues", "arthritis", "heart_disease"],
    equipmentNeeded: [],
    caloriesPerMinute: 7,
    type: "cardio",
    ageGroups: ["youth", "adult"],
  },
  {
    id: "jumping_jacks",
    name: "Jumping Jacks",
    description: "Full body cardio with coordinated arm and leg movements",
    targetMuscles: ["full_body", "cardiovascular"],
    difficulty: "beginner",
    contraindications: ["knee_issues", "back_pain", "heart_disease"],
    equipmentNeeded: [],
    caloriesPerMinute: 8,
    type: "cardio",
    ageGroups: ["youth", "adult"],
  },
  {
    id: "high_knees",
    name: "High Knees",
    description: "Run in place bringing knees up to waist level",
    targetMuscles: ["legs", "core", "cardiovascular"],
    difficulty: "intermediate",
    contraindications: ["knee_issues", "hip_issues", "heart_disease"],
    equipmentNeeded: [],
    caloriesPerMinute: 9,
    type: "cardio",
    ageGroups: ["youth", "adult"],
  },
  {
    id: "marching",
    name: "Marching in Place",
    description: "March in place with controlled movements",
    targetMuscles: ["legs", "cardiovascular"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 3,
    type: "cardio",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "step_ups",
    name: "Step-Ups",
    description: "Step up and down on a stable platform",
    targetMuscles: ["legs", "glutes"],
    difficulty: "beginner",
    contraindications: ["knee_issues", "balance_issues"],
    equipmentNeeded: ["step_platform"],
    caloriesPerMinute: 6,
    type: "cardio",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      senior: "Use a lower step and handrail for support",
    },
  },
  {
    id: "burpees",
    name: "Burpees",
    description: "Full body exercise combining squat, plank, and jump",
    targetMuscles: ["full_body"],
    difficulty: "advanced",
    contraindications: ["knee_issues", "back_pain", "heart_disease", "hypertension"],
    equipmentNeeded: [],
    caloriesPerMinute: 10,
    type: "cardio",
    ageGroups: ["youth", "adult"],
  },

  // Strength exercises - Upper body
  {
    id: "pushups",
    name: "Push-Ups",
    description: "Classic upper body strength exercise",
    targetMuscles: ["chest", "shoulders", "triceps", "core"],
    difficulty: "intermediate",
    contraindications: ["shoulder_issues", "wrist_pain"],
    equipmentNeeded: [],
    caloriesPerMinute: 7,
    type: "strength",
    ageGroups: ["youth", "adult"],
    modifications: {
      beginner: "Perform on knees or against a wall",
      senior: "Wall push-ups or counter push-ups",
    },
  },
  {
    id: "wall_pushups",
    name: "Wall Push-Ups",
    description: "Standing push-ups against a wall",
    targetMuscles: ["chest", "shoulders", "arms"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 3,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "arm_circles",
    name: "Arm Circles",
    description: "Circular arm movements for shoulder mobility",
    targetMuscles: ["shoulders"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "bicep_curls",
    name: "Bicep Curls",
    description: "Arm curls with light weights or resistance",
    targetMuscles: ["biceps"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: ["dumbbells"],
    caloriesPerMinute: 4,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      beginner: "Use water bottles or light weights",
    },
  },
  {
    id: "tricep_dips",
    name: "Tricep Dips",
    description: "Dips using a chair or bench",
    targetMuscles: ["triceps", "shoulders"],
    difficulty: "intermediate",
    contraindications: ["shoulder_issues", "wrist_pain"],
    equipmentNeeded: ["chair"],
    caloriesPerMinute: 5,
    type: "strength",
    ageGroups: ["youth", "adult"],
  },

  // Strength exercises - Lower body
  {
    id: "squats",
    name: "Squats",
    description: "Lower body strength exercise targeting legs and glutes",
    targetMuscles: ["quads", "glutes", "hamstrings"],
    difficulty: "beginner",
    contraindications: ["knee_issues", "back_pain"],
    equipmentNeeded: [],
    caloriesPerMinute: 5,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      beginner: "Use a chair for support or partial squats",
      senior: "Chair-assisted squats",
    },
  },
  {
    id: "lunges",
    name: "Lunges",
    description: "Alternating forward lunges",
    targetMuscles: ["quads", "glutes", "hamstrings"],
    difficulty: "intermediate",
    contraindications: ["knee_issues", "balance_issues"],
    equipmentNeeded: [],
    caloriesPerMinute: 6,
    type: "strength",
    ageGroups: ["youth", "adult"],
  },
  {
    id: "calf_raises",
    name: "Calf Raises",
    description: "Rise up on toes to strengthen calves",
    targetMuscles: ["calves"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 3,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "leg_raises",
    name: "Leg Raises",
    description: "Lying or standing leg raises",
    targetMuscles: ["hip_flexors", "core"],
    difficulty: "beginner",
    contraindications: ["back_pain"],
    equipmentNeeded: [],
    caloriesPerMinute: 4,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "glute_bridges",
    name: "Glute Bridges",
    description: "Lying hip raises to strengthen glutes",
    targetMuscles: ["glutes", "hamstrings", "lower_back"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 4,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
  },

  // Core exercises
  {
    id: "planks",
    name: "Plank Hold",
    description: "Hold plank position engaging core muscles",
    targetMuscles: ["core", "shoulders"],
    difficulty: "intermediate",
    contraindications: ["back_pain", "shoulder_issues"],
    equipmentNeeded: [],
    caloriesPerMinute: 5,
    type: "strength",
    ageGroups: ["youth", "adult"],
    modifications: {
      beginner: "Plank on knees or against elevated surface",
    },
  },
  {
    id: "bird_dog",
    name: "Bird Dog",
    description: "Opposite arm and leg extensions from hands and knees",
    targetMuscles: ["core", "back", "balance"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 3,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "dead_bug",
    name: "Dead Bug",
    description: "Lying core exercise with opposite arm and leg movements",
    targetMuscles: ["core"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 3,
    type: "strength",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "seated_twists",
    name: "Seated Torso Twists",
    description: "Seated rotation for core and obliques",
    targetMuscles: ["obliques", "core"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },

  // Flexibility exercises
  {
    id: "hamstring_stretch",
    name: "Hamstring Stretch",
    description: "Seated or standing hamstring stretch",
    targetMuscles: ["hamstrings"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "quad_stretch",
    name: "Quadriceps Stretch",
    description: "Standing quad stretch",
    targetMuscles: ["quads"],
    difficulty: "beginner",
    contraindications: ["balance_issues"],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      senior: "Use wall for balance support",
    },
  },
  {
    id: "shoulder_stretch",
    name: "Shoulder Stretch",
    description: "Cross-body shoulder stretch",
    targetMuscles: ["shoulders"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "neck_rolls",
    name: "Gentle Neck Rolls",
    description: "Slow, controlled neck rotations",
    targetMuscles: ["neck"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 1,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "cat_cow",
    name: "Cat-Cow Stretch",
    description: "Spinal mobility exercise on hands and knees",
    targetMuscles: ["spine", "core"],
    difficulty: "beginner",
    contraindications: [],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },
  {
    id: "child_pose",
    name: "Child's Pose",
    description: "Restorative yoga pose for back and shoulders",
    targetMuscles: ["back", "shoulders"],
    difficulty: "beginner",
    contraindications: ["knee_issues"],
    equipmentNeeded: [],
    caloriesPerMinute: 1,
    type: "flexibility",
    ageGroups: ["youth", "adult", "senior"],
  },

  // Balance exercises (especially for seniors)
  {
    id: "single_leg_stand",
    name: "Single Leg Stand",
    description: "Stand on one leg for balance",
    targetMuscles: ["legs", "core"],
    difficulty: "beginner",
    contraindications: ["balance_issues"],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "balance",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      senior: "Hold onto chair or wall for support",
    },
  },
  {
    id: "heel_to_toe_walk",
    name: "Heel-to-Toe Walk",
    description: "Walk in a straight line placing heel directly in front of toe",
    targetMuscles: ["legs", "core"],
    difficulty: "beginner",
    contraindications: ["balance_issues"],
    equipmentNeeded: [],
    caloriesPerMinute: 2,
    type: "balance",
    ageGroups: ["youth", "adult", "senior"],
    modifications: {
      senior: "Walk near a wall for support",
    },
  },
];

/**
 * Filter exercises by age group
 */
export function getExercisesForAgeGroup(
  age: number
): ("youth" | "adult" | "senior") {
  if (age < 18) return "youth";
  if (age < 65) return "adult";
  return "senior";
}

/**
 * Filter exercises by health conditions
 */
export function filterExercisesByConditions(
  exercises: ExerciseTemplate[],
  conditions: string[]
): ExerciseTemplate[] {
  if (conditions.length === 0 || conditions.includes("none")) {
    return exercises;
  }

  return exercises.filter((exercise) => {
    // Check if any contraindication matches user's conditions
    return !exercise.contraindications.some((contra) =>
      conditions.includes(contra)
    );
  });
}

/**
 * Filter exercises by difficulty
 */
export function filterExercisesByDifficulty(
  exercises: ExerciseTemplate[],
  maxDifficulty: "beginner" | "intermediate" | "advanced"
): ExerciseTemplate[] {
  const difficultyLevels = {
    beginner: 1,
    intermediate: 2,
    advanced: 3,
  };

  const maxLevel = difficultyLevels[maxDifficulty];

  return exercises.filter(
    (exercise) => difficultyLevels[exercise.difficulty] <= maxLevel
  );
}

/**
 * Get exercises by type
 */
export function getExercisesByType(
  exercises: ExerciseTemplate[],
  type: "cardio" | "strength" | "flexibility" | "balance"
): ExerciseTemplate[] {
  return exercises.filter((exercise) => exercise.type === type);
}

