import { expect, test, type Locator } from "@playwright/test";

// Number of tracks the browser actually laid out, e.g. "192px 192px 192px" -> 3
async function columnCount(grid: Locator) {
  const tracks = await grid.evaluate(
    (element) => getComputedStyle(element).gridTemplateColumns
  );
  return tracks.split(" ").length;
}

test.describe("intrinsic grid (minItemWidth)", () => {
  test("fits several columns on a desktop screen", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");

    expect(await columnCount(page.getByRole("list", { name: "Intrinsic grid" }))).toBe(4);
  });

  test("falls back to one column on a phone, without overflowing", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");
    const grid = page.getByRole("list", { name: "Intrinsic grid" });

    expect(await columnCount(grid)).toBe(1);

    // No horizontal scroll: the page is no wider than the viewport
    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(320);
  });
});

test("the container keeps content within its max width on wide screens", async ({
  page
}) => {
  await page.setViewportSize({ width: 1920, height: 1000 });
  await page.goto("/");

  // size="md" is max-w-5xl: 64rem = 1024px, centered in the viewport (minus any scrollbar)
  const box = await page.getByRole("main").boundingBox();
  const viewportWidth = await page.evaluate(() => document.documentElement.clientWidth);
  expect(box?.width).toBe(1024);
  expect(box?.x).toBeCloseTo((viewportWidth - 1024) / 2, 0);
});

test("section spacing is fluid: more room on wide screens", async ({ page }) => {
  const section = page.getByRole("region", { name: "Layout" });
  const paddingTop = () =>
    section.evaluate((element) => parseFloat(getComputedStyle(element).paddingTop));

  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const narrow = await paddingTop();

  await page.setViewportSize({ width: 1280, height: 800 });
  const wide = await paddingTop();

  // section-sm: 2rem at 360px, 3rem from 1280px (to the browser's layout precision)
  expect(narrow).toBeCloseTo(32, 0);
  expect(wide).toBeCloseTo(48, 0);
  expect(wide).toBeGreaterThan(narrow);
});

test.describe("portfolio demo", () => {
  test("keeps the header in view while scrolling, and anchors land below it", async ({
    page
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    // Instant jumps instead of smooth scrolling, so positions are final when measured
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/demo/portfolio");

    await page
      .getByRole("navigation", { name: "Page sections" })
      .getByRole("link", { name: "Experience" })
      .click();

    const header = await page.getByRole("banner").boundingBox();
    const heading = await page
      .getByRole("heading", { level: 2, name: "Experience" })
      .boundingBox();

    // Sticky header still at the top; the section heading is not hidden under it
    expect(header?.y).toBe(0);
    expect(heading && header && heading.y >= header.height).toBe(true);
  });

  test("stacks on a phone without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/demo/portfolio");

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(320);
  });
});

test.describe("store demo", () => {
  test("keeps the header in view while scrolling, and anchors land below it", async ({
    page
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/demo/store");

    await page
      .getByRole("navigation", { name: "Store sections" })
      .getByRole("link", { name: "How it works" })
      .click();

    const header = await page.getByRole("banner").boundingBox();
    const heading = await page
      .getByRole("heading", { level: 2, name: "How it works" })
      .boundingBox();

    // The announcement bar scrolls away; the header sticks and doesn't cover the heading
    expect(header?.y).toBe(0);
    expect(heading && header && heading.y >= header.height).toBe(true);
  });

  test("stacks on a phone without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/demo/store");

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(320);
  });
});

test("a heading inside an alert title looks like a plain title", async ({ page }) => {
  await page.goto("/");

  const heading = page.getByRole("heading", { level: 3, name: "Heading in the title" });

  await expect(heading).toHaveCSS("font-size", "16px");
  await expect(heading).toHaveCSS("line-height", "24px");
  await expect(heading).toHaveCSS("font-weight", "600");
});

test("a heading inside a card title looks like a plain title", async ({ page }) => {
  await page.goto("/");

  const heading = page.getByRole("heading", {
    level: 3,
    name: "Heading in a card title"
  });
  const plain = page.getByText("Every part", { exact: true });

  for (const property of ["font-size", "line-height", "font-weight"]) {
    const expected = await plain.evaluate(
      (element, name) => getComputedStyle(element).getPropertyValue(name),
      property
    );

    await expect(heading).toHaveCSS(property, expected);
  }
});

test.describe("card examples demo", () => {
  test("stacks on a phone without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/demo/cards");

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(320);
  });

  test("the carousel scrolls by itself, and from the keyboard", async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 700 });
    await page.goto("/demo/cards");

    const carousel = page.getByRole("region", { name: "Podcasts carousel" });
    await carousel.focus();
    await page.keyboard.press("ArrowRight");

    await expect
      .poll(() => carousel.evaluate((element) => element.scrollLeft))
      .toBeGreaterThan(0);
  });
});

test("an avatar image replaces the fallback in the browser", async ({ page }) => {
  await page.goto("/");

  const image = page.getByRole("img", { name: "Sample person", exact: true });

  await expect(image).toBeVisible();
  await expect(image).toHaveCSS("width", "40px");
});

test.describe("calendar", () => {
  test("a day is picked from the keyboard", async ({ page }) => {
    await page.goto("/");
    const calendar = page
      .getByRole("region", { name: "Calendars" })
      .locator("[data-slot=calendar]")
      .first();

    // Day buttons are named "Sunday, November 1, 2026"; outside days repeat a 1
    await calendar
      .getByRole("button", { name: /\s1, \d{4}$/ })
      .first()
      .focus();
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Enter");

    await expect(calendar.getByRole("gridcell", { selected: true })).toHaveText("2");
    await expect(calendar.getByText(/^Selected:/)).toBeVisible();
  });

  test("fits a phone without horizontal scroll", async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    const pageWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(pageWidth).toBeLessThanOrEqual(320);
  });
});

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

test.describe("tooltip", () => {
  test("opens on hover, stays while hovered, and Escape closes it", async ({ page }) => {
    await page.goto("/");
    const bold = page.getByRole("button", { name: "Bold" });

    await bold.hover();
    const tooltip = page.locator("[data-slot=tooltip-content]");
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toContainText("Bold");

    // WCAG 1.4.13: the pointer can move onto the tooltip without it closing
    await tooltip.hover();
    await expect(tooltip).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(tooltip).toBeHidden();
  });

  test("opens on keyboard focus and describes the button", async ({ page }) => {
    await page.goto("/");
    const bold = page.getByRole("button", { name: "Bold" });
    // Calendars render after hydration: once one shows, React handles focus
    await page.getByRole("grid").first().waitFor();

    await focusInView(bold);

    await expect(page.getByRole("tooltip")).toContainText("Bold");
    await expect(bold).toHaveAccessibleDescription(/Bold/);
  });
});
