import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Main } from "@components/main";

import { SkipLink } from "./skip-link";

describe("SkipLink", () => {
  test("links to <Main> by default", () => {
    render(
      <>
        <SkipLink />
        <Main>Content</Main>
      </>
    );
    const link = screen.getByRole("link", { name: "Skip to content" });
    const target = link.getAttribute("href")?.slice(1);

    expect(screen.getByRole("main")).toHaveAttribute("id", target);
  });

  test("accepts its own text and target", () => {
    render(<SkipLink href="#search">Skip to search</SkipLink>);

    expect(screen.getByRole("link", { name: "Skip to search" })).toHaveAttribute(
      "href",
      "#search"
    );
  });

  test("is hidden off-screen until focused, not removed from the accessibility tree", () => {
    render(<SkipLink />);
    const link = screen.getByRole("link", { name: "Skip to content" });

    expect(link).toHaveClass("-translate-y-[calc(100%+2rem)]", "focus:translate-y-0");
    expect(link).not.toHaveClass("sr-only");
    expect(link).not.toHaveClass("hidden");
  });
});
