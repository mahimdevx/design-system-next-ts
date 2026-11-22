import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// DOM matchers: toBeInTheDocument, toHaveAccessibleName, toBeDisabled...
import "@testing-library/jest-dom/vitest";

// Testing Library only cleans up on
// its own when test globals are enabled; they are not
afterEach(() => {
  cleanup();
});

// jsdom has no ResizeObserver; Radix's floating parts (Tooltip, Popover…) measure with it
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// jsdom has no pointer capture; sonner captures the pointer to track swipes on toasts
Element.prototype.setPointerCapture ??= () => {};
