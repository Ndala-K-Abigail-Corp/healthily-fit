import { useState } from "react";
import type { ProfileInput } from "@healthily-fit/shared";
import { useNavigate } from "react-router-dom";

import { ProgressBar } from "@/components/ui/progress-bar";
import { useOnboardingContext } from "@/context/onboarding-context";
import { useProfileContext } from "@/context/profile-context";
import { ONBOARDING_STEP_LABELS } from "@/lib/constants";

import {
  StepPersonalInfo,
  StepHealthData,
  StepFitnessGoals,
  StepSummary,
} from "./steps";

interface OnboardingFormProps {
  onSuccess?: () => void;
}

export function OnboardingForm({ onSuccess }: OnboardingFormProps) {
  const navigate = useNavigate();
  const { createProfile } = useProfileContext();
  const {
    currentStep,
    formData,
    goToNextStep,
    goToPreviousStep,
    stepIndex,
    steps,
    updateFormData,
  } = useOnboardingContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePersonalInfoNext = (data: Partial<ProfileInput>) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleHealthDataNext = (data: Partial<ProfileInput>) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleFitnessGoalsNext = (data: Partial<ProfileInput>) => {
    updateFormData(data);
    goToNextStep();
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      await createProfile(formData as ProfileInput);
      
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message || "Failed to create profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-neutral-600">
          <span>
            Step {stepIndex + 1} of {steps.length}
          </span>
          <span>{ONBOARDING_STEP_LABELS[currentStep]}</span>
        </div>
        <ProgressBar value={stepIndex + 1} max={steps.length} />
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-md bg-error/10 p-3">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      {/* Step Content */}
      {currentStep === "personal" && (
        <StepPersonalInfo
          defaultValues={formData}
          onNext={handlePersonalInfoNext}
        />
      )}

      {currentStep === "health" && (
        <StepHealthData
          defaultValues={formData}
          onBack={goToPreviousStep}
          onNext={handleHealthDataNext}
        />
      )}

      {currentStep === "goals" && (
        <StepFitnessGoals
          defaultValues={formData}
          onBack={goToPreviousStep}
          onNext={handleFitnessGoalsNext}
        />
      )}

      {currentStep === "summary" && (
        <StepSummary
          data={formData}
          isSubmitting={isSubmitting}
          onBack={goToPreviousStep}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

