import { expect, test, type Locator, type Page } from "@playwright/test";

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

// After an anchor link: the jump can land after click() returns, so keep measuring until
// the sticky header is back at the top and the heading sits below it, not under it
async function expectHeadingBelowHeader(page: Page, name: string) {
  const header = page.getByRole("banner");
  const heading = page.getByRole("heading", { level: 2, name });

  await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);
  await expect
    .poll(async () => {
      const [headerBox, headingBox] = await Promise.all([
        header.boundingBox(),
        heading.boundingBox()
      ]);
      return headerBox && headingBox ? headingBox.y - headerBox.height : -1;
    })
    .toBeGreaterThanOrEqual(0);
}

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

    // Sticky header still at the top; the section heading is not hidden under it
    await expectHeadingBelowHeader(page, "Experience");
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

    // The announcement bar scrolls away; the header sticks and doesn't cover the heading
    await expectHeadingBelowHeader(page, "How it works");
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
  // The image renders on the client once loaded: wait for hydration (calendars render then)
  await page.getByRole("grid").first().waitFor();

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
    // Hovering before hydration does nothing: the tooltip has no handlers yet
    await page.getByRole("grid").first().waitFor();
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

// Radix moves focus a tick after each key, so each step waits for it, as a person would
test.describe("dropdown menu", () => {
  test("works from the keyboard: arrows, submenu, Escape returns focus", async ({
    page
  }) => {
    // Eight steps, each waiting for focus: Firefox under parallel load needs >30s
    test.slow();

    await page.goto("/");
    await page.getByRole("grid").first().waitFor();
    const trigger = page.getByRole("button", { name: "Account" });

    await focusInView(trigger);
    await page.keyboard.press("Enter");
    await expect(page.getByRole("menuitem", { name: "Profile" })).toBeFocused();

    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("menuitem", { name: "Settings" })).toBeFocused();
    await page.keyboard.press("ArrowDown");
    const invite = page.getByRole("menuitem", { name: "Invite people" });
    await expect(invite).toBeFocused();

    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("menuitem", { name: "Email" })).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(invite).toBeFocused();

    await page.keyboard.press("Escape");
    // Escape closes the whole menu, submenu included
    await expect(page.getByRole("menu")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("checkbox items toggle without closing the menu", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    await page.getByRole("button", { name: "View" }).click();
    const statusBar = page.getByRole("menuitemcheckbox", { name: "Status bar" });
    await expect(statusBar).not.toBeChecked();

    await statusBar.click();

    await expect(statusBar).toBeChecked();
    await expect(page.getByRole("menu")).toBeVisible();
  });
});

test.describe("popover", () => {
  test("opens from the keyboard, focus moves inside, Escape returns it", async ({
    page
  }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();
    const trigger = page.getByRole("button", { name: "Share" });

    await focusInView(trigger);
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Share this page" });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Cancel" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("a click outside closes it", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    await page.getByRole("button", { name: "About weekly active users" }).click();
    const dialog = page.getByRole("dialog", { name: "Weekly active users" });
    await expect(dialog).toBeVisible();

    await page.getByRole("heading", { level: 2, name: "Popovers" }).click();
    await expect(dialog).toBeHidden();
  });
});

test.describe("dialog", () => {
  test("traps focus while open; Escape closes it and returns focus", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();
    const trigger = page.getByRole("button", { name: "Keyboard shortcuts" });

    await focusInView(trigger);
    await page.keyboard.press("Enter");

    const dialog = page.getByRole("dialog", { name: "Keyboard shortcuts" });
    const close = dialog.getByRole("button", { name: "Close" });
    // The only control: focus lands on it and Tab can't leave the dialog
    await expect(close).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(close).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("a dialog taller than a phone scrolls in the backdrop, not the page", async ({
    page
  }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    await page.getByRole("button", { name: "Terms of service" }).click();
    const accept = page.getByRole("button", { name: "Accept" });
    await expect(accept).not.toBeInViewport();
    const pageScroll = await page.evaluate(() => window.scrollY);

    await accept.scrollIntoViewIfNeeded();

    await expect(accept).toBeInViewport();
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
  });
});

test.describe("toaster", () => {
  test("Alt+T reaches a toast's action from the keyboard", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    await page.getByRole("button", { name: "With action" }).click();
    const toast = page.getByRole("listitem").filter({ hasText: "Message archived" });
    await expect(toast).toBeVisible();

    // Alt+T focuses the list of toasts (and pauses them); Tab moves to the toast, then into it
    await page.keyboard.press("Alt+T");
    await page.keyboard.press("Tab");
    await expect(toast).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(toast.getByRole("button", { name: "Undo" })).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(toast).toBeHidden();
    await expect(page.getByText("Message restored")).toBeVisible();
  });

  test("toasts fit a phone screen", async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    await page.getByRole("button", { name: "Error" }).click();
    const toast = page.getByRole("listitem").filter({ hasText: "Upload failed" });
    await expect(toast).toBeVisible();
    // Alt+T expands and pauses the toasts, so this one can't close between the checks
    await page.keyboard.press("Alt+T");

    // sonner's phone layout: full width minus a 16px gutter on each side
    await expect(toast).toBeInViewport({ ratio: 1 });
    expect((await toast.boundingBox())?.width).toBe(360 - 2 * 16);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(360);
  });
});

test.describe("tabs", () => {
  test("arrow keys move between tabs and select them; Tab moves into the panel", async ({
    page
  }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();
    const list = page.getByRole("tablist", { name: "Project" });
    const code = list.getByRole("tab", { name: "Code" });
    const issues = list.getByRole("tab", { name: "Issues" });

    await focusInView(code);
    await page.keyboard.press("ArrowRight");
    await expect(issues).toBeFocused();
    await expect(issues).toHaveAttribute("aria-selected", "true");

    // End jumps to the last tab, and the arrows wrap around. Radix moves focus a tick
    // after each key, so wait for it before the next press
    await page.keyboard.press("End");
    await expect(list.getByRole("tab", { name: "Team" })).toBeFocused();
    await page.keyboard.press("ArrowRight");
    await expect(code).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(page.getByRole("tabpanel", { name: "Code" })).toBeFocused();
  });

  test("the active tab keeps a fill of its own in forced colors", async ({
    page,
    browserName
  }) => {
    test.skip(browserName !== "chromium", "Only Chromium emulates forced colors");
    await page.emulateMedia({ forcedColors: "active" });
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    // Both looks lose their own marks (fill, shadow, bar) in forced colors
    for (const name of ["Account settings", "Project"]) {
      const tabs = page.getByRole("tablist", { name }).getByRole("tab");
      const fills = await tabs.evaluateAll((elements) =>
        elements.map((element) => getComputedStyle(element).backgroundColor)
      );
      const selected = await tabs.evaluateAll((elements) =>
        elements.map((element) => element.getAttribute("aria-selected") === "true")
      );
      const active = fills[selected.indexOf(true)];
      expect(fills.filter((fill) => fill === active)).toHaveLength(1);
    }
  });
});

test.describe("forms", () => {
  // Focus has no outer ring: a 1px inset ring doubles the border inside the field
  async function focusStyle(input: Locator) {
    const read = () =>
      input.evaluate((element) => {
        const { boxShadow, borderTopColor } = getComputedStyle(element);
        return { inset: boxShadow.includes("inset"), border: borderTopColor };
      });
    const before = await read();
    await focusInView(input);
    await expect.poll(async () => (await read()).inset).toBe(true);
    return { before, after: await read() };
  }

  test("a focused input darkens and doubles its border", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    const { before, after } = await focusStyle(
      page.getByRole("textbox", { name: "Email", exact: true })
    );

    expect(after.border).not.toBe(before.border);
  });

  test("an invalid input stays red when focused and doubles its border too", async ({
    page
  }) => {
    await page.goto("/");
    await page.getByRole("grid").first().waitFor();

    const { before, after } = await focusStyle(
      page.getByRole("textbox", { name: "Username", exact: true })
    );

    expect(after.border).toBe(before.border);
  });
});
