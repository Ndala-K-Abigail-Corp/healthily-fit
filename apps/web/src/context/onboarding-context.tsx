import React, { createContext, useContext, useState } from "react";

import type { ProfileInput } from "@healthily-fit/shared";

export type OnboardingStep = "personal" | "health" | "goals" | "summary";

interface OnboardingContextValue {
  currentStep: OnboardingStep;
  formData: Partial<ProfileInput>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: OnboardingStep) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  resetOnboarding: () => void;
  stepIndex: number;
  steps: OnboardingStep[];
  updateFormData: (data: Partial<ProfileInput>) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | undefined>(
  undefined
);

const ONBOARDING_STEPS: OnboardingStep[] = [
  "personal",
  "health",
  "goals",
  "summary",
];

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("personal");
  const [formData, setFormData] = useState<Partial<ProfileInput>>({});

  const stepIndex = ONBOARDING_STEPS.indexOf(currentStep);
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === ONBOARDING_STEPS.length - 1;

  const goToNextStep = () => {
    if (!isLastStep) {
      setCurrentStep(ONBOARDING_STEPS[stepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(ONBOARDING_STEPS[stepIndex - 1]);
    }
  };

  const goToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const updateFormData = (data: Partial<ProfileInput>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetOnboarding = () => {
    setCurrentStep("personal");
    setFormData({});
  };

  const value: OnboardingContextValue = {
    currentStep,
    formData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep,
    isLastStep,
    resetOnboarding,
    stepIndex,
    steps: ONBOARDING_STEPS,
    updateFormData,
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error(
      "useOnboardingContext must be used within an OnboardingProvider"
    );
  }
  return context;
}

