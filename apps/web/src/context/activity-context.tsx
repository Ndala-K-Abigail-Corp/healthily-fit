import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from "react";
import type { ActivityLog, ActivityLogInput } from "@healthily-fit/shared";
import { createActivityLog } from "@/lib/firestore"; // adjust the import path
import { useAuthContext } from "./auth-context";

interface ActivityContextType {
  activityLogs: ActivityLog[];
  logWorkoutCompletion: (
    workoutPlanId: string,
    dayNumber: number,
    exercisesCompleted: string[],
    caloriesBurned: number,
    durationMinutes: number,
    weightKg?: number
  ) => Promise<ActivityLog>;
  isWorkoutDayCompleted: (workoutPlanId: string, dayNumber: number) => boolean;
  getCompletedExercisesForDay: (workoutPlanId: string, dayNumber: number) => string[];
  isLoading: boolean;
  error: string | null;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

export const ActivityProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthContext();
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear activity logs when user logs out
  useEffect(() => {
    if (!user) {
      setActivityLogs([]);
      setError(null);
      setIsLoading(false);
    }
  }, [user]);

  const logWorkoutCompletion = useCallback(async (
    workoutPlanId: string,
    dayNumber: number,
    exercisesCompleted: string[],
    caloriesBurned: number,
    durationMinutes: number,
    weightKg?: number
  ): Promise<ActivityLog> => {
    if (!user) throw new Error("User must be logged in");

    if (exercisesCompleted.length === 0) throw new Error("At least one exercise must be completed");
    if (caloriesBurned <= 0) throw new Error("Calories burned must be greater than 0");
    if (durationMinutes <= 0) throw new Error("Duration must be greater than 0 minutes");
    if (weightKg !== undefined && weightKg <= 0) throw new Error("Weight (kg) must be greater than 0");

    try {
      setIsLoading(true);
      setError(null);

      const logInput: ActivityLogInput = {
        date: new Date(),
        type: "workout",
        durationMinutes,
        caloriesBurned,
        workoutPlanId,
        exercisesCompleted,
        notes: `Completed Day ${dayNumber}`,
        weightKg: weightKg,
      };

      const newLog = await createActivityLog(user.uid, logInput);
      setActivityLogs((prev) => [newLog, ...prev]);

      return newLog;
    } catch (err: any) {
      console.error("Error logging workout completion:", err);
      setError(err?.message ?? "Failed to log workout");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const isWorkoutDayCompleted = useCallback((workoutPlanId: string, dayNumber: number): boolean => {
    return activityLogs.some(
      (log) =>
        log.type === "workout" &&
        log.workoutPlanId === workoutPlanId &&
        log.notes?.includes(`Day ${dayNumber}`)
    );
  }, [activityLogs]);

  const getCompletedExercisesForDay = useCallback((workoutPlanId: string, dayNumber: number): string[] => {
    const log = activityLogs.find(
      (log) =>
        log.type === "workout" &&
        log.workoutPlanId === workoutPlanId &&
        log.notes?.includes(`Day ${dayNumber}`)
    );
    return log?.exercisesCompleted || [];
  }, [activityLogs]);

  const value = useMemo(() => ({ 
    activityLogs, 
    logWorkoutCompletion, 
    isWorkoutDayCompleted, 
    getCompletedExercisesForDay,
    isLoading, 
    error 
  }), [activityLogs, logWorkoutCompletion, isWorkoutDayCompleted, getCompletedExercisesForDay, isLoading, error]);

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
};

// ✅ Hook to use the context
export const useActivityContext = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error("useActivityContext must be used within ActivityProvider");
  }
  return context;
};
