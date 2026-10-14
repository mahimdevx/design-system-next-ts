import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Text, textElements } from "./text";

describe("Text", () => {
  test("renders a paragraph by default", () => {
    render(<Text>Body copy</Text>);

    expect(screen.getByRole("paragraph")).toHaveTextContent("Body copy");
  });

  test.each(textElements)("as=%s renders a <%s>", (as) => {
    render(<Text as={as}>Body copy</Text>);

    expect(screen.getByText("Body copy").tagName).toBe(as.toUpperCase());
  });

  test("variant sets the look, with p as the default", () => {
    render(
      <>
        <Text>Default</Text>
        <Text variant="caption">Caption</Text>
      </>
    );

    expect(screen.getByText("Default")).toHaveAttribute("data-variant", "p");
    expect(screen.getByText("Caption")).toHaveAttribute("data-variant", "caption");
  });

  test("className overrides conflicting variant classes", () => {
    render(
      <Text variant="lead" className="text-foreground">
        Lead
      </Text>
    );
    const text = screen.getByText("Lead");

    expect(text).toHaveClass("text-lead", "text-foreground");
    expect(text).not.toHaveClass("text-muted-foreground");
  });
});
