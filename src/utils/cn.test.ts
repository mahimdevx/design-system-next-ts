import { describe, expect, test } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  test("joins classes and skips falsy values", () => {
    const isActive = false;

    expect(cn("px-2", isActive && "bg-primary", undefined, { "font-bold": true })).toBe(
      "px-2 font-bold"
    );
  });

  test("the last conflicting Tailwind class wins", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  // Without twMergeConfig, tailwind-merge reads text-h1 as a color and drops one of them
  test("keeps a custom text size next to a text color", () => {
    expect(cn("text-h1", "text-accent-text")).toBe("text-h1 text-accent-text");
  });

  test("resolves conflicts between custom text sizes", () => {
    expect(cn("text-h1", "text-lead")).toBe("text-lead");
  });
});
