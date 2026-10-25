import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Main, mainContentId } from "./main";

describe("Main", () => {
  test("is the main landmark, with the skip link's target id", () => {
    render(<Main>Content</Main>);
    const main = screen.getByRole("main");

    expect(main).toHaveAttribute("id", mainContentId);
    expect(main).toHaveAttribute("data-slot", "main");
  });

  test("passes other props through", () => {
    render(
      <Main className="py-12" aria-label="Article">
        Content
      </Main>
    );

    expect(screen.getByRole("main", { name: "Article" })).toHaveClass("py-12");
  });

  test("keeps the skip link's target id even if an untyped caller passes one", () => {
    // @ts-expect-error -- simulates untyped callers (JS) that pass an id
    render(<Main id="content">Content</Main>);

    expect(screen.getByRole("main")).toHaveAttribute("id", mainContentId);
  });
});
