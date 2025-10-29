import { Sparkles, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { useAuthContext } from "@/context/auth-context";

interface OnboardingPageProps {
  onComplete?: () => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-neutral-200 flex items-center justify-center px-4 py-xl" style={{ backgroundColor: 'var(--color-background-light)' }}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl items-start">
          {/* Left Side - Picture Section */}
          <div className="hidden lg:flex flex-col items-center justify-center p-xl animate-fadeIn bg-neutral-800 rounded-2xl min-h-[600px]" style={{ backgroundColor: 'var(--color-neutral-800)' }}>
            {/* 
              TODO: Replace with themed onboarding image
              Pinterest: https://pin.it/6F90vo3EI
              Keywords: "fitness journey start", "health goals", "workout motivation"
            */}
            <img
              src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=500&h=500&fit=crop"
              alt="Start your fitness journey with personalized plans"
              className="rounded-2xl shadow-2xl max-w-md w-full object-cover mb-lg"
              loading="lazy"
            />
            <div className="mt-lg text-center max-w-md">
              <div className="flex items-center justify-center gap-sm mb-md">
                <Sparkles className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-2xl font-bold text-white" style={{ fontSize: 'var(--font-size-2xl)' }}>
                  Your Personalized Journey Starts Here
                </h2>
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <p className="text-neutral-300 mt-sm" style={{ fontSize: 'var(--font-size-lg)' }}>
                We'll create a custom workout plan based on your unique profile, goals, and fitness level
              </p>
            </div>
          </div>

          {/* Right Side - Onboarding Form */}
          <div className="w-full animate-slideUp">
            {/* Header with Logo */}
            <div className="text-center mb-lg">
              <div className="inline-flex items-center justify-center gap-sm mb-md">
                <Dumbbell className="w-10 h-10 text-primary" />
                <h1 className="font-heading text-3xl font-bold text-gradient-primary" style={{ fontSize: 'var(--font-size-3xl)' }}>
                  Healthily Fit
                </h1>
              </div>
              <div className="flex items-center justify-center gap-sm mb-sm">
                <h2 className="font-heading text-2xl font-bold text-neutral-900" style={{ fontSize: 'var(--font-size-2xl)' }}>
                  Welcome, {user?.displayName || "there"}!
                </h2>
              </div>
              <p className="text-neutral-600 text-md" style={{ fontSize: 'var(--font-size-md)' }}>
                Let's set up your fitness profile
              </p>
            </div>

            {/* Main Onboarding Card */}
            <Card className="shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-neutral-300">
                <div className="text-center">
                  <p className="text-neutral-600 text-sm" style={{ fontSize: 'var(--font-size-sm)' }}>
                    Complete all steps to generate your custom workout plan
                  </p>
                </div>
              </CardHeader>
              <CardContent className="pt-lg">
                <OnboardingForm onSuccess={onComplete} />
              </CardContent>
            </Card>

            {/* Bottom Info */}
            <div className="text-center mt-lg text-neutral-600 text-sm">
              <p>Your data is secure and will only be used to personalize your fitness experience</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


