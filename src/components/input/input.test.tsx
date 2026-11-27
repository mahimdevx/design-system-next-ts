import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  test("is a text box that takes typing and native attributes", async () => {
    const user = userEvent.setup();
    render(<Input aria-label="Search" type="search" name="q" required />);

    const input = screen.getByRole("searchbox", { name: "Search" });
    await user.type(input, "tokens");

    expect(input).toHaveValue("tokens");
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("name", "q");
  });

  test("size is the look: the native character-width attribute is not rendered", () => {
    render(<Input aria-label="Name" size="lg" />);

    expect(screen.getByRole("textbox", { name: "Name" })).not.toHaveAttribute("size");
  });
});
