import React, { createContext, useContext, useEffect, useState } from "react";
import type { WorkoutPlan } from "@healthily-fit/shared";
import { useAuthContext } from "./auth-context";
import { useProfileContext } from "./profile-context";
import {
  createWorkoutPlan as createWorkoutPlanFirestore,
  deleteWorkoutPlan as deleteWorkoutPlanFirestore,
  fetchWorkoutPlans,
  getSafeProfileForWorkout,
  updateWorkoutPlan as updateWorkoutPlanFirestore,
} from "../lib/firestore";
import { generateWorkoutPlan } from "../lib/workout-generator";

interface WorkoutContextValue {
  activePlan: WorkoutPlan | null;
  allPlans: WorkoutPlan[];
  createCustomPlan: (plan: Omit<WorkoutPlan, "id">) => Promise<WorkoutPlan>;
  deletePlan: (planId: string) => Promise<void>;
  error: string | null;
  generatePlan: () => Promise<WorkoutPlan>;
  isLoading: boolean;
  refreshPlans: () => Promise<void>;
  updatePlan: (
    planId: string,
    updates: Partial<Omit<WorkoutPlan, "id" | "userId">>
  ) => Promise<WorkoutPlan>;
}

const WorkoutContext = createContext<WorkoutContextValue | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const { profile } = useProfileContext();

  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);
  const [allPlans, setAllPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user && profile) {
      refreshPlans();
    } else {
      setActivePlan(null);
      setAllPlans([]);
    }
  }, [user, profile]);

  const refreshPlans = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError(null);
      const plans = await fetchWorkoutPlans(user.uid);
      setAllPlans(plans);

      const active = plans.find((p) => p.status === "active") || null;
      setActivePlan(active);
    } catch (err: any) {
      console.error("Error refreshing plans:", err);
      setError(err.message || "Failed to load workout plans");
    } finally {
      setIsLoading(false);
    }
  };

  const generatePlan = async (): Promise<WorkoutPlan> => {
    if (!user || !profile) {
      throw new Error("User and profile must be available to generate plan");
    }

    try {
      setIsLoading(true);
      setError(null);

      // Validate profile before generation
      const { validation } = await getSafeProfileForWorkout(user.uid);

      if (!validation.isValid) {
        const errorMessage = `Please complete your profile before generating a workout plan:\n${validation.errors.join(
          "\n"
        )}`;
        setError(errorMessage);
        throw new Error(errorMessage);
      }

      // Archive the current active plan if it exists
      if (activePlan) {
        await updateWorkoutPlanFirestore(activePlan.id, { status: "cancelled" });
      }

      // Generate plan from profile (age, gender, height, weight, diet, health conditions, goals)
      const generatedPlan = generateWorkoutPlan(profile);

      // Save to Firestore client-side
      const savedPlan = await createWorkoutPlanFirestore(user.uid, generatedPlan);

      setActivePlan(savedPlan);
      setAllPlans((prev) => 
        prev.map((p) => p.id === activePlan?.id ? { ...p, status: "cancelled" as const } : p)
           .concat(savedPlan)
      );

      return savedPlan;
    } catch (err: any) {
      console.error("Error generating plan:", err);
      setError(err.message || "Failed to generate workout plan");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createCustomPlan = async (
    plan: Omit<WorkoutPlan, "id">
  ): Promise<WorkoutPlan> => {
    if (!user) throw new Error("User must be logged in to create a plan");

    try {
      setIsLoading(true);
      setError(null);

      const savedPlan = await createWorkoutPlanFirestore(user.uid, plan);

      setAllPlans((prev) => [...prev, savedPlan]);
      if (savedPlan.status === "active") setActivePlan(savedPlan);

      return savedPlan;
    } catch (err: any) {
      console.error("Error creating custom plan:", err);
      setError(err.message || "Failed to create workout plan");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePlan = async (
    planId: string,
    updates: Partial<Omit<WorkoutPlan, "id" | "userId">>
  ): Promise<WorkoutPlan> => {
    try {
      setIsLoading(true);
      setError(null);

      const updatedPlan = await updateWorkoutPlanFirestore(planId, updates);

      setAllPlans((prev) =>
        prev.map((p) => (p.id === planId ? updatedPlan : p))
      );

      if (activePlan?.id === planId) setActivePlan(updatedPlan);

      return updatedPlan;
    } catch (err: any) {
      console.error("Error updating plan:", err);
      setError(err.message || "Failed to update workout plan");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePlan = async (planId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      await deleteWorkoutPlanFirestore(planId);

      setAllPlans((prev) => prev.filter((p) => p.id !== planId));
      if (activePlan?.id === planId) setActivePlan(null);
    } catch (err: any) {
      console.error("Error deleting plan:", err);
      setError(err.message || "Failed to delete workout plan");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        activePlan,
        allPlans,
        createCustomPlan,
        deletePlan,
        error,
        generatePlan,
        isLoading,
        refreshPlans,
        updatePlan,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkoutContext() {
  const context = useContext(WorkoutContext);
  if (!context)
    throw new Error("useWorkoutContext must be used within a WorkoutProvider");
  return context;
}

