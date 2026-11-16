import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./dialog";

function renderDialog({ showCloseButton }: { showCloseButton?: boolean } = {}) {
  return render(
    <>
      <p>Page content</p>
      <Dialog>
        <DialogTrigger>Delete project</DialogTrigger>
        <DialogContent showCloseButton={showCloseButton}>
          <DialogHeader>
            <DialogTitle>Delete this project?</DialogTitle>
            <DialogDescription>Its files are removed for everyone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
            <button type="button">Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

describe("Dialog", () => {
  test("opens a modal dialog named and described by its title and description", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Delete project" }));

    const dialog = screen.getByRole("dialog", { name: "Delete this project?" });
    expect(dialog).toHaveAccessibleDescription("Its files are removed for everyone.");
    // Modal: the rest of the page is hidden from assistive tech, the trigger included
    expect(
      screen.queryByRole("button", { name: "Delete project" })
    ).not.toBeInTheDocument();
  });

  test("focus moves to the first control and stays inside", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Delete project" }));
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();

    // Cancel, Delete, Close, then back to Cancel
    await user.tab();
    await user.tab();
    expect(screen.getByRole("button", { name: "Close" })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
  });

  test("Escape closes it and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    renderDialog();
    const trigger = screen.getByRole("button", { name: "Delete project" });

    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  test("the close button and DialogClose close it", async () => {
    const user = userEvent.setup();
    renderDialog();

    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Delete project" }));
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("showCloseButton={false} leaves the close button out", async () => {
    const user = userEvent.setup();
    renderDialog({ showCloseButton: false });

    await user.click(screen.getByRole("button", { name: "Delete project" }));

    expect(screen.queryByRole("button", { name: "Close" })).not.toBeInTheDocument();
  });
});
