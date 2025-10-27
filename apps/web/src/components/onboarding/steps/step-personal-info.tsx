import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GenderEnum } from "@healthily-fit/shared";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalInfoSchema = z.object({
  age: z.number().int().min(13, "Must be at least 13 years old").max(120),
  gender: GenderEnum,
  heightCm: z.number().min(50, "Height must be at least 50 cm").max(300),
  weightKg: z.number().min(20, "Weight must be at least 20 kg").max(500),
});

type PersonalInfoData = z.infer<typeof PersonalInfoSchema>;

interface StepPersonalInfoProps {
  defaultValues?: Partial<PersonalInfoData>;
  onBack?: () => void;
  onNext: (data: PersonalInfoData) => void;
}

export function StepPersonalInfo({
  defaultValues,
  onBack,
  onNext,
}: StepPersonalInfoProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<PersonalInfoData>({
    defaultValues,
    resolver: zodResolver(PersonalInfoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl font-bold">Personal Information</h2>
          <p className="text-neutral-600 mt-sm">
            Let's start with some basic information about you
          </p>
        </div>

        {/* Age */}
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            min="13"
            max="120"
            placeholder="Enter your age"
            {...register("age", { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-sm text-error">{errors.age.message}</p>
          )}
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <select
            id="gender"
            className="flex h-10 w-full rounded-md border border-input bg-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            {...register("gender")}
          >
            {GenderEnum.options.map((option) => (
              <option key={option} value={option}>
                {option === "prefer_not_to_say"
                  ? "Prefer not to say"
                  : option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-sm text-error">{errors.gender.message}</p>
          )}
        </div>

        {/* Height and Weight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="heightCm">Height (cm) *</Label>
            <Input
              id="heightCm"
              type="number"
              min="50"
              max="300"
              placeholder="170"
              {...register("heightCm", { valueAsNumber: true })}
            />
            {errors.heightCm && (
              <p className="text-sm text-error">{errors.heightCm.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weightKg">Weight (kg) *</Label>
            <Input
              id="weightKg"
              type="number"
              min="20"
              max="500"
              step="0.1"
              placeholder="70.0"
              {...register("weightKg", { valueAsNumber: true })}
            />
            {errors.weightKg && (
              <p className="text-sm text-error">{errors.weightKg.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        {onBack && (
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
        )}
        <Button type="submit" className={!onBack ? "ml-auto" : ""}>
          Next
        </Button>
      </div>
    </form>
  );
}

