import { expect, test } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display landing page", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /your personal fitness journey/i })
    ).toBeVisible();
  });

  test("should open login dialog when clicking login button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /login/i }).click();
    await expect(
      page.getByRole("heading", { name: /welcome back/i })
    ).toBeVisible();
  });

  test("should open signup dialog when clicking sign up button", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /sign up/i }).first().click();
    await expect(
      page.getByRole("heading", { name: /create your account/i })
    ).toBeVisible();
  });

  test("should validate email format in login form", async ({ page }) => {
    await page.getByRole("button", { name: /login/i }).click();
    await page.getByLabel(/email/i).fill("invalid-email");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
  });

  test("should validate password length in signup form", async ({ page }) => {
    await page.getByRole("button", { name: /sign up/i }).first().click();
    await page.getByLabel(/^email/i).fill("test@example.com");
    await page.getByLabel(/^password/i, { exact: true }).fill("12345");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(
      page.getByText(/password must be at least 6 characters/i)
    ).toBeVisible();
  });

  test("should validate password confirmation in signup form", async ({
    page,
  }) => {
    await page.getByRole("button", { name: /sign up/i }).first().click();
    await page.getByLabel(/name/i).fill("Test User");
    await page.getByLabel(/^email/i).fill("test@example.com");
    await page.getByLabel(/^password/i, { exact: true }).fill("password123");
    await page.getByLabel(/confirm password/i).fill("password456");
    await page.getByRole("button", { name: /create account/i }).click();
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });
});


