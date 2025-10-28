import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import {
  PasswordStrengthIndicator,
  calculatePasswordStrength,
} from "./password-strength-indicator";

// Strong password validation
const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .refine(
    (password) => {
      const { checks } = calculatePasswordStrength(password);
      return (
        checks.lowercase &&
        checks.uppercase &&
        checks.number &&
        checks.special
      );
    },
    {
      message:
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    }
  );

const registerSchema = z
  .object({
    confirmPassword: z.string(),
    displayName: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: passwordValidator,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Watch password field for strength indicator
  const passwordValue = watch("password", "");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      await signUp(data.email, data.password, data.displayName);
      onSuccess?.();
    } catch (err: any) {
      // Provide user-friendly error messages
      const errorCode = err.code || "";
      let errorMessage = "Failed to create account. Please try again.";
      
      if (errorCode.includes("email-already-in-use")) {
        errorMessage = "An account with this email already exists. Please sign in instead.";
      } else if (errorCode.includes("weak-password")) {
        errorMessage = "Password is too weak. Please choose a stronger password.";
      } else if (errorCode.includes("invalid-email")) {
        errorMessage = "Invalid email address. Please check and try again.";
      } else if (errorCode.includes("network-request-failed")) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName">Name</Label>
        <Input
          id="displayName"
          type="text"
          placeholder="John Doe"
          {...register("displayName")}
          disabled={isLoading}
        />
        {errors.displayName && (
          <p className="text-sm text-error">{errors.displayName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-error">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password")}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-error">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword")}
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-error">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Password Strength Indicator below Confirm Password */}
      <PasswordStrengthIndicator password={passwordValue || ""} />

      {error && (
        <div className="rounded-md bg-error/10 p-3">
          <p className="text-sm text-error">{error}</p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </form>
  );
}


