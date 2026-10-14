import { expect, test } from "@playwright/test";

test("loads without errors or hydration mismatches", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Foundations" })
  ).toBeVisible();

  expect(errors).toEqual([]);
});

test("in-page navigation links move to their section", async ({ page }) => {
  await page.goto("/");

  await page
    .getByRole("navigation", { name: "Showcase sections" })
    .getByRole("link", { name: "Buttons" })
    .click();

  await expect(page).toHaveURL(/#buttons$/);
  await expect(page.getByRole("heading", { level: 2, name: "Buttons" })).toBeInViewport();
});
