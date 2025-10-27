import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import { OnboardingForm } from "@/components/onboarding/onboarding-form";
import { OnboardingProvider } from "@/context/onboarding-context";

// Mock contexts
vi.mock("@/context/profile-context", () => ({
  useProfileContext: vi.fn(() => ({
    createProfile: vi.fn(),
    error: null,
    loading: false,
    profile: null,
  })),
}));

// Helper to render with providers
function renderWithProviders(component: React.ReactElement) {
  return render(
    <BrowserRouter>
      <OnboardingProvider>{component}</OnboardingProvider>
    </BrowserRouter>
  );
}

describe("OnboardingForm", () => {
  it("should render first step (personal info) by default", () => {
    renderWithProviders(<OnboardingForm />);

    expect(screen.getByText(/personal information/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height.*cm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^weight.*kg/i)).toBeInTheDocument();
  });

  it("should render progress indicator", () => {
    renderWithProviders(<OnboardingForm />);

    expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument();
    expect(screen.getByText(/personal info/i)).toBeInTheDocument();
  });

  it("should render next button on first step", () => {
    renderWithProviders(<OnboardingForm />);

    expect(
      screen.getByRole("button", { name: /next/i })
    ).toBeInTheDocument();
  });

  it("should not render back button on first step", () => {
    renderWithProviders(<OnboardingForm />);

    expect(
      screen.queryByRole("button", { name: /back/i })
    ).not.toBeInTheDocument();
  });
});


