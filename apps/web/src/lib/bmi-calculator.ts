/**
 * BMI calculation utilities
 * Re-exports from shared package for convenience
 */
export { calculateBMI, getBMICategory } from "@healthily-fit/shared";

/**
 * Calculate BMI trend percentage change
 * @param currentBMI - Current BMI value
 * @param previousBMI - Previous BMI value
 * @returns Percentage change (positive means increase, negative means decrease)
 */
export function calculateBMITrend(
  currentBMI: number,
  previousBMI: number
): number {
  if (previousBMI === 0) return 0;
  return ((currentBMI - previousBMI) / previousBMI) * 100;
}

/**
 * Get BMI category color for UI display
 * @param category - BMI category
 * @returns Tailwind color class
 */
export function getBMICategoryColor(category: string): string {
  switch (category) {
    case "Underweight":
      return "text-blue-500";
    case "Normal weight":
      return "text-success";
    case "Overweight":
      return "text-warning";
    case "Obese":
      return "text-error";
    default:
      return "text-neutral-600";
  }
}

/**
 * Get BMI category background color for UI display
 * @param category - BMI category
 * @returns Tailwind background color class
 */
export function getBMICategoryBgColor(category: string): string {
  switch (category) {
    case "Underweight":
      return "bg-blue-500/10";
    case "Normal weight":
      return "bg-success/10";
    case "Overweight":
      return "bg-warning/10";
    case "Obese":
      return "bg-error/10";
    default:
      return "bg-neutral-100";
  }
}

