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

