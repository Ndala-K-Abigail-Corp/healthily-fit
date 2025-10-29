import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthProvider, useAuthContext } from "./auth-context";
import type { User } from "firebase/auth";

// Mock Firebase auth
vi.mock("firebase/auth", () => ({
  getAuth: vi.fn(),
  onAuthStateChanged: vi.fn((auth, callback) => {
    // Simulate no user initially
    callback(null);
    return vi.fn(); // unsubscribe function
  }),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  sendPasswordResetEmail: vi.fn(),
  GoogleAuthProvider: vi.fn(),
  updateProfile: vi.fn(),
}));

vi.mock("@/lib/firebase", () => ({
  auth: {},
}));

// Test component that uses the auth context
function TestComponent() {
  const { user, loading, error } = useAuthContext();
  
  return (
    <div>
      <div data-testid="user">{user ? user.email : "No user"}</div>
      <div data-testid="loading">{loading ? "Loading" : "Not loading"}</div>
      <div data-testid="error">{error || "No error"}</div>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides auth context values to children", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("user")).toHaveTextContent("No user");
    expect(screen.getByTestId("error")).toHaveTextContent("No error");
  });

  it("throws error when useAuthContext is used outside AuthProvider", () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAuthContext must be used within an AuthProvider");
    
    consoleError.mockRestore();
  });

  it("initializes with loading state", () => {
    const { onAuthStateChanged } = require("firebase/auth");
    
    // Mock auth state as loading
    onAuthStateChanged.mockImplementation((auth: any, callback: any) => {
      // Don't call callback immediately to simulate loading
      return vi.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially should be loading (before auth state change fires)
    expect(screen.getByTestId("loading")).toHaveTextContent("Loading");
  });

  it("updates user when auth state changes", async () => {
    const mockUser: Partial<User> = {
      uid: "test-uid",
      email: "test@example.com",
      displayName: "Test User",
    };

    const { onAuthStateChanged } = require("firebase/auth");
    
    onAuthStateChanged.mockImplementation((auth: any, callback: any) => {
      // Simulate user login
      callback(mockUser);
      return vi.fn();
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("user")).toHaveTextContent("test@example.com");
    });
  });

  it("provides sign in function", () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockResolvedValue({ user: { email: "test@example.com" } });

    const TestSignIn = () => {
      const { signIn } = useAuthContext();
      return <button onClick={() => signIn("test@example.com", "password")}>Sign In</button>;
    };

    render(
      <AuthProvider>
        <TestSignIn />
      </AuthProvider>
    );

    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeInTheDocument();
  });

  it("provides sign up function", () => {
    const { createUserWithEmailAndPassword } = require("firebase/auth");
    createUserWithEmailAndPassword.mockResolvedValue({ user: { email: "test@example.com" } });

    const TestSignUp = () => {
      const { signUp } = useAuthContext();
      return <button onClick={() => signUp("test@example.com", "password")}>Sign Up</button>;
    };

    render(
      <AuthProvider>
        <TestSignUp />
      </AuthProvider>
    );

    const button = screen.getByRole("button", { name: /sign up/i });
    expect(button).toBeInTheDocument();
  });

  it("provides sign out function", () => {
    const { signOut: firebaseSignOut } = require("firebase/auth");
    firebaseSignOut.mockResolvedValue(undefined);

    const TestSignOut = () => {
      const { signOut } = useAuthContext();
      return <button onClick={signOut}>Sign Out</button>;
    };

    render(
      <AuthProvider>
        <TestSignOut />
      </AuthProvider>
    );

    const button = screen.getByRole("button", { name: /sign out/i });
    expect(button).toBeInTheDocument();
  });

  it("provides reset password function", () => {
    const { sendPasswordResetEmail } = require("firebase/auth");
    sendPasswordResetEmail.mockResolvedValue(undefined);

    const TestResetPassword = () => {
      const { resetPassword } = useAuthContext();
      return <button onClick={() => resetPassword("test@example.com")}>Reset Password</button>;
    };

    render(
      <AuthProvider>
        <TestResetPassword />
      </AuthProvider>
    );

    const button = screen.getByRole("button", { name: /reset password/i });
    expect(button).toBeInTheDocument();
  });

  it("handles sign in error", async () => {
    const { signInWithEmailAndPassword } = require("firebase/auth");
    signInWithEmailAndPassword.mockRejectedValue(new Error("Invalid credentials"));

    const TestSignInError = () => {
      const { signIn, error } = useAuthContext();
      return (
        <div>
          <button onClick={() => signIn("test@example.com", "wrongpassword").catch(() => {})}>
            Sign In
          </button>
          <div data-testid="error">{error}</div>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestSignInError />
      </AuthProvider>
    );

    const button = screen.getByRole("button", { name: /sign in/i });
    button.click();

    await waitFor(() => {
      expect(screen.getByTestId("error")).toHaveTextContent("Invalid credentials");
    });
  });
});

