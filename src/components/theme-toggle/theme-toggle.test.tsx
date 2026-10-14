import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test, vi } from "vitest";

import { ThemeProvider } from "@components/theme-provider";

import { ThemeToggle } from "./theme-toggle";

// jsdom has no matchMedia; next-themes needs it to read the system theme
// (and subscribes with the older addListener API)
function stubSystemTheme(theme: "light" | "dark") {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query === "(prefers-color-scheme: dark)" && theme === "dark",
    media: query,
    addListener: vi.fn(),
    removeListener: vi.fn()
  }));
}

// Renders the toggle inside the real provider, with the given system theme
function setup(systemTheme: "light" | "dark") {
  stubSystemTheme(systemTheme);
  const user = userEvent.setup();

  render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );

  return { user, toggle: screen.getByRole("button", { name: "Toggle dark mode" }) };
}

const html = document.documentElement;

describe("ThemeToggle", () => {
  // next-themes writes to <html> and localStorage, which outlive each render
  beforeEach(() => {
    localStorage.clear();
    html.removeAttribute("class");
    html.removeAttribute("style");
  });

  test("follows the system theme on the first visit", () => {
    setup("dark");

    expect(html).toHaveClass("dark");
  });

  test("switches between light and dark", async () => {
    const { user, toggle } = setup("light");

    expect(html).not.toHaveClass("dark");

    await user.click(toggle);
    expect(html).toHaveClass("dark");

    await user.click(toggle);
    expect(html).not.toHaveClass("dark");
  });

  test("remembers the chosen theme", async () => {
    const { user, toggle } = setup("light");

    await user.click(toggle);

    expect(localStorage.getItem("theme")).toBe("dark");
  });
});
