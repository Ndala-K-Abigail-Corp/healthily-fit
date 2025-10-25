import { Link } from "react-router-dom";

import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { RegisterForm } from "@/components/auth/register-form";
import { Button } from "@/components/ui/button";

export function SignupPage() {
  const handleAuthSuccess = () => {
    // Navigation will be handled by RegisterForm/GoogleAuthButton
    window.location.href = "/onboarding";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 flex items-center justify-center px-4 py-xl">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo/Brand */}
        <div className="text-center mb-xl">
          <Link to="/" className="inline-block mb-md">
            <h1 className="font-heading text-3xl font-bold text-gradient-primary">
              Healthily Fit
            </h1>
          </Link>
          <p className="text-neutral-600">
            Create your account and start your personalized fitness journey
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-lg shadow-lg p-xl space-y-lg animate-slideUp">
          <div className="space-y-sm">
            <h2 className="font-heading text-2xl font-bold text-center">
              Create Your Account
            </h2>
            <p className="text-neutral-600 text-center text-sm">
              Start your fitness journey today
            </p>
          </div>

          <RegisterForm onSuccess={handleAuthSuccess} />

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
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-primary hover:text-primary-hover font-semibold transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>

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
  );
}



