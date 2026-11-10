import { describe, expect, test } from "vitest";

import { tv } from "./tv";

// tv() from @utils/tv carries the configured tailwind-merge, so recipes know the custom scales
describe("tv", () => {
  test("keeps a custom text size next to a text color passed as className", () => {
    const title = tv({ base: "text-h1" });

    expect(title({ className: "text-accent-text" })).toBe("text-h1 text-accent-text");
  });

  test("a className spacing value replaces named layout spacing", () => {
    const section = tv({ base: "py-section-md" });

    expect(section({ className: "py-0" })).toBe("py-0");
  });
});
