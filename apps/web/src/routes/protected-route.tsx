import React from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "@/context/auth-context";
import { useProfileContext } from "@/context/profile-context";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireOnboarding?: boolean;
}

/**
 * Protected route component that checks authentication and onboarding status
 * - Redirects to /auth/login if not authenticated
 * - Optionally redirects to /onboarding if profile doesn't exist (when requireOnboarding is true)
 */
export function ProtectedRoute({
  children,
  requireOnboarding = true,
}: ProtectedRouteProps) {
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

  // Redirect to onboarding if profile doesn't exist and it's required
  if (requireOnboarding && !profile) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

