import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { Label } from "./label";

describe("Label", () => {
  test("names the control its htmlFor points at, and a click focuses it", async () => {
    const user = userEvent.setup();
    render(
      <>
        <Label htmlFor="city">City</Label>
        <input id="city" />
      </>
    );

    await user.click(screen.getByText("City"));

    expect(screen.getByRole("textbox", { name: "City" })).toHaveFocus();
  });
});
