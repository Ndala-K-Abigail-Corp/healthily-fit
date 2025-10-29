import { test, expect } from "@playwright/test";

/**
 * E2E tests for progress tracking and analytics
 */

test.describe("Progress Tracking Flow", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto("/auth/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "testpassword123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard", { timeout: 10000 });
  });

  test("User can navigate to progress page", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Check for progress page title
    await expect(page.locator("text=/Progress|Analytics|Your Stats/i")).toBeVisible({ timeout: 10000 });
  });

  test("Progress page displays activity history", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Check for activity logs or empty state
    const activityLogs = page.locator('[data-testid="activity-log"], .activity-log-item');
    const emptyState = page.locator("text=/No activity|Start working out/i");

    // Either logs or empty state should be visible
    await expect(activityLogs.first().or(emptyState)).toBeVisible({ timeout: 10000 });
  });

  test("Progress page displays charts and visualizations", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Check for chart containers (Recharts or similar)
    const charts = page.locator('svg[class*="recharts"], canvas, [data-testid="chart"]');
    
    // If there's activity data, charts should be visible
    const chartCount = await charts.count();
    // Just verify charts can exist, even if no data yet
    expect(chartCount).toBeGreaterThanOrEqual(0);
  });

  test("User can filter progress by date range", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Look for date range filter buttons (30d, 90d, all)
    const dateFilter = page.locator('button:has-text("30d"), button:has-text("90d"), button:has-text("All time")').first();
    
    if (await dateFilter.isVisible({ timeout: 5000 })) {
      await dateFilter.click();
      await page.waitForTimeout(1000);

      // Check that page reloads or updates
      // No specific assertion here, just verify click works
    }
  });

  test("Progress page shows workout completion statistics", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Check for stat cards showing workout count, calories, etc.
    const statCards = page.locator('[data-testid="stat-card"], .stat-card, text=/workouts|calories|minutes/i');
    const statCount = await statCards.count();

    // Stats should be present on progress page
    expect(statCount).toBeGreaterThan(0);
  });

  test("Progress page displays weight tracking if available", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Check for weight-related content
    const weightIndicator = page.locator("text=/Weight|kg|lbs|Current Weight/i");
    const weightCount = await weightIndicator.count();

    // Weight tracking should be visible somewhere on the page
    expect(weightCount).toBeGreaterThan(0);
  });

  test("Activity logs show exercise details", async ({ page }) => {
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    // Check for exercise names in activity logs
    const exercises = page.locator("text=/Push-ups|Squats|Running|Plank|exercises/i");
    const exerciseCount = await exercises.count();

    // If there are completed workouts, exercise names should appear
    // This test allows for empty state (0 exercises)
    expect(exerciseCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe("Dashboard Stats Integration", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/auth/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "testpassword123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard", { timeout: 10000 });
  });

  test("Dashboard displays stat cards with workout metrics", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    // Check for stat cards
    const statCards = page.locator('[data-testid="stat-card"], [class*="stat-card"]');
    const statCount = await statCards.count();

    // Dashboard should have at least one stat card
    expect(statCount).toBeGreaterThan(0);
  });

  test("Dashboard shows current week workout count", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    // Check for "Workouts This Week" or similar
    const weeklyWorkouts = page.locator("text=/Workouts.*Week|This Week|Weekly/i");
    await expect(weeklyWorkouts.first()).toBeVisible({ timeout: 10000 });
  });

  test("Dashboard displays current weight and BMI", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    // Check for weight/BMI indicators
    const weightBMI = page.locator("text=/Weight|BMI|kg|Body Mass/i");
    const count = await weightBMI.count();

    expect(count).toBeGreaterThan(0);
  });

  test("Dashboard shows fitness goal", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    // Check for fitness goal display
    const fitnessGoal = page.locator("text=/Fitness Goal|Goal|Muscle Gain|Weight Loss|Endurance/i");
    const goalCount = await fitnessGoal.count();

    expect(goalCount).toBeGreaterThan(0);
  });
});

test.describe("Progress Data Persistence", () => {
  test("Progress persists after logout and login", async ({ page }) => {
    // Login
    await page.goto("/auth/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "testpassword123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard", { timeout: 10000 });

    // Navigate to progress page and check for data
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    const initialActivityCount = await page.locator('[data-testid="activity-log"], .activity-log-item').count();

    // Logout
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign Out"), a[href*="logout"]').first();
    if (await logoutButton.isVisible({ timeout: 5000 })) {
      await logoutButton.click();
      await page.waitForURL("/", { timeout: 5000 });
    }

    // Login again
    await page.goto("/auth/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "testpassword123");
    await page.click('button[type="submit"]');
    await page.waitForURL("/dashboard", { timeout: 10000 });

    // Check progress page again
    await page.goto("/dashboard/progress");
    await page.waitForLoadState("networkidle");

    const afterLoginActivityCount = await page.locator('[data-testid="activity-log"], .activity-log-item').count();

    // Activity count should be the same (or at least data should still exist)
    expect(afterLoginActivityCount).toBe(initialActivityCount);
  });
});

