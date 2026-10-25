import { expect, test } from "@playwright/test";

const pages = ["/", "/demo", "/demo/portfolio", "/no-such-page"];

test("every page has a target for the skip link", async ({ page }) => {
  for (const path of pages) {
    await page.goto(path);
    await expect(page.getByRole("main")).toHaveAttribute("id", "main-content");
  }
});

test("the skip link is hidden until focused", async ({ page }) => {
  await page.goto("/demo/portfolio");
  const skipLink = page.getByRole("link", { name: "Skip to content" });

  await expect(skipLink).not.toBeInViewport();
  await skipLink.focus();
  await expect(skipLink).toBeInViewport();
});

test("Tab, Enter: skips the header and continues inside the main content", async ({
  page,
  browserName
}) => {
  // WebKit, like Safari, does not stop on links with Tab (Option+Tab does), so the
  // first Tab stop differs there; the visibility test above still covers WebKit
  test.skip(browserName === "webkit", "WebKit skips links on Tab by default");

  // The portfolio has a header with links before <main>
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/demo/portfolio");

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();

  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main-content$/);

  // The next Tab lands on the first focusable element inside <main>, not in the header
  await page.keyboard.press("Tab");
  await expect(page.getByRole("main").locator(":focus")).toHaveCount(1);
});
