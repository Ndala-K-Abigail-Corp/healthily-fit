import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { OnboardingForm } from "./onboarding-form";

// Mock hooks
vi.mock("@/hooks/use-profile", () => ({
  useProfile: vi.fn(() => ({
    createProfile: vi.fn(),
  })),
}));

describe("OnboardingForm", () => {
  it("should render all required fields", () => {
    render(<OnboardingForm />);

    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height.*cm/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^weight \(kg\)/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dietary preference/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/fitness goal/i)).toBeInTheDocument();
  });

  it("should render health conditions checkboxes", () => {
    render(<OnboardingForm />);

    expect(screen.getByText(/health conditions/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /none/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /diabetes/i })
    ).toBeInTheDocument();
  });

  it("should render submit button", () => {
    render(<OnboardingForm />);

    expect(
      screen.getByRole("button", { name: /complete profile/i })
    ).toBeInTheDocument();
  });

  it("should show optional target weight field", () => {
    render(<OnboardingForm />);

    const targetWeightLabel = screen.getByLabelText(/target weight/i);
    expect(targetWeightLabel).toBeInTheDocument();
  });
});


