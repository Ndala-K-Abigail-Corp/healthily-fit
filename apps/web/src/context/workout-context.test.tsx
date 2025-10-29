import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WorkoutProvider, useWorkoutContext } from "./workout-context";
import { AuthProvider } from "./auth-context";
import { ProfileProvider } from "./profile-context";
import type { WorkoutPlan } from "@healthily-fit/shared";

// Mock dependencies
vi.mock("@/lib/firestore", () => ({
  fetchWorkoutPlans: vi.fn(),
  createWorkoutPlan: vi.fn(),
  updateWorkoutPlan: vi.fn(),
  deleteWorkoutPlan: vi.fn(),
  getSafeProfileForWorkout: vi.fn(),
}));

vi.mock("@/lib/workout-generator", () => ({
  generateWorkoutPlan: vi.fn(),
}));

vi.mock("./auth-context", () => ({
  useAuthContext: vi.fn(() => ({
    user: { uid: "test-user-id" },
    loading: false,
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock("./profile-context", () => ({
  useProfileContext: vi.fn(() => ({
    profile: {
      userId: "test-user-id",
      age: 30,
      gender: "male",
      fitnessGoal: "muscle_gain",
    },
    loading: false,
  })),
  ProfileProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockPlan: WorkoutPlan = {
  id: "plan-1",
  userId: "test-user-id",
  startDate: new Date("2025-01-01"),
  endDate: new Date("2025-01-07"),
  status: "active",
  dailyWorkouts: [
    { day: 1, type: "workout", exercises: [{ name: "Push-ups", sets: 3, reps: 10 }] },
  ],
  name: "Test Plan",
  description: "A test workout plan",
  createdAt: new Date(),
  updatedAt: new Date(),
};

function TestComponent() {
  const { activePlan, isLoading, error } = useWorkoutContext();
  
  return (
    <div>
      <div data-testid="plan">{activePlan ? activePlan.name : "No plan"}</div>
      <div data-testid="loading">{isLoading ? "Loading" : "Not loading"}</div>
      <div data-testid="error">{error || "No error"}</div>
    </div>
  );
}

describe("WorkoutContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides workout context values to children", async () => {
    const { fetchWorkoutPlans } = await import("@/lib/firestore");
    (fetchWorkoutPlans as any).mockResolvedValue([mockPlan]);

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestComponent />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("plan")).toHaveTextContent("Test Plan");
    });
  });

  it("throws error when useWorkoutContext is used outside WorkoutProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useWorkoutContext must be used within a WorkoutProvider");
    
    consoleError.mockRestore();
  });

  it("fetches workout plans on mount", async () => {
    const { fetchWorkoutPlans } = await import("@/lib/firestore");
    (fetchWorkoutPlans as any).mockResolvedValue([mockPlan]);

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestComponent />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(fetchWorkoutPlans).toHaveBeenCalledWith("test-user-id");
    });
  });

  it("identifies active plan from all plans", async () => {
    const activePlan = { ...mockPlan, status: "active" as const };
    const completedPlan = { ...mockPlan, id: "plan-2", status: "completed" as const };
    
    const { fetchWorkoutPlans } = await import("@/lib/firestore");
    (fetchWorkoutPlans as any).mockResolvedValue([completedPlan, activePlan]);

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestComponent />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("plan")).toHaveTextContent("Test Plan");
    });
  });

  it("provides generatePlan function", () => {
    const TestGeneratePlan = () => {
      const { generatePlan } = useWorkoutContext();
      return <button onClick={() => generatePlan()}>Generate Plan</button>;
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestGeneratePlan />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /generate plan/i })).toBeInTheDocument();
  });

  it("provides createCustomPlan function", () => {
    const TestCreateCustomPlan = () => {
      const { createCustomPlan } = useWorkoutContext();
      return (
        <button
          onClick={() =>
            createCustomPlan({
              userId: "test-user-id",
              startDate: new Date(),
              endDate: new Date(),
              status: "active",
              dailyWorkouts: [],
              name: "Custom Plan",
              description: "A custom plan",
              createdAt: new Date(),
              updatedAt: new Date(),
            })
          }
        >
          Create Custom Plan
        </button>
      );
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestCreateCustomPlan />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /create custom plan/i })).toBeInTheDocument();
  });

  it("provides updatePlan function", () => {
    const TestUpdatePlan = () => {
      const { updatePlan } = useWorkoutContext();
      return (
        <button onClick={() => updatePlan("plan-1", { status: "completed" })}>
          Update Plan
        </button>
      );
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestUpdatePlan />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /update plan/i })).toBeInTheDocument();
  });

  it("provides deletePlan function", () => {
    const TestDeletePlan = () => {
      const { deletePlan } = useWorkoutContext();
      return <button onClick={() => deletePlan("plan-1")}>Delete Plan</button>;
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestDeletePlan />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /delete plan/i })).toBeInTheDocument();
  });

  it("clears plans when user logs out", async () => {
    const { fetchWorkoutPlans } = await import("@/lib/firestore");
    (fetchWorkoutPlans as any).mockResolvedValue([mockPlan]);
    
    const { useAuthContext } = await import("./auth-context");
    
    // Start with user
    (useAuthContext as any).mockReturnValue({
      user: { uid: "test-user-id" },
      loading: false,
    });

    const { rerender } = render(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestComponent />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("plan")).toHaveTextContent("Test Plan");
    });

    // Simulate logout
    (useAuthContext as any).mockReturnValue({
      user: null,
      loading: false,
    });

    rerender(
      <AuthProvider>
        <ProfileProvider>
          <WorkoutProvider>
            <TestComponent />
          </WorkoutProvider>
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("plan")).toHaveTextContent("No plan");
    });
  });
});

