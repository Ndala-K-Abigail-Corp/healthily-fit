import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "@/context/auth-context";
import { useProfileContext } from "@/context/profile-context";

interface OnboardingRouteProps {
  children: React.ReactNode;
}

/**
 * Onboarding route component that:
 * - Redirects to /auth/login if not authenticated
 * - Redirects to /dashboard if profile already exists (onboarding complete)
 * - Allows access to onboarding if authenticated but no profile
 */
export function OnboardingRoute({ children }: OnboardingRouteProps) {
  const { loading: authLoading, user } = useAuthContext();
  const { loading: profileLoading, profile } = useProfileContext();

  // Show loading state while checking auth/profile
  if (authLoading || (user && profileLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect to dashboard if profile already exists
  if (profile) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

