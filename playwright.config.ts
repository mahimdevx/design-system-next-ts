import { defineConfig, devices } from "@playwright/test";

const isCI = Boolean(process.env.CI);

// Its own port, so a running `pnpm dev` on 3000 is never tested by mistake
const port = 3100;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  // Real-browser tests: accessibility (axe), keyboard, theming. Component logic is
  // covered faster by the Vitest tests in src/.
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: isCI,
  // Retries only on CI, where a retry also records a trace for the report
  retries: isCI ? 2 : 0,
  reporter: isCI ? [["github"], ["html", { open: "never" }]] : [["list"]],

  use: {
    baseURL,
    trace: "on-first-retry"
  },

  // The three engines users run: Chrome/Edge, Firefox, Safari
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } }
  ],

  // Test the production build, as users get it
  webServer: {
    command: `pnpm build && pnpm start --port ${port}`,
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 180_000
  }
});
