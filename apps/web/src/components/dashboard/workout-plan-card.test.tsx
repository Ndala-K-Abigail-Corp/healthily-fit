import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkoutPlanCard } from "./workout-plan-card";
import type { WorkoutPlan } from "@healthily-fit/shared";

describe("WorkoutPlanCard", () => {
  const mockPlan: WorkoutPlan = {
    id: "plan-123",
    userId: "user-123",
    name: "Weight Loss Program",
    description: "4-week intensive weight loss workout plan",
    status: "active",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-01-28"),
    dailyWorkouts: [
      {
        dayNumber: 1,
        exercises: [
          {
            name: "Push-ups",
            sets: 3,
            reps: 10,
            duration: 0,
            restSeconds: 60,
          },
          {
            name: "Squats",
            sets: 3,
            reps: 15,
            duration: 0,
            restSeconds: 60,
          },
        ],
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("should render workout plan name", () => {
    render(<WorkoutPlanCard plan={mockPlan} />);
    
    expect(screen.getByText("Weight Loss Program")).toBeInTheDocument();
  });

  it("should render workout plan description", () => {
    render(<WorkoutPlanCard plan={mockPlan} />);
    
    expect(screen.getByText(/4-week intensive/i)).toBeInTheDocument();
  });

  it("should display the number of workout days", () => {
    render(<WorkoutPlanCard plan={mockPlan} />);
    
    // Should show "1 days" or similar indication
    expect(screen.getByText(/day/i)).toBeInTheDocument();
  });

  it("should render with correct status badge", () => {
    render(<WorkoutPlanCard plan={mockPlan} />);
    
    expect(screen.getByText(/active/i)).toBeInTheDocument();
  });

  it("should handle cancelled status", () => {
    const cancelledPlan = { ...mockPlan, status: "cancelled" as const };
    render(<WorkoutPlanCard plan={cancelledPlan} />);
    
    expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
  });

  it("should handle completed status", () => {
    const completedPlan = { ...mockPlan, status: "completed" as const };
    render(<WorkoutPlanCard plan={completedPlan} />);
    
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});

