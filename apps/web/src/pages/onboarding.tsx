import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OnboardingForm } from "@/components/profile/onboarding-form";
import { useAuth } from "@/hooks/use-auth";

interface OnboardingPageProps {
  onComplete?: () => void;
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-200">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-neutral-600">
              Please sign in to continue
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-neutral-200 py-xl px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="text-center space-y-2">
              <h1 className="font-heading text-3xl font-bold">
                Welcome, {user.displayName || "there"}! 👋
              </h1>
              <p className="text-neutral-600">
                Let's set up your fitness profile to get started
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <OnboardingForm onSuccess={onComplete} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


