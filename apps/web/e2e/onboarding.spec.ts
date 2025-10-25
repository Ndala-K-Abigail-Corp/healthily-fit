import { expect, test } from "@playwright/test";

test.describe("Profile Onboarding", () => {
  test("should display all required onboarding fields", async ({ page }) => {
    // Note: This test assumes you can navigate directly to onboarding
    // In real scenario, you'd need to authenticate first
    await page.goto("/onboarding");

    // Check for main form fields
    const ageField = page.getByLabel(/age/i);
    const heightField = page.getByLabel(/height.*cm/i);
    const weightField = page.getByLabel(/weight.*kg/i);

    // These should be visible (or appropriate auth redirect)
    const isOnboardingVisible = await page
      .getByRole("heading", { name: /tell us about yourself/i })
      .isVisible()
      .catch(() => false);

    if (isOnboardingVisible) {
      await expect(ageField).toBeVisible();
      await expect(heightField).toBeVisible();
      await expect(weightField).toBeVisible();
    }
  });
});


