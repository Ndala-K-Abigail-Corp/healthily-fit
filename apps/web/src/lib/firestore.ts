import type { Profile, ProfileInput, WorkoutPlan, WorkoutPlanStatus } from "@healthily-fit/shared";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "./firebase";
import { FIRESTORE_COLLECTIONS } from "./constants";

/**
 * Fetch a user's profile from Firestore
 * @param uid - User ID
 * @returns Profile data or null if not found
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
 * @param uid - User ID
 * @param input - Profile data
 * @returns Created profile
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
    };

    await setDoc(profileRef, profileData);

    // Fetch the created profile to get the timestamp
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
 * @param uid - User ID
 * @param input - Partial profile data to update
 * @returns Updated profile
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

    // Fetch the updated profile
    const profileSnap = await getDoc(profileRef);
    const data = profileSnap.data();

    return {
      ...data,
      createdAt: data!.createdAt?.toDate(),
      updatedAt: data!.updatedAt?.toDate(),
    } as Profile;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}

/**
 * Create a new workout plan in Firestore
 * @param uid - User ID
 * @param plan - Workout plan data (without id)
 * @returns Created workout plan with id
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

    // Fetch the created plan
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
 * @param planId - Workout plan ID
 * @param updates - Partial workout plan data to update
 * @returns Updated workout plan
 */
export async function updateWorkoutPlan(
  planId: string,
  updates: Partial<Omit<WorkoutPlan, "id" | "userId">>
): Promise<WorkoutPlan> {
  try {
    const planRef = doc(db, FIRESTORE_COLLECTIONS.WORKOUT_PLANS, planId);

    await updateDoc(planRef, updates);

    // Fetch the updated plan
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
 * @param uid - User ID
 * @param status - Optional status filter
 * @returns Array of workout plans
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
 * @param uid - User ID
 * @returns Active workout plan or null
 */
export async function fetchActiveWorkoutPlan(
  uid: string
): Promise<WorkoutPlan | null> {
  try {
    const plans = await fetchWorkoutPlans(uid, "active");

    if (plans.length === 0) {
      return null;
    }

    // Return the most recently generated active plan
    return plans.sort(
      (a, b) =>
        new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime()
    )[0];
  } catch (error) {
    console.error("Error fetching active workout plan:", error);
    throw error;
  }
}

/**
 * Delete a workout plan
 * @param planId - Workout plan ID
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

