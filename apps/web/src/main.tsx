import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ActivityProvider } from "./context/activity-context";
import { AuthProvider } from "./context/auth-context";
import { OnboardingProvider } from "./context/onboarding-context";
import { ProfileProvider } from "./context/profile-context";
import { ThemeProvider } from "./context/theme-context";
import { WorkoutProvider } from "./context/workout-context";
import { ErrorBoundary } from "./components/error-boundary";
import { OnboardingRoute } from "./routes/onboarding-route";
import { ProtectedRoute } from "./routes/protected-route";
// import { initSentry } from "./lib/sentry"; // Uncomment when Sentry is configured
import "./styles/globals.css";

// Eager load landing and auth pages (common entry points)
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";

// Lazy load other pages for better initial load performance
const DashboardPage = lazy(() => import("./pages/dashboard"));
const ProfilePage = lazy(() => import("./pages/dashboard/profile"));
const ProgressPage = lazy(() => import("./pages/dashboard/progress"));
const SettingsPage = lazy(() => import("./pages/dashboard/settings"));
const WorkoutsPage = lazy(() => import("./pages/dashboard/workouts"));
const OnboardingPage = lazy(() => import("./pages/onboarding"));
const ContactPage = lazy(() => import("./pages/contact"));
const SplashPage = lazy(() => import("./pages/splash"));
const PrivacyPage = lazy(() => import("./pages/legal/privacy"));
const TermsPage = lazy(() => import("./pages/legal/terms"));
const DisclaimerPage = lazy(() => import("./pages/legal/disclaimer"));
const CookiesPage = lazy(() => import("./pages/legal/cookies"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-neutral-600 font-medium">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

// Initialize Sentry (uncomment when configured)
// initSentry();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
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
    </ErrorBoundary>
  </React.StrictMode>
);


