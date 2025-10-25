import { describe, expect, it } from "vitest";
import { calculateBMI, getBMICategory, getHealthyWeightRange } from "./bmi";

describe("BMI Calculator", () => {
  describe("calculateBMI", () => {
    it("should calculate BMI correctly for valid inputs", () => {
      expect(calculateBMI(70, 175)).toBe(22.9);
      expect(calculateBMI(80, 180)).toBe(24.7);
      expect(calculateBMI(60, 165)).toBe(22.0);
    });

    it("should round to 1 decimal place", () => {
      const bmi = calculateBMI(72.5, 176.3);
      const decimalPlaces = bmi.toString().split(".")[1]?.length || 0;
      expect(decimalPlaces).toBeLessThanOrEqual(1);
    });

    it("should throw error for zero or negative weight", () => {
      expect(() => calculateBMI(0, 175)).toThrow();
      expect(() => calculateBMI(-10, 175)).toThrow();
    });

    it("should throw error for zero or negative height", () => {
      expect(() => calculateBMI(70, 0)).toThrow();
      expect(() => calculateBMI(70, -175)).toThrow();
    });
  });

  describe("getBMICategory", () => {
    it("should categorize underweight correctly", () => {
      expect(getBMICategory(17.5)).toBe("underweight");
      expect(getBMICategory(18.4)).toBe("underweight");
    });

    it("should categorize normal weight correctly", () => {
      expect(getBMICategory(18.5)).toBe("normal");
      expect(getBMICategory(22)).toBe("normal");
      expect(getBMICategory(24.9)).toBe("normal");
    });

    it("should categorize overweight correctly", () => {
      expect(getBMICategory(25)).toBe("overweight");
      expect(getBMICategory(27.5)).toBe("overweight");
      expect(getBMICategory(29.9)).toBe("overweight");
    });

    it("should categorize obese correctly", () => {
      expect(getBMICategory(30)).toBe("obese");
      expect(getBMICategory(35)).toBe("obese");
      expect(getBMICategory(40)).toBe("obese");
    });
  });

  describe("getHealthyWeightRange", () => {
    it("should calculate healthy weight range for a given height", () => {
      const range = getHealthyWeightRange(175);
      expect(range.min).toBeCloseTo(56.7, 1);
      expect(range.max).toBeCloseTo(76.3, 1);
    });

    it("should return range where min < max", () => {
      const heights = [150, 175, 200];
      heights.forEach((height) => {
        const range = getHealthyWeightRange(height);
        expect(range.min).toBeLessThan(range.max);
      });
    });

    it("should scale proportionally with height", () => {
      const range1 = getHealthyWeightRange(160);
      const range2 = getHealthyWeightRange(180);

      expect(range2.min).toBeGreaterThan(range1.min);
      expect(range2.max).toBeGreaterThan(range1.max);
    });
  });
});


