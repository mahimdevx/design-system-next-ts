import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

// WCAG 2.2 A and AA, plus axe's best practices (heading order, landmarks...).
// Runs in a real browser, so color contrast is checked against the rendered tokens.
const axeTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

// `ready`: what must be on screen before scanning. Calendars render after hydration, so
// the showcase waits for one; otherwise axe could scan their placeholders instead.
const pages = [
  { name: "showcase", path: "/", ready: "[role=grid]" },
  { name: "demos index", path: "/demo", ready: "main" },
  { name: "portfolio demo", path: "/demo/portfolio", ready: "main" },
  { name: "store demo", path: "/demo/store", ready: "main" },
  { name: "card examples demo", path: "/demo/cards", ready: "main" }
];

// Radix closes a tooltip when the page scrolls, and focus() scrolls (smoothly) to an
// off-screen button. Scroll first and let it settle, so the scroll can't close the tooltip.
async function focusInView(locator: Locator) {
  await locator.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" })
  );
  await locator.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  );
  await locator.focus();
}

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const { name, path, ready } of pages) {
      test(`the ${name} page has no accessibility violations`, async ({ page }) => {
        // A full axe scan is the heaviest step in the suite (slowest in Firefox): 3× timeout
        test.slow();

        await page.goto(path);

        // next-themes follows the system theme; make sure it is applied before scanning
        await expect(page.locator("html")).toHaveCSS("color-scheme", colorScheme);
        await page.locator(ready).first().waitFor();

        const results = await new AxeBuilder({ page }).withTags(axeTags).analyze();

        expect(results.violations).toEqual([]);
      });
    }

    // Tooltips live in a portal and only exist while open, so the page scans miss them
    test("an open tooltip has no accessibility violations", async ({ page }) => {
      await page.goto("/");
      await expect(page.locator("html")).toHaveCSS("color-scheme", colorScheme);
      // Calendars render after hydration: once one shows, React handles focus
      await page.getByRole("grid").first().waitFor();
      await focusInView(page.getByRole("button", { name: "Strikethrough" }));
      await page.locator("[data-slot=tooltip-content]").waitFor();

      const results = await new AxeBuilder({ page })
        .include("[data-slot=tooltip-content]")
        .withTags(axeTags)
        .analyze();

      expect(results.violations).toEqual([]);
    });
  });
}
