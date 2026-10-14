import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Heading, headingElements } from "./heading";

describe("Heading", () => {
  test.each(headingElements.map((as, index) => [as, index + 1] as const))(
    "as=%s renders a level %i heading",
    (as, level) => {
      render(<Heading as={as}>Title</Heading>);

      expect(screen.getByRole("heading", { level, name: "Title" })).toBeInTheDocument();
    }
  );

  test("size defaults to the heading level", () => {
    render(<Heading as="h3">Title</Heading>);

    expect(screen.getByRole("heading", { name: "Title" })).toHaveAttribute(
      "data-size",
      "h3"
    );
  });

  test("size changes the look without changing the level", () => {
    render(
      <Heading as="h2" size="h4">
        Title
      </Heading>
    );
    const heading = screen.getByRole("heading", { level: 2, name: "Title" });

    expect(heading).toHaveAttribute("data-size", "h4");
    expect(heading).toHaveClass("text-h4");
    expect(heading).not.toHaveClass("text-h2");
  });

  test("passes other props to the element", () => {
    render(
      <Heading as="h2" id="colors" className="mt-8">
        Colors
      </Heading>
    );
    const heading = screen.getByRole("heading", { name: "Colors" });

    expect(heading).toHaveAttribute("id", "colors");
    expect(heading).toHaveClass("mt-8");
  });

  test("without `as`, renders a neutral div instead of crashing or guessing a level", () => {
    // @ts-expect-error -- simulates untyped callers (JS, CMS data) that omit `as`
    render(<Heading>Title</Heading>);
    const element = screen.getByText("Title");

    expect(element.tagName).toBe("DIV");
    expect(screen.queryByRole("heading")).not.toBeInTheDocument();
  });
});
