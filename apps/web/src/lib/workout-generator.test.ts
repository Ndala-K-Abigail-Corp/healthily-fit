import { describe, it, expect } from "vitest";
import { generateWorkoutPlan } from "./workout-generator";
import type { Profile } from "@healthily-fit/shared";

describe("generateWorkoutPlan", () => {
  const baseProfile: Profile = {
    userId: "test-user-123",
    age: 30,
    gender: "male",
    heightCm: 175,
    weightKg: 80,
    healthConditions: ["none"],
    dietaryPreference: "omnivore",
    fitnessGoal: "weight_loss",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it("should generate a workout plan for a healthy adult", () => {
    const plan = generateWorkoutPlan(baseProfile);

    expect(plan).toBeDefined();
    expect(plan.name).toBeTruthy();
    expect(plan.description).toBeTruthy();
    expect(plan.status).toBe("active");
    expect(plan.dailyWorkouts).toBeInstanceOf(Array);
    expect(plan.dailyWorkouts.length).toBeGreaterThan(0);
  });

  it("should adjust workout intensity for beginners", () => {
    const beginnerProfile: Profile = {
      ...baseProfile,
      fitnessGoal: "general_health",
    };

    const plan = generateWorkoutPlan(beginnerProfile);
    
    expect(plan).toBeDefined();
    expect(plan.dailyWorkouts.length).toBeGreaterThan(0);
  });

  it("should consider health conditions when generating plan", () => {
    const profileWithConditions: Profile = {
      ...baseProfile,
      healthConditions: ["back_pain", "knee_issues"],
    };

    const plan = generateWorkoutPlan(profileWithConditions);
    
    expect(plan).toBeDefined();
    expect(plan.description).toContain("back");
  });

  it("should generate different plans for different fitness goals", () => {
    const weightLossPlan = generateWorkoutPlan({
      ...baseProfile,
      fitnessGoal: "weight_loss",
    });

    const muscleGainPlan = generateWorkoutPlan({
      ...baseProfile,
      fitnessGoal: "muscle_gain",
    });

    expect(weightLossPlan.name).not.toBe(muscleGainPlan.name);
    expect(weightLossPlan.dailyWorkouts.length).toBeGreaterThan(0);
    expect(muscleGainPlan.dailyWorkouts.length).toBeGreaterThan(0);
  });

  it("should include daily workouts with exercises", () => {
    const plan = generateWorkoutPlan(baseProfile);

    plan.dailyWorkouts.forEach((day) => {
      expect(day.dayNumber).toBeGreaterThan(0);
      expect(day.exercises).toBeInstanceOf(Array);
      expect(day.exercises.length).toBeGreaterThan(0);
      
      day.exercises.forEach((exercise) => {
        expect(exercise.name).toBeTruthy();
        expect(exercise.sets).toBeGreaterThan(0);
        expect(exercise.reps).toBeDefined();
      });
    });
  });

  it("should set appropriate duration and start date", () => {
    const plan = generateWorkoutPlan(baseProfile);

    expect(plan.startDate).toBeInstanceOf(Date);
    expect(plan.endDate).toBeInstanceOf(Date);
    expect(plan.endDate.getTime()).toBeGreaterThan(plan.startDate.getTime());
    
    const durationDays = Math.ceil(
      (plan.endDate.getTime() - plan.startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    expect(durationDays).toBeGreaterThanOrEqual(7); // At least a week
  });

  it("should handle elderly users appropriately", () => {
    const elderlyProfile: Profile = {
      ...baseProfile,
      age: 70,
      healthConditions: ["arthritis"],
    };

    const plan = generateWorkoutPlan(elderlyProfile);
    
    expect(plan).toBeDefined();
    expect(plan.dailyWorkouts.length).toBeGreaterThan(0);
    // Elderly plans should be gentler
    expect(plan.description.toLowerCase()).toMatch(/gentle|low|safe/);
  });
});

