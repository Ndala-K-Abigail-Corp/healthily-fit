import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ActivityProvider } from "./context/activity-context";
import { AuthProvider } from "./context/auth-context";
import { OnboardingProvider } from "./context/onboarding-context";
import { ProfileProvider } from "./context/profile-context";
import { ThemeProvider } from "./context/theme-context";
import { WorkoutProvider } from "./context/workout-context";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { OnboardingPage } from "./pages/onboarding";
import { SignupPage } from "./pages/signup";
import { ContactPage } from "./pages/contact";
import { DashboardPage } from "./pages/dashboard";
import { ProfilePage } from "./pages/dashboard/profile";
import { ProgressPage } from "./pages/dashboard/progress";
import { SettingsPage } from "./pages/dashboard/settings";
import { WorkoutsPage } from "./pages/dashboard/workouts";
import { PrivacyPage } from "./pages/legal/privacy";
import { TermsPage } from "./pages/legal/terms";
import { DisclaimerPage } from "./pages/legal/disclaimer";
import { CookiesPage } from "./pages/legal/cookies";
import { SplashPage } from "./pages/splash";
import { OnboardingRoute } from "./routes/onboarding-route";
import { ProtectedRoute } from "./routes/protected-route";
import "./styles/globals.css";

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/welcome" element={<SplashPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/cookies" element={<CookiesPage />} />
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
    <ThemeProvider>
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <ActivityProvider>
              <OnboardingProvider>
                <App />
              </OnboardingProvider>
            </ActivityProvider>
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);


