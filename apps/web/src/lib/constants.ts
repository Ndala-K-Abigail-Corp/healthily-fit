/**
 * Application-wide constants
 */

/**
 * Route paths
 */
export const ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    SIGNUP: "/auth/signup",
  },
  DASHBOARD: {
    INDEX: "/dashboard",
    PROFILE: "/dashboard/profile",
    PROGRESS: "/dashboard/progress",
    SETTINGS: "/dashboard/settings",
    WORKOUTS: "/dashboard/workouts",
  },
  HOME: "/",
  ONBOARDING: "/onboarding",
} as const;

/**
 * Onboarding step labels
 */
export const ONBOARDING_STEP_LABELS = {
  goals: "Fitness Goals",
  health: "Health Data",
  personal: "Personal Info",
  summary: "Review & Confirm",
} as const;

/**
 * Default values
 */
export const DEFAULTS = {
  BMI_DECIMAL_PLACES: 1,
  CHART_COLORS: {
    ACCENT: "hsl(var(--color-accent))",
    PRIMARY: "hsl(var(--color-primary))",
    SUCCESS: "hsl(var(--color-success))",
  },
  WEIGHT_DECIMAL_PLACES: 1,
} as const;

/**
 * Firestore collection paths
 */
export const FIRESTORE_COLLECTIONS = {
  ACTIVITY_LOGS: "activityLogs",
  EXERCISES: "exercises",
  USERS: "users",
  WORKOUT_PLANS: "workoutPlans",
} as const;

/**
 * Gender display labels
 */
export const GENDER_LABELS = {
  male: "Male",
  female: "Female",
  other: "Other",
  prefer_not_to_say: "Prefer not to say",
} as const;

/**
 * Workout generation constants
 */
export const WORKOUT_CONSTANTS = {
  DEFAULT_WEEKS: 4,
  WORKOUTS_PER_WEEK: 3,
  MIN_EXERCISES_PER_DAY: 4,
  MAX_EXERCISES_PER_DAY: 8,
} as const;

/**
 * Exercise difficulty display labels
 */
export const DIFFICULTY_LABELS = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
} as const;

