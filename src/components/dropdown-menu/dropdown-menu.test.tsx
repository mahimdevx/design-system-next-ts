import { useState } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "./dropdown-menu";

// Radix opens the menu on pointerdown or Enter/Space/ArrowDown; the keyboard path works in jsdom
async function openMenu(name: string) {
  const user = userEvent.setup();
  screen.getByRole("button", { name }).focus();
  await user.keyboard("{Enter}");
  return user;
}

describe("DropdownMenu", () => {
  test("the trigger opens a menu and focuses its first item", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>File</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    const trigger = screen.getByRole("button", { name: "Actions" });
    expect(trigger).toHaveAttribute("aria-haspopup", "menu");
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await openMenu("Actions");

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("menu")).toBeInTheDocument();
    // The label and separator are not items, so arrow keys skip them
    expect(screen.getAllByRole("menuitem")).toHaveLength(2);
    expect(screen.getByRole("menuitem", { name: "Edit" })).toHaveFocus();
  });

  test("choosing an item runs onSelect, closes the menu and returns focus", async () => {
    const onSelect = vi.fn();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onSelect={onSelect}>
            Copy <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const user = await openMenu("Actions");
    await user.keyboard("{Enter}");

    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
  });

  test("disabled items are announced and skipped", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem disabled>Archive</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    await openMenu("Actions");

    expect(screen.getByRole("menuitem", { name: "Archive" })).toHaveAttribute(
      "aria-disabled",
      "true"
    );
    expect(screen.getByRole("menuitem", { name: "Delete" })).toHaveFocus();
  });

  test("checkbox and radio items report their state", async () => {
    function ViewMenu() {
      const [toolbar, setToolbar] = useState(false);
      const [density, setDensity] = useState("compact");

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>View</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuCheckboxItem checked={toolbar} onCheckedChange={setToolbar}>
              Toolbar
            </DropdownMenuCheckboxItem>
            <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
              <DropdownMenuRadioItem value="compact">Compact</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="spacious">Spacious</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    render(<ViewMenu />);

    let user = await openMenu("View");
    expect(screen.getByRole("menuitemradio", { name: "Compact" })).toBeChecked();
    await user.keyboard("{Enter}");

    user = await openMenu("View");
    expect(screen.getByRole("menuitemcheckbox", { name: "Toolbar" })).toBeChecked();
    await user.keyboard("{ArrowDown}{ArrowDown}{Enter}");

    await openMenu("View");
    expect(screen.getByRole("menuitemradio", { name: "Spacious" })).toBeChecked();
    expect(screen.getByRole("menuitemradio", { name: "Compact" })).not.toBeChecked();
  });

  test("a submenu opens with the right arrow key", async () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Share</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );

    const user = await openMenu("Actions");
    const share = screen.getByRole("menuitem", { name: "Share" });
    expect(share).toHaveAttribute("aria-haspopup", "menu");

    await user.keyboard("{ArrowRight}");

    expect(share).toHaveAttribute("aria-expanded", "true");
    expect(await screen.findByRole("menuitem", { name: "Email" })).toHaveFocus();
  });
});
