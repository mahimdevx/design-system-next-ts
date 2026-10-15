import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Stack } from "./stack";

describe("Stack", () => {
  test("is a column with gap-4 by default", () => {
    render(<Stack data-testid="stack">Content</Stack>);
    const stack = screen.getByTestId("stack");

    expect(stack).toHaveClass("flex", "flex-col", "gap-4");
    expect(stack).toHaveAttribute("data-direction", "column");
  });

  test("lays out a row with alignment, distribution and wrapping", () => {
    render(
      <Stack
        direction="row"
        gap="2"
        align="center"
        justify="between"
        wrap
        data-testid="stack"
      >
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");

    expect(stack).toHaveClass(
      "flex-row",
      "gap-2",
      "items-center",
      "justify-between",
      "flex-wrap"
    );
    expect(stack).not.toHaveClass("flex-col");
  });

  test("asChild keeps list semantics", () => {
    render(
      <Stack asChild direction="row">
        <ul>
          <li>One</li>
          <li>Two</li>
        </ul>
      </Stack>
    );
    const list = screen.getByRole("list");

    expect(list).toHaveClass("flex", "flex-row");
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
  });

  test("breakpoint changes go in className without losing the base direction", () => {
    render(
      <Stack className="md:flex-row" data-testid="stack">
        Content
      </Stack>
    );

    expect(screen.getByTestId("stack")).toHaveClass("flex-col", "md:flex-row");
  });

  test("className overrides conflicting classes", () => {
    render(
      <Stack gap="4" className="gap-8" data-testid="stack">
        Content
      </Stack>
    );
    const stack = screen.getByTestId("stack");

    expect(stack).toHaveClass("gap-8");
    expect(stack).not.toHaveClass("gap-4");
  });
});
