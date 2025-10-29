import { Dumbbell, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { LoginForm } from "@/components/auth/login-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function LoginPage() {
  const handleAuthSuccess = () => {
    // Navigation will be handled by LoginForm/GoogleAuthButton
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center px-4 py-xl" style={{ backgroundColor: 'var(--color-background-light)' }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
          {/* Left Side - Illustration */}
          <div className="hidden lg:flex flex-col items-center justify-center p-xl animate-fadeIn bg-neutral-800 rounded-2xl" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
            {/* 
              TODO: Replace with themed image
              Pinterest: https://www.pinterest.com/search/pins/?q=fitness%20motivation%20welcome%20back
              Keywords: "gym motivation", "fitness comeback", "workout dedication"
            */}
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop"
              alt="Fitness motivation - welcome back to your journey"
              className="rounded-2xl shadow-2xl max-w-md w-full object-cover"
              loading="lazy"
            />
            <div className="mt-lg text-center">
              <h2 className="font-heading text-2xl font-bold text-white" style={{ fontSize: 'var(--font-size-2xl)' }}>
                Continue Your Fitness Journey
              </h2>
              <p className="text-neutral-300 mt-sm" style={{ fontSize: 'var(--font-size-lg)' }}>
                Track progress, complete workouts, achieve goals
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full max-w-md mx-auto lg:mx-0 animate-slideUp">
            {/* Logo/Brand */}
            <div className="text-center mb-xl">
              <Link to="/" className="inline-flex items-center justify-center gap-sm mb-md">
                <Dumbbell className="w-8 h-8 text-primary" />
                <h1 className="font-heading text-3xl font-bold text-gradient-primary" style={{ fontSize: 'var(--font-size-3xl)' }}>
                  Healthily Fit
                </h1>
              </Link>
              <p className="text-neutral-600" style={{ fontSize: 'var(--font-size-md)' }}>
                Sign in to continue your fitness journey
              </p>
            </div>

            {/* Login Card */}
            <Card className="shadow-xl">
              <CardHeader className="space-y-sm">
                <CardTitle className="flex items-center justify-center gap-sm text-center font-heading" style={{ fontSize: 'var(--font-size-2xl)' }}>
                  <LogIn className="w-6 h-6 text-primary" />
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-center" style={{ fontSize: 'var(--font-size-sm)' }}>
                  Sign in to your account to continue
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-lg">
                <LoginForm onSuccess={handleAuthSuccess} />

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-neutral-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-neutral-600">
                      Or continue with
                    </span>
                  </div>
                </div>

                <GoogleAuthButton onSuccess={handleAuthSuccess} />

                <div className="text-center text-sm text-neutral-600 pt-md">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/signup"
                    className="text-primary hover:text-primary-hover font-semibold transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Back to Home */}
            <div className="text-center mt-lg">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  ← Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



