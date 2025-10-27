import type { 
  ActivityLog, 
  ActivityLogInput, 
  Profile, 
  ProfileInput, 
  WorkoutPlan, 
  WorkoutPlanStatus 
} from "@healthily-fit/shared";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";
import { FIRESTORE_COLLECTIONS } from "./constants";
import { validateProfileForWorkout, type ProfileValidation } from "./workout-generator";
import { generateWorkoutPlan } from "./workout-generator";

/**
 * Fetch a user's profile from Firestore
 */
export async function fetchProfile(uid: string): Promise<Profile | null> {
  try {
    const profileRef = doc(db, `users/${uid}/profile/main`);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      const data = profileSnap.data();
      return {
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
        healthConditions: data.healthConditions || [],
      } as Profile;
    }

    return null;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}

/**
 * Create a new user profile in Firestore
 */
export async function createProfile(
  uid: string,
  input: ProfileInput
): Promise<Profile> {
  try {
    const profileRef = doc(db, `users/${uid}/profile/main`);

    const profileData = {
      ...input,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      userId: uid,
      healthConditions: input.healthConditions || [],
    };

    await setDoc(profileRef, profileData);

    const profileSnap = await getDoc(profileRef);
    const data = profileSnap.data();

    return {
      ...data,
      createdAt: data!.createdAt?.toDate(),
      updatedAt: data!.updatedAt?.toDate(),
    } as Profile;
  } catch (error) {
    console.error("Error creating profile:", error);
    throw error;
  }
}

/**
 * Update an existing user profile in Firestore
 */
export async function updateProfile(
  uid: string,
  input: Partial<ProfileInput>
): Promise<Profile> {
  try {
    const profileRef = doc(db, `users/${uid}/profile/main`);

    const updateData = {
      ...input,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(profileRef, updateData);

    const profileSnap = await getDoc(profileRef);
    const data = profileSnap.data();

    return {
      ...data,
      createdAt: data!.createdAt?.toDate(),
      updatedAt: data!.updatedAt?.toDate(),
      healthConditions: data?.healthConditions || [],
    } as Profile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

/**
 * Create a new workout plan in Firestore
 */
export async function createWorkoutPlan(
  uid: string,
  plan: Omit<WorkoutPlan, "id">
): Promise<WorkoutPlan> {
  try {
    const planRef = doc(collection(db, FIRESTORE_COLLECTIONS.WORKOUT_PLANS));

    const planData = {
      ...plan,
      id: planRef.id,
      userId: uid,
      startDate: plan.startDate,
      endDate: plan.endDate,
      generatedAt: plan.generatedAt || serverTimestamp(),
    };

    await setDoc(planRef, planData);

    const planSnap = await getDoc(planRef);
    const data = planSnap.data();

    return {
      ...data,
      startDate: data!.startDate?.toDate ? data!.startDate.toDate() : data!.startDate,
      endDate: data!.endDate?.toDate ? data!.endDate.toDate() : data!.endDate,
      generatedAt: data!.generatedAt?.toDate ? data!.generatedAt.toDate() : data!.generatedAt,
    } as WorkoutPlan;
  } catch (error) {
    console.error("Error creating workout plan:", error);
    throw error;
  }
}

/**
 * Update an existing workout plan in Firestore
 */
export async function updateWorkoutPlan(
  planId: string,
  updates: Partial<Omit<WorkoutPlan, "id" | "userId">>
): Promise<WorkoutPlan> {
  try {
    const planRef = doc(db, FIRESTORE_COLLECTIONS.WORKOUT_PLANS, planId);

    await updateDoc(planRef, updates);

    const planSnap = await getDoc(planRef);
    const data = planSnap.data();

    return {
      ...data,
      startDate: data!.startDate?.toDate ? data!.startDate.toDate() : data!.startDate,
      endDate: data!.endDate?.toDate ? data!.endDate.toDate() : data!.endDate,
      generatedAt: data!.generatedAt?.toDate ? data!.generatedAt.toDate() : data!.generatedAt,
    } as WorkoutPlan;
  } catch (error) {
    console.error("Error updating workout plan:", error);
    throw error;
  }
}

/**
 * Fetch workout plans for a user
 */
export async function fetchWorkoutPlans(
  uid: string,
  status?: WorkoutPlanStatus
): Promise<WorkoutPlan[]> {
  try {
    const plansRef = collection(db, FIRESTORE_COLLECTIONS.WORKOUT_PLANS);
    let q = query(plansRef, where("userId", "==", uid));

    if (status) {
      q = query(q, where("status", "==", status));
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        startDate: data.startDate?.toDate ? data.startDate.toDate() : data.startDate,
        endDate: data.endDate?.toDate ? data.endDate.toDate() : data.endDate,
        generatedAt: data.generatedAt?.toDate ? data.generatedAt.toDate() : data.generatedAt,
      } as WorkoutPlan;
    });
  } catch (error) {
    console.error("Error fetching workout plans:", error);
    throw error;
  }
}

/**
 * Fetch the active workout plan for a user
 */
export async function fetchActiveWorkoutPlan(
  uid: string
): Promise<WorkoutPlan | null> {
  try {
    const plans = await fetchWorkoutPlans(uid, "active");
    if (plans.length === 0) return null;

    return plans.sort(
      (a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    )[0];
  } catch (error) {
    console.error("Error fetching active workout plan:", error);
    throw error;
  }
}

/**
 * Delete a workout plan
 */
export async function deleteWorkoutPlan(planId: string): Promise<void> {
  try {
    const planRef = doc(db, FIRESTORE_COLLECTIONS.WORKOUT_PLANS, planId);
    await deleteDoc(planRef);
  } catch (error) {
    console.error("Error deleting workout plan:", error);
    throw error;
  }
}

/**
 * Generate and save a workout plan safely
 */
export async function generateAndSaveWorkoutPlan(uid: string) {
  // Fetch profile
  const profile = await fetchProfile(uid);
  if (!profile) throw new Error("No profile found for this user.");

  // Validate required fields
  const requiredFields: Array<keyof Profile> = [
    "age",
    "weightKg",
    "heightCm",
    "fitnessGoal",
    "healthConditions",
  ];
  for (const field of requiredFields) {
    if (
      profile[field] === undefined ||
      profile[field] === null ||
      (Array.isArray(profile[field]) && profile[field].length === 0 && field === "healthConditions")
    ) {
      throw new Error(`Profile is missing required field: ${field}`);
    }
  }

  // Ensure healthConditions is an array
  if (!Array.isArray(profile.healthConditions)) profile.healthConditions = [];

  // Generate workout plan
  const workoutPlan = generateWorkoutPlan(profile);

  // Save to Firestore
  const createdPlan = await createWorkoutPlan(uid, workoutPlan);
  return createdPlan;
}

/**
 * Fetch and validate profile for workout generation
 * @param uid - User ID
 * @returns Profile and validation result
 */
export async function getSafeProfileForWorkout(
  uid: string
): Promise<{ profile: Profile | null; validation: ProfileValidation }> {
  try {
    const profile = await fetchProfile(uid);

    if (!profile) {
      return {
        profile: null,
        validation: {
          isValid: false,
          missingFields: ["profile"],
          errors: ["Profile not found. Please complete your onboarding."],
        },
      };
    }

    const validation = validateProfileForWorkout(profile);

    return {
      profile,
      validation,
    };
  } catch (error) {
    console.error("Error fetching profile for workout:", error);
    throw error;
  }
}

/**
 * Create a new activity log in Firestore
 */
export async function createActivityLog(
  uid: string,
  log: ActivityLogInput
): Promise<ActivityLog> {
  try {
    const logRef = doc(collection(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS));

    const logData = {
      ...log,
      id: logRef.id,
      userId: uid,
      date: log.date,
      createdAt: serverTimestamp(),
    };

    await setDoc(logRef, logData);

    const logSnap = await getDoc(logRef);
    const data = logSnap.data();

    return {
      ...data,
      date: data!.date?.toDate ? data!.date.toDate() : data!.date,
      createdAt: data!.createdAt?.toDate ? data!.createdAt.toDate() : data!.createdAt,
    } as ActivityLog;
  } catch (error) {
    console.error("Error creating activity log:", error);
    throw error;
  }
}

/**
 * Fetch activity logs for a user, optionally filtered by date range
 */
export async function fetchActivityLogs(
  uid: string,
  startDate?: Date,
  endDate?: Date
): Promise<ActivityLog[]> {
  try {
    const logsCollection = collection(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS);
    let q = query(logsCollection, where("userId", "==", uid));

    // Note: For date range filtering to work efficiently, you need a composite index
    // Firestore will prompt you to create one when you first run this query
    if (startDate) {
      q = query(q, where("date", ">=", Timestamp.fromDate(startDate)));
    }
    if (endDate) {
      q = query(q, where("date", "<=", Timestamp.fromDate(endDate)));
    }

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        date: data.date?.toDate ? data.date.toDate() : data.date,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
      } as ActivityLog;
    });
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    throw error;
  }
}

/**
 * Update an existing activity log in Firestore
 */
export async function updateActivityLog(
  logId: string,
  updates: Partial<Omit<ActivityLog, "id" | "userId" | "createdAt">>
): Promise<ActivityLog> {
  try {
    const logRef = doc(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS, logId);

    await setDoc(logRef, updates, { merge: true });

    const logSnap = await getDoc(logRef);
    const data = logSnap.data();

    return {
      ...data,
      date: data!.date?.toDate ? data!.date.toDate() : data!.date,
      createdAt: data!.createdAt?.toDate ? data!.createdAt.toDate() : data!.createdAt,
    } as ActivityLog;
  } catch (error) {
    console.error("Error updating activity log:", error);
    throw error;
  }
}

/**
 * Delete an activity log from Firestore
 */
export async function deleteActivityLog(logId: string): Promise<void> {
  try {
    const logRef = doc(db, FIRESTORE_COLLECTIONS.ACTIVITY_LOGS, logId);
    await deleteDoc(logRef);
  } catch (error) {
    console.error("Error deleting activity log:", error);
    throw error;
  }
}
