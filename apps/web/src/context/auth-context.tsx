import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

import type { User as FirebaseUser } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

export interface AuthUser {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string;
}

interface AuthContextValue {
  error: string | null;
  loading: boolean;
  resetPassword: (email: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<FirebaseUser>;
  signInWithGoogle: () => Promise<FirebaseUser>;
  signOut: () => Promise<void>;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<FirebaseUser>;
  user: AuthUser | null;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          setUser({
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            uid: firebaseUser.uid,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return credential.user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const signUp = useCallback(async (
    email: string,
    password: string,
    displayName?: string
  ) => {
    try {
      setError(null);
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (displayName && credential.user) {
        await updateProfile(credential.user, { displayName });
      }

      return credential.user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);
      return credential.user;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setError(null);
      await firebaseSignOut(auth);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, []);

  const value: AuthContextValue = useMemo(() => ({
    error,
    loading,
    resetPassword,
    signIn,
    signInWithGoogle,
    signOut,
    signUp,
    user,
  }), [error, loading, resetPassword, signIn, signInWithGoogle, signOut, signUp, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}

