import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

import type { Profile, ProfileInput } from "@healthily-fit/shared";

import * as firestoreAPI from "@/lib/firestore";
import { useAuthContext } from "./auth-context";

interface ProfileContextValue {
  createProfile: (input: ProfileInput) => Promise<Profile>;
  error: string | null;
  loading: boolean;
  profile: Profile | null;
  refreshProfile: () => Promise<void>;
  updateProfile: (input: Partial<ProfileInput>) => Promise<Profile>;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(
  undefined
);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfileData = useCallback(async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const profileData = await firestoreAPI.fetchProfile(user.uid);
      setProfile(profileData);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      // Clear profile data when user logs out
      setProfile(null);
      setError(null);
      setLoading(false);
      return;
    }
    fetchProfileData();
  }, [user]);

  const createProfile = useCallback(async (input: ProfileInput): Promise<Profile> => {
    if (!user) {
      throw new Error("User must be authenticated");
    }

    try {
      setError(null);
      const newProfile = await firestoreAPI.createProfile(user.uid, input);
      setProfile(newProfile);
      return newProfile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  const updateProfile = useCallback(async (
    input: Partial<ProfileInput>
  ): Promise<Profile> => {
    if (!user) {
      throw new Error("User must be authenticated");
    }

    try {
      setError(null);
      const updatedProfile = await firestoreAPI.updateProfile(user.uid, input);
      setProfile(updatedProfile);
      return updatedProfile;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }, [user]);

  const refreshProfile = useCallback(async () => {
    await fetchProfileData();
  }, [fetchProfileData]);

  const value: ProfileContextValue = useMemo(() => ({
    createProfile,
    error,
    loading,
    profile,
    refreshProfile,
    updateProfile,
  }), [createProfile, error, loading, profile, refreshProfile, updateProfile]);

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
}

