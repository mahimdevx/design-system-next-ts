import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    // Same React Compiler as next.config.ts, so tests run the code that ships
    babel({ presets: [reactCompilerPreset()] })
  ],

  // @components, @utils... from tsconfig.json
  resolve: { tsconfigPaths: true },

  test: {
    // Component tests sit next to the component: src/components/button/button.test.tsx.
    // Real-browser tests (layout, contrast, focus) belong in Playwright, not here.
    include: ["src/**/*.test.{ts,tsx}"],
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],

    // Every test starts clean: no mocks, spies or stubbed globals leak between tests
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,

    coverage: {
      provider: "v8",
      include: ["src/components/**", "src/utils/**"],
      // Re-export files have no logic of their own; tests are not the code under test
      exclude: ["**/index.ts", "**/*.test.{ts,tsx}", "**/*.test-d.tsx"],
      reporter: ["text", "html"]
    }
  }
});
