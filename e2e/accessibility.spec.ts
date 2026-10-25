import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// WCAG 2.2 A and AA, plus axe's best practices (heading order, landmarks...).
// Runs in a real browser, so color contrast is checked against the rendered tokens.
const axeTags = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

const pages = [
  { name: "showcase", path: "/" },
  { name: "demos index", path: "/demo" },
  { name: "portfolio demo", path: "/demo/portfolio" },
  { name: "not found", path: "/no-such-page" }
];

for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`${colorScheme} theme`, () => {
    test.use({ colorScheme });

    for (const { name, path } of pages) {
      test(`the ${name} page has no accessibility violations`, async ({ page }) => {
        // A full axe scan is the heaviest step in the suite (slowest in Firefox): 3× timeout
        test.slow();

        await page.goto(path);

        // next-themes follows the system theme; make sure it is applied before scanning
        await expect(page.locator("html")).toHaveCSS("color-scheme", colorScheme);

        const results = await new AxeBuilder({ page }).withTags(axeTags).analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
}
