import { CheckCircle2, XCircle } from "lucide-react";

export interface PasswordStrength {
  score: number; // 0-4
  checks: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    special: boolean;
  };
}

export function calculatePasswordStrength(password: string): PasswordStrength {
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[\W_]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  return { score, checks };
}

interface PasswordStrengthIndicatorProps {
  password: string;
  showRequirements?: boolean;
}

export function PasswordStrengthIndicator({
  password,
  showRequirements = true,
}: PasswordStrengthIndicatorProps) {
  const { score, checks } = calculatePasswordStrength(password);

  const getStrengthLabel = () => {
    if (score === 0) return { label: "Very Weak", color: "text-error" };
    if (score === 1) return { label: "Weak", color: "text-error" };
    if (score === 2) return { label: "Fair", color: "text-warning" };
    if (score === 3) return { label: "Good", color: "text-success" };
    return { label: "Strong", color: "text-success" };
  };

  const getStrengthColor = (index: number) => {
    if (score === 0) return "bg-neutral-200";
    if (index < score) {
      if (score <= 2) return "bg-error";
      if (score === 3) return "bg-warning";
      return "bg-success";
    }
    return "bg-neutral-200";
  };

  const strength = getStrengthLabel();

  if (!password) return null;

  return (
    <div className="space-y-3">
      {/* Strength Bar */}
      <div className="space-y-1">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${getStrengthColor(
                index
              )}`}
            />
          ))}
        </div>
        <p className={`text-sm font-medium ${strength.color}`}>
          {strength.label}
        </p>
      </div>

      {/* Requirements Checklist */}
      {showRequirements && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-neutral-600">
            Password requirements:
          </p>
          <div className="space-y-1">
            <RequirementItem
              met={checks.length}
              label="At least 8 characters"
            />
            <RequirementItem
              met={checks.lowercase}
              label="One lowercase letter"
            />
            <RequirementItem
              met={checks.uppercase}
              label="One uppercase letter"
            />
            <RequirementItem met={checks.number} label="One number" />
            <RequirementItem
              met={checks.special}
              label="One special character"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface RequirementItemProps {
  met: boolean;
  label: string;
}

function RequirementItem({ met, label }: RequirementItemProps) {
  return (
    <div className="flex items-center gap-2">
      {met ? (
        <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
      ) : (
        <XCircle className="w-4 h-4 text-neutral-400 flex-shrink-0" />
      )}
      <span
        className={`text-xs ${
          met ? "text-neutral-700" : "text-neutral-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

