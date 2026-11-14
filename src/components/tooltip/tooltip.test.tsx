import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

function renderTooltip() {
  return render(
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>Save</TooltipTrigger>
        <TooltipContent>Save the draft</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

describe("Tooltip", () => {
  test("the content shortcut makes its child the trigger", async () => {
    const user = userEvent.setup();
    render(
      <TooltipProvider>
        <Tooltip content="Save the draft">
          <button type="button">Save</button>
        </Tooltip>
      </TooltipProvider>
    );

    await user.tab();

    expect(screen.getByRole("tooltip")).toHaveTextContent("Save the draft");
    expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription(
      "Save the draft"
    );
  });

  test("is hidden until the trigger gets focus", () => {
    renderTooltip();

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });

  test("keyboard focus shows it, and it describes the trigger", async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.tab();

    expect(screen.getByRole("tooltip")).toHaveTextContent("Save the draft");
    expect(screen.getByRole("button", { name: "Save" })).toHaveAccessibleDescription(
      "Save the draft"
    );
  });

  test("Escape closes it without moving focus", async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.tab();
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toHaveFocus();
  });
});
