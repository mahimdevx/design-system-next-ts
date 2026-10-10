"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@components/button";
import { Icon } from "@components/icon";

// Both icons are always rendered; CSS shows the right one, so the server and client
// markup match and no "mounted" check is needed
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      variant="soft"
      size="sm"
      iconOnly
      rounded
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
    >
      <Icon
        as={Sun}
        className="scale-100 rotate-0 transition-transform dark:scale-0 dark:-rotate-90"
      />
      <Icon
        as={Moon}
        className="absolute scale-0 rotate-90 transition-transform dark:scale-100 dark:rotate-0"
      />
    </Button>
  );
}
