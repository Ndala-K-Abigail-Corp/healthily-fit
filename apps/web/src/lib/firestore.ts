import type { Profile, ProfileInput } from "@healthily-fit/shared";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

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

