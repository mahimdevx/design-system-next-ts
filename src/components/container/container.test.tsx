import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Container } from "./container";

describe("Container", () => {
  test("centers content with fluid side padding, lg width by default", () => {
    render(<Container data-testid="container">Content</Container>);
    const container = screen.getByTestId("container");

    expect(container.tagName).toBe("DIV");
    expect(container).toHaveClass("mx-auto", "px-gutter", "max-w-7xl");
    expect(container).toHaveAttribute("data-size", "lg");
  });

  test.each([
    ["sm", "max-w-3xl"],
    ["md", "max-w-5xl"],
    ["full", "max-w-none"]
  ] as const)("size=%s sets %s", (size, maxWidth) => {
    render(
      <Container size={size} data-testid="container">
        Content
      </Container>
    );

    expect(screen.getByTestId("container")).toHaveClass(maxWidth);
  });

  test("asChild renders the child element, e.g. the page's <main>", () => {
    render(
      <Container asChild size="md">
        <main>Page</main>
      </Container>
    );
    const main = screen.getByRole("main");

    expect(main).toHaveClass("mx-auto", "max-w-5xl");
    expect(main).toHaveAttribute("data-slot", "container");
  });

  test("className overrides conflicting classes", () => {
    render(
      <Container className="max-w-prose px-0" data-testid="container">
        Content
      </Container>
    );
    const container = screen.getByTestId("container");

    expect(container).toHaveClass("max-w-prose", "px-0");
    expect(container).not.toHaveClass("max-w-7xl");
    expect(container).not.toHaveClass("px-gutter");
  });
});
