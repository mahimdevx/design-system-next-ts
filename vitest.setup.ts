import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// DOM matchers: toBeInTheDocument, toHaveAccessibleName, toBeDisabled...
import "@testing-library/jest-dom/vitest";

// Testing Library only cleans up on
// its own when test globals are enabled; they are not
afterEach(() => {
  cleanup();
});
