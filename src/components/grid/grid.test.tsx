import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Grid } from "./grid";

describe("Grid", () => {
  test("is a grid with gap-4 by default", () => {
    render(<Grid data-testid="grid">Content</Grid>);
    const grid = screen.getByTestId("grid");

    expect(grid).toHaveClass("grid", "gap-4");
    expect(grid).toHaveAttribute("data-slot", "grid");
  });

  test("columns sets a fixed number of columns", () => {
    render(
      <Grid columns="3" gap="8" data-testid="grid">
        Content
      </Grid>
    );

    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-3", "gap-8");
  });

  test("minItemWidth fills the row with columns of at least that width", () => {
    render(
      <Grid minItemWidth="16rem" data-testid="grid">
        Content
      </Grid>
    );
    const grid = screen.getByTestId("grid");

    expect(grid.style.getPropertyValue("--grid-min-item-width")).toBe("16rem");
    expect(grid).toHaveClass(
      "grid-cols-[repeat(auto-fill,minmax(min(var(--grid-min-item-width),100%),1fr))]"
    );
  });

  test("minItemWidth keeps the caller's own styles", () => {
    render(
      <Grid minItemWidth="12rem" style={{ marginTop: 8 }} data-testid="grid">
        Content
      </Grid>
    );
    const grid = screen.getByTestId("grid");

    expect(grid).toHaveStyle({ marginTop: "8px" });
    expect(grid.style.getPropertyValue("--grid-min-item-width")).toBe("12rem");
  });

  test("without minItemWidth, no CSS variable is set", () => {
    render(
      <Grid columns="2" data-testid="grid">
        Content
      </Grid>
    );

    expect(screen.getByTestId("grid")).not.toHaveAttribute("style");
  });

  test("asChild keeps list semantics", () => {
    render(
      <Grid asChild minItemWidth="16rem">
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </Grid>
    );

    expect(screen.getByRole("list")).toHaveClass("grid");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });
});
