import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger
} from "./popover";

function renderSharePopover() {
  return render(
    <Popover>
      <PopoverTrigger>Share</PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Share this page</PopoverTitle>
          <PopoverDescription>Anyone with the link can view it.</PopoverDescription>
        </PopoverHeader>
        <button type="button">Copy link</button>
        <PopoverClose>Close</PopoverClose>
      </PopoverContent>
    </Popover>
  );
}

describe("Popover", () => {
  test("the trigger opens a dialog named and described by its title and description", async () => {
    const user = userEvent.setup();
    renderSharePopover();
    const trigger = screen.getByRole("button", { name: "Share" });
    expect(trigger).toHaveAttribute("aria-haspopup", "dialog");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Share this page" });
    expect(dialog).toHaveAccessibleDescription("Anyone with the link can view it.");
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  test("focus moves to the first control; Escape closes and returns it", async () => {
    const user = userEvent.setup();
    renderSharePopover();

    await user.click(screen.getByRole("button", { name: "Share" }));
    expect(screen.getByRole("button", { name: "Copy link" })).toHaveFocus();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Share" })).toHaveFocus();
  });

  test("PopoverClose closes it", async () => {
    const user = userEvent.setup();
    renderSharePopover();

    await user.click(screen.getByRole("button", { name: "Share" }));
    await user.click(screen.getByRole("button", { name: "Close" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("without a control inside, the panel itself takes focus", async () => {
    const user = userEvent.setup();
    render(
      <Popover>
        <PopoverTrigger>About</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>About this metric</PopoverTitle>
        </PopoverContent>
      </Popover>
    );

    await user.click(screen.getByRole("button", { name: "About" }));

    expect(screen.getByRole("dialog", { name: "About this metric" })).toHaveFocus();
  });
});
