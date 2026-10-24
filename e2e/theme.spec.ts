import { expect, test } from "@playwright/test";

const darkClass = /(^|\s)dark(\s|$)/;

test("follows the system theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(darkClass);
});

test("the theme toggle works from the keyboard", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle dark mode" });

  // The toggle is the first focusable element on the page
  await page.keyboard.press("Tab");
  await expect(toggle).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveClass(darkClass);

  await page.keyboard.press("Space");
  await expect(page.locator("html")).not.toHaveClass(darkClass);
});

test("keeps the chosen theme after a reload, over the system theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Toggle dark mode" }).click();
  await expect(page.locator("html")).toHaveClass(darkClass);

  await page.reload();
  await expect(page.locator("html")).toHaveClass(darkClass);
});
