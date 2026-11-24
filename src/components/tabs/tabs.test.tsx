import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

function renderTabs({ orientation }: { orientation?: "horizontal" | "vertical" } = {}) {
  return render(
    <Tabs defaultValue="account" orientation={orientation}>
      <TabsList aria-label="Settings">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account">Update your name and email.</TabsContent>
      <TabsContent value="password">Change your password.</TabsContent>
      <TabsContent value="billing">Manage your plan.</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  test("a named tablist; the selected tab labels the only rendered panel", () => {
    renderTabs();

    expect(screen.getByRole("tablist", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Account" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByRole("tabpanel", { name: "Account" })).toHaveTextContent(
      "Update your name and email."
    );
    expect(screen.getAllByRole("tabpanel")).toHaveLength(1);
  });

  test("clicking a tab shows its panel", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole("tab", { name: "Password" }));

    expect(screen.getByRole("tabpanel", { name: "Password" })).toHaveTextContent(
      "Change your password."
    );
  });

  test("arrow keys move and select, skipping a disabled tab; Tab enters the panel", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.tab();
    expect(screen.getByRole("tab", { name: "Account" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Password" })).toHaveFocus();
    expect(screen.getByRole("tabpanel", { name: "Password" })).toBeInTheDocument();

    // Billing is disabled: the next stop wraps around to Account
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Account" })).toHaveFocus();

    // One tab stop for the whole list, then the panel
    await user.tab();
    expect(screen.getByRole("tabpanel", { name: "Account" })).toHaveFocus();
  });

  test("vertical tabs use the up and down arrows", async () => {
    const user = userEvent.setup();
    renderTabs({ orientation: "vertical" });

    expect(screen.getByRole("tablist")).toHaveAttribute("aria-orientation", "vertical");

    await user.tab();
    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("tab", { name: "Password" })).toHaveFocus();
  });
});
