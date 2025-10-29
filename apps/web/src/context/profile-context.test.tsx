import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { ProfileProvider, useProfileContext } from "./profile-context";
import { AuthProvider } from "./auth-context";
import type { Profile } from "@healthily-fit/shared";

// Mock firestore API
vi.mock("@/lib/firestore", () => ({
  fetchProfile: vi.fn(),
  createProfile: vi.fn(),
  updateProfile: vi.fn(),
}));

// Mock auth context
vi.mock("./auth-context", () => ({
  useAuthContext: vi.fn(() => ({
    user: { uid: "test-user-id", email: "test@example.com" },
    loading: false,
  })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const mockProfile: Profile = {
  userId: "test-user-id",
  age: 30,
  gender: "male",
  heightCm: 175,
  weightKg: 70,
  healthConditions: ["none"],
  dietaryPreference: "omnivore",
  fitnessGoal: "muscle_gain",
  createdAt: new Date("2025-01-01"),
  updatedAt: new Date("2025-01-01"),
};

function TestComponent() {
  const { profile, loading, error } = useProfileContext();
  
  return (
    <div>
      <div data-testid="profile">{profile ? profile.userId : "No profile"}</div>
      <div data-testid="loading">{loading ? "Loading" : "Not loading"}</div>
      <div data-testid="error">{error || "No error"}</div>
    </div>
  );
}

describe("ProfileContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides profile context values to children", async () => {
    const { fetchProfile } = await import("@/lib/firestore");
    (fetchProfile as any).mockResolvedValue(mockProfile);

    render(
      <AuthProvider>
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile")).toHaveTextContent("test-user-id");
    });
  });

  it("throws error when useProfileContext is used outside ProfileProvider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useProfileContext must be used within a ProfileProvider");
    
    consoleError.mockRestore();
  });

  it("fetches profile on mount when user is authenticated", async () => {
    const { fetchProfile } = await import("@/lib/firestore");
    (fetchProfile as any).mockResolvedValue(mockProfile);

    render(
      <AuthProvider>
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(fetchProfile).toHaveBeenCalledWith("test-user-id");
    });
  });

  it("handles fetch error gracefully", async () => {
    const { fetchProfile } = await import("@/lib/firestore");
    (fetchProfile as any).mockRejectedValue(new Error("Failed to fetch profile"));

    render(
      <AuthProvider>
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("Failed to fetch profile");
    });
  });

  it("clears profile when user logs out", async () => {
    const { fetchProfile } = await import("@/lib/firestore");
    (fetchProfile as any).mockResolvedValue(mockProfile);
    
    const { useAuthContext } = await import("./auth-context");
    
    // Start with user
    (useAuthContext as any).mockReturnValue({
      user: { uid: "test-user-id", email: "test@example.com" },
      loading: false,
    });

    const { rerender } = render(
      <AuthProvider>
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile")).toHaveTextContent("test-user-id");
    });

    // Simulate logout
    (useAuthContext as any).mockReturnValue({
      user: null,
      loading: false,
    });

    rerender(
      <AuthProvider>
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("profile")).toHaveTextContent("No profile");
    });
  });

  it("provides createProfile function", () => {
    const TestCreateProfile = () => {
      const { createProfile } = useProfileContext();
      return (
        <button
          onClick={() =>
            createProfile({
              age: 25,
              gender: "female",
              heightCm: 165,
              weightKg: 60,
              healthConditions: [],
              dietaryPreference: "vegetarian",
              fitnessGoal: "weight_loss",
            })
          }
        >
          Create Profile
        </button>
      );
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <TestCreateProfile />
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /create profile/i })).toBeInTheDocument();
  });

  it("provides updateProfile function", () => {
    const TestUpdateProfile = () => {
      const { updateProfile } = useProfileContext();
      return (
        <button onClick={() => updateProfile({ weightKg: 75 })}>
          Update Profile
        </button>
      );
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <TestUpdateProfile />
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /update profile/i })).toBeInTheDocument();
  });

  it("provides refreshProfile function", () => {
    const TestRefreshProfile = () => {
      const { refreshProfile } = useProfileContext();
      return (
        <button onClick={refreshProfile}>
          Refresh Profile
        </button>
      );
    };

    render(
      <AuthProvider>
        <ProfileProvider>
          <TestRefreshProfile />
        </ProfileProvider>
      </AuthProvider>
    );

    expect(screen.getByRole("button", { name: /refresh profile/i })).toBeInTheDocument();
  });
});

