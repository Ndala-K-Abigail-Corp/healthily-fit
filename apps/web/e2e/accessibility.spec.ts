import { test, expect } from "@playwright/test";
import { injectAxe, checkA11y } from "axe-playwright";

/**
 * Accessibility tests using axe-playwright
 * Tests key pages for WCAG compliance
 */

test.describe("Accessibility Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Inject axe-core on each page
    await injectAxe(page);
  });

  test("Landing page should have no accessibility violations", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    
    // Check for a11y violations
    await checkA11y(page, undefined, {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  });

  test("Login page should have no accessibility violations", async ({ page }) => {
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");
    
    await checkA11y(page, undefined, {
      detailedReport: true,
    });
  });

  test("Signup page should have no accessibility violations", async ({ page }) => {
    await page.goto("/auth/signup");
    await page.waitForLoadState("networkidle");
    
    await checkA11y(page, undefined, {
      detailedReport: true,
    });
  });

  test("Contact page should have no accessibility violations", async ({ page }) => {
    await page.goto("/contact");
    await page.waitForLoadState("networkidle");
    
    await checkA11y(page, undefined, {
      detailedReport: true,
    });
  });

  test("Privacy policy page should have no accessibility violations", async ({ page }) => {
    await page.goto("/legal/privacy");
    await page.waitForLoadState("networkidle");
    
    await checkA11y(page, undefined, {
      detailedReport: true,
    });
  });

  test("Dashboard (authenticated) should have no critical accessibility violations", async ({ page }) => {
    // Login first
    await page.goto("/auth/login");
    await page.fill('input[type="email"]', "test@example.com");
    await page.fill('input[type="password"]', "testpassword123");
    await page.click('button[type="submit"]');
    
    // Wait for navigation to dashboard
    await page.waitForURL("/dashboard", { timeout: 10000 });
    await page.waitForLoadState("networkidle");
    
    // Check for critical a11y violations only (some minor issues may exist in auth state)
    await checkA11y(page, undefined, {
      detailedReport: true,
      includedImpacts: ["critical", "serious"],
    });
  });

  test("Forms should have proper labels and aria attributes", async ({ page }) => {
    await page.goto("/auth/login");
    await page.waitForLoadState("networkidle");
    
    // Check that inputs have labels
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute("id");
    
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toHaveAttribute("id");
    
    // Check for accessibility violations
    await checkA11y(page, 'form', {
      detailedReport: true,
    });
  });

  test("Navigation should be keyboard accessible", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    
    // Tab through navigation links
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    
    // Check that focus is visible (check for focused element)
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(focusedElement).toBeTruthy();
    
    // Check for a11y violations
    await checkA11y(page, undefined, {
      detailedReport: true,
    });
  });

  test("Interactive elements should have sufficient color contrast", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    
    // axe-core automatically checks for color contrast issues
    await checkA11y(page, undefined, {
      detailedReport: true,
      rules: {
        "color-contrast": { enabled: true },
      },
    });
  });

  test("Images should have alt text", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    
    // Check for images without alt text
    await checkA11y(page, undefined, {
      detailedReport: true,
      rules: {
        "image-alt": { enabled: true },
      },
    });
  });
});

