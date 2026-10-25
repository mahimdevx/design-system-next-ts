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
      <Main id="content" className="py-12" aria-label="Article">
        Content
      </Main>
    );
    const main = screen.getByRole("main", { name: "Article" });

    expect(main).toHaveAttribute("id", "content");
    expect(main).toHaveClass("py-12");
  });
});
