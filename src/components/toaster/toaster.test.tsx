import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";
import { afterEach, describe, expect, test, vi } from "vitest";

import { Toaster } from "./toaster";

// sonner keeps its toasts in a module-level store, shared by every test
afterEach(() => {
  act(() => {
    toast.dismiss();
  });
});

function send(...args: Parameters<typeof toast>) {
  act(() => {
    toast(...args);
  });
}

describe("Toaster", () => {
  test("shows a toast's title and description in a polite live region", async () => {
    render(<Toaster />);

    send("Event created", { description: "Monday, March 3 at 6:00 PM" });

    const region = screen.getByRole("region", { name: /notifications/i });
    expect(region).toHaveAttribute("aria-live", "polite");
    expect(await screen.findByText("Event created")).toBeInTheDocument();
    expect(screen.getByText("Monday, March 3 at 6:00 PM")).toBeInTheDocument();
  });

  test("an action runs its callback and dismisses the toast", async () => {
    const user = userEvent.setup();
    const onUndo = vi.fn();
    render(<Toaster />);

    send("Message archived", { action: { label: "Undo", onClick: onUndo } });
    await user.click(await screen.findByRole("button", { name: "Undo" }));

    expect(onUndo).toHaveBeenCalledOnce();
    await waitFor(() => {
      expect(screen.queryByText("Message archived")).not.toBeInTheDocument();
    });
  });

  test("the close button is named and dismisses the toast", async () => {
    const user = userEvent.setup();
    render(<Toaster />);

    send("Invitation sent", { closeButton: true });
    await user.click(await screen.findByRole("button", { name: "Close toast" }));

    await waitFor(() => {
      expect(screen.queryByText("Invitation sent")).not.toBeInTheDocument();
    });
  });

  test("status icons are decorative: the title carries the meaning", async () => {
    render(<Toaster />);

    act(() => {
      toast.error("Upload failed");
    });

    expect(await screen.findByText("Upload failed")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
