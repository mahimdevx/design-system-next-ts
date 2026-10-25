import { expect, test, type Locator, type Page } from "@playwright/test";

const darkClass = /(^|\s)dark(\s|$)/;

// Press Tab until the target has focus. Browsers differ in what Tab visits (WebKit, like
// Safari, skips links such as "Skip to content"), so tests should not hard-code the order.
async function tabTo(page: Page, target: Locator, maxTabs = 10) {
  for (let tabs = 0; tabs < maxTabs; tabs++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement)) return;
  }
  throw new Error(`Not reachable with ${maxTabs} Tab presses`);
}

test("follows the system theme", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(darkClass);
});

test("the theme toggle works from the keyboard", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle dark mode" });

  await tabTo(page, toggle);
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
