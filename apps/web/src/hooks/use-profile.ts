import { useEffect, useState } from "react";

import type { Profile, ProfileInput } from "@healthily-fit/shared";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase";
import { useAuth } from "./use-auth";

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileRef = doc(db, `users/${user.uid}/profile/main`);
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
          const data = profileSnap.data();
          setProfile({
            ...data,
            createdAt: data.createdAt?.toDate(),
            updatedAt: data.updatedAt?.toDate(),
          } as Profile);
        } else {
          setProfile(null);
        }
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const createProfile = async (input: ProfileInput): Promise<Profile> => {
    if (!user) {
      throw new Error("User must be authenticated");
    }

    try {
      setError(null);
      const profileRef = doc(db, `users/${user.uid}/profile/main`);

      const profileData = {
        ...input,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        userId: user.uid,
      };

      await setDoc(profileRef, profileData);

      // Fetch the created profile to get the timestamp
      const profileSnap = await getDoc(profileRef);
      const data = profileSnap.data();

      const newProfile: Profile = {
        ...data,
        createdAt: data!.createdAt?.toDate(),
        updatedAt: data!.updatedAt?.toDate(),
      } as Profile;

      setProfile(newProfile);
      return newProfile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const updateProfile = async (input: ProfileInput): Promise<Profile> => {
    if (!user) {
      throw new Error("User must be authenticated");
    }

    try {
      setError(null);
      const profileRef = doc(db, `users/${user.uid}/profile/main`);

      const updateData = {
        ...input,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(profileRef, updateData);

      // Fetch the updated profile
      const profileSnap = await getDoc(profileRef);
      const data = profileSnap.data();

      const updatedProfile: Profile = {
        ...data,
        createdAt: data!.createdAt?.toDate(),
        updatedAt: data!.updatedAt?.toDate(),
      } as Profile;

      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return {
    createProfile,
    error,
    loading,
    profile,
    updateProfile,
  };
}


