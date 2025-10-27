import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/auth-context";
import { OnboardingProvider } from "./context/onboarding-context";
import { ProfileProvider } from "./context/profile-context";
import { WorkoutProvider } from "./context/workout-context";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { OnboardingPage } from "./pages/onboarding";
import { SignupPage } from "./pages/signup";
import { DashboardPage } from "./pages/dashboard";
import { ProfilePage } from "./pages/dashboard/profile";
import { ProgressPage } from "./pages/dashboard/progress";
import { SettingsPage } from "./pages/dashboard/settings";
import { WorkoutsPage } from "./pages/dashboard/workouts";
import { OnboardingRoute } from "./routes/onboarding-route";
import { ProtectedRoute } from "./routes/protected-route";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route
          path="/onboarding"
          element={
            <OnboardingRoute>
              <OnboardingPage />
            </OnboardingRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/workouts"
          element={
            <ProtectedRoute>
              <WorkoutsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/progress"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileProvider>
        <WorkoutProvider>
          <OnboardingProvider>
            <App />
          </OnboardingProvider>
        </WorkoutProvider>
      </ProfileProvider>
    </AuthProvider>
  </React.StrictMode>
);


