import { useState, useEffect } from "react";
import { Scale } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileContext } from "@/context/profile-context";

interface WeightUpdateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

export function WeightUpdateDialog({
  open,
  onOpenChange,
  onComplete,
}: WeightUpdateDialogProps) {
  const { profile, updateProfile } = useProfileContext();
  const [weight, setWeight] = useState(profile?.weightKg?.toString() || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset weight input whenever dialog opens
  useEffect(() => {
    if (open) {
      setWeight(profile?.weightKg?.toString() || "");
      setError(null);
    }
  }, [open, profile?.weightKg]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedWeight = weight.trim();
    const weightValue = parseFloat(trimmedWeight);

    if (isNaN(weightValue) || weightValue < 20 || weightValue > 500) {
      setError("Please enter a valid weight between 20 and 500 kg");
      return;
    }

    try {
      setIsLoading(true);
      await updateProfile({ weightKg: parseFloat(weightValue.toFixed(1)) });
      onOpenChange(false);
      onComplete();
    } catch (err: any) {
      console.error("Error updating weight:", err);
      setError(err.message || "Failed to update weight");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    onOpenChange(false);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            Update Your Weight
          </DialogTitle>
          <DialogDescription>
            Would you like to update your current weight? This helps us track your progress more accurately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              step="0.1"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              disabled={isLoading}
              autoFocus
            />
            {error && <p className="text-sm text-error">{error}</p>}
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleSkip}
              disabled={isLoading}
            >
              Skip
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Weight"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
