import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Section } from "./section";

describe("Section", () => {
  test("is a region landmark named by its heading", () => {
    render(
      <Section aria-labelledby="features">
        <h2 id="features">Features</h2>
      </Section>
    );

    expect(screen.getByRole("region", { name: "Features" })).toBeInTheDocument();
  });

  test("has md spacing by default", () => {
    render(<Section aria-label="Content">Content</Section>);
    const section = screen.getByRole("region", { name: "Content" });

    expect(section).toHaveClass("py-section-md");
    expect(section).toHaveAttribute("data-spacing", "md");
  });

  test.each(["sm", "lg"] as const)("spacing=%s uses the matching token", (spacing) => {
    render(
      <Section spacing={spacing} aria-label="Content">
        Content
      </Section>
    );

    expect(screen.getByRole("region", { name: "Content" })).toHaveClass(
      `py-section-${spacing}`
    );
  });

  test("asChild renders the child element, e.g. a page <footer>", () => {
    render(
      <Section asChild spacing="sm">
        <footer>Footer</footer>
      </Section>
    );
    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveClass("py-section-sm");
    expect(screen.queryByRole("region")).not.toBeInTheDocument();
  });

  test("className overrides the spacing", () => {
    render(
      <Section className="py-0" aria-label="Content">
        Content
      </Section>
    );
    const section = screen.getByRole("region", { name: "Content" });

    expect(section).toHaveClass("py-0");
    expect(section).not.toHaveClass("py-section-md");
  });
});
