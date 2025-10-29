/**
 * Calculate BMI (Body Mass Index)
 * Formula: weight (kg) / (height (m))^2
 */
export function calculateBMI(weightKg: number, heightCm: number): number {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error("Weight and height must be positive numbers");
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);

  return Math.round(bmi * 10) / 10; // Round to 1 decimal place
}

/**
 * Get BMI category based on WHO standards
 */
export function getBMICategory(bmi: number): string {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

/**
 * Calculate healthy weight range for a given height
 */
export function getHealthyWeightRange(
  heightCm: number
): { min: number; max: number } {
  const heightM = heightCm / 100;
  const minBMI = 18.5;
  const maxBMI = 24.9;

  return {
    min: Math.round(minBMI * heightM * heightM * 10) / 10,
    max: Math.round(maxBMI * heightM * heightM * 10) / 10,
  };
}


