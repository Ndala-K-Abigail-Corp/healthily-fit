import { Sparkles, Dumbbell } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { useAuthContext } from "@/context/auth-context";

interface OnboardingPageProps {
  onComplete?: () => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { user } = useAuthContext();

  return (
    <div className="min-h-screen bg-neutral-200 py-xl px-4 animate-fadeIn" style={{ backgroundColor: 'var(--color-background-light)' }}>
      <div className="container mx-auto max-w-3xl">
        {/* Header with Logo */}
        <div className="text-center mb-xl animate-slideUp">
          <div className="inline-flex items-center gap-sm mb-md">
            <Dumbbell className="w-10 h-10 text-primary" />
            <h1 className="font-heading text-3xl font-bold text-gradient-primary" style={{ fontSize: 'var(--font-size-3xl)' }}>
              Healthily Fit
            </h1>
          </div>
          <div className="flex items-center justify-center gap-sm mb-sm">
            <Sparkles className="w-6 h-6 text-primary" />
            <h2 className="font-heading text-2xl font-bold text-neutral-900" style={{ fontSize: 'var(--font-size-2xl)' }}>
              Welcome, {user?.displayName || "there"}!
            </h2>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <p className="text-neutral-600 text-lg" style={{ fontSize: 'var(--font-size-lg)' }}>
            Let's set up your fitness profile to create your personalized plan
          </p>
        </div>

        {/* Main Onboarding Card */}
        <Card className="shadow-2xl animate-slideUp [animation-delay:100ms]">
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
        <div className="text-center mt-lg text-neutral-600 text-sm animate-slideUp [animation-delay:200ms]">
          <p>Your data is secure and will only be used to personalize your fitness experience</p>
        </div>
      </div>
    </div>
  );
}


