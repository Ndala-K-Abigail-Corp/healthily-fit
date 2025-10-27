import React, { createContext, useContext, useEffect, useState } from "react";

import type { ActivityLog, ActivityLogInput } from "@healthily-fit/shared";

import { useAuthContext } from "./auth-context";
import {
  createActivityLog,
  fetchActivityLogs,
  updateActivityLog,
  deleteActivityLog,
} from "@/lib/firestore";

interface ActivityContextValue {
  activityLogs: ActivityLog[];
  isLoading: boolean;
  error: string | null;
  logWorkoutCompletion: (
    workoutPlanId: string,
    dayNumber: number,
    exercisesCompleted: string[],
    caloriesBurned: number,
    durationMinutes: number,
    weightKg?: number
  ) => Promise<ActivityLog>;
  logExerciseCompletion: (
    workoutPlanId: string,
    dayNumber: number,
    exerciseId: string
  ) => Promise<void>;
  fetchUserActivities: (startDate?: Date, endDate?: Date) => Promise<void>;
  isWorkoutDayCompleted: (workoutPlanId: string, dayNumber: number) => boolean;
  getCompletedExercisesForDay: (workoutPlanId: string, dayNumber: number) => string[];
  refreshActivities: () => Promise<void>;
}

const ActivityContext = createContext<ActivityContextValue | undefined>(
  undefined
);

export function ActivityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch activities when user changes
  useEffect(() => {
    if (user) {
      fetchUserActivities();
    } else {
      setActivityLogs([]);
    }
  }, [user?.uid]);

  const fetchUserActivities = async (startDate?: Date, endDate?: Date) => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const logs = await fetchActivityLogs(user.uid, startDate, endDate);
      setActivityLogs(logs);
    } catch (err: any) {
      console.error("Error fetching activities:", err);
      setError(err.message || "Failed to fetch activities");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshActivities = async () => {
    await fetchUserActivities();
  };

  const logWorkoutCompletion = async (
    workoutPlanId: string,
    dayNumber: number,
    exercisesCompleted: string[],
    caloriesBurned: number,
    durationMinutes: number,
    weightKg?: number
  ): Promise<ActivityLog> => {
    if (!user) throw new Error("User must be logged in");

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
        weightKg,
      };

      const newLog = await createActivityLog(user.uid, logInput);
      setActivityLogs((prev) => [newLog, ...prev]);

      return newLog;
    } catch (err: any) {
      console.error("Error logging workout completion:", err);
      setError(err.message || "Failed to log workout");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logExerciseCompletion = async (
    workoutPlanId: string,
    dayNumber: number,
    exerciseId: string
  ): Promise<void> => {
    if (!user) throw new Error("User must be logged in");

    try {
      setIsLoading(true);
      setError(null);

      // Find existing log for this workout day
      const existingLog = activityLogs.find(
        (log) =>
          log.workoutPlanId === workoutPlanId &&
          log.notes?.includes(`Day ${dayNumber}`)
      );

      if (existingLog) {
        // Update existing log with new exercise
        const updatedExercises = existingLog.exercisesCompleted.includes(exerciseId)
          ? existingLog.exercisesCompleted
          : [...existingLog.exercisesCompleted, exerciseId];

        const updated = await updateActivityLog(existingLog.id, {
          exercisesCompleted: updatedExercises,
        });

        setActivityLogs((prev) =>
          prev.map((log) => (log.id === updated.id ? updated : log))
        );
      } else {
        // Create new partial log
        const logInput: ActivityLogInput = {
          date: new Date(),
          type: "workout",
          durationMinutes: 0, // Will be updated when fully completed
          workoutPlanId,
          exercisesCompleted: [exerciseId],
          notes: `Partial completion - Day ${dayNumber}`,
        };

        const newLog = await createActivityLog(user.uid, logInput);
        setActivityLogs((prev) => [newLog, ...prev]);
      }
    } catch (err: any) {
      console.error("Error logging exercise completion:", err);
      setError(err.message || "Failed to log exercise");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const isWorkoutDayCompleted = (
    workoutPlanId: string,
    dayNumber: number
  ): boolean => {
    return activityLogs.some(
      (log) =>
        log.workoutPlanId === workoutPlanId &&
        log.notes?.includes(`Day ${dayNumber}`) &&
        !log.notes?.includes("Partial")
    );
  };

  const getCompletedExercisesForDay = (
    workoutPlanId: string,
    dayNumber: number
  ): string[] => {
    const log = activityLogs.find(
      (log) =>
        log.workoutPlanId === workoutPlanId &&
        log.notes?.includes(`Day ${dayNumber}`)
    );

    return log?.exercisesCompleted || [];
  };

  const value: ActivityContextValue = {
    activityLogs,
    isLoading,
    error,
    logWorkoutCompletion,
    logExerciseCompletion,
    fetchUserActivities,
    isWorkoutDayCompleted,
    getCompletedExercisesForDay,
    refreshActivities,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivityContext() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error("useActivityContext must be used within an ActivityProvider");
  }
  return context;
}

