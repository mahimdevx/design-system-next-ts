import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import vitest from "@vitest/eslint-plugin";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import jestDom from "eslint-plugin-jest-dom";
import playwright from "eslint-plugin-playwright";
import testingLibrary from "eslint-plugin-testing-library";
import { defineConfig, globalIgnores } from "eslint/config";

const eslintConfig = defineConfig([
  // Next.js: React, React Hooks, jsx-a11y, import and Core Web Vitals rules
  ...nextVitals,
  // typescript-eslint recommended rules
  ...nextTs,
  // Rules for eslint-disable comments (no blanket disables, no stray enables)
  comments.recommended,

  {
    linterOptions: {
      // A disable comment that no longer suppresses anything is an error
      reportUnusedDisableDirectives: "error"
    },
    rules: {
      // `import type` for type-only imports, so types never end up in the bundle
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "inline-type-imports" }
      ],
      // Allow intentionally unused values when prefixed with _
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
      // === instead of == (loose equality converts types silently); x == null is allowed
      eqeqeq: ["error", "smart"],
      // Leftover console.log calls are mistakes; warn/error logging is fine
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Fake links (href="#", javascript:) and click-only anchors that should be <button>s,
      // on <a> and on our <Link>. "noHref" is left out: an <a> without href is a valid
      // placeholder (Link renders one when href is missing).
      "jsx-a11y/anchor-is-valid": [
        "error",
        { components: ["Link"], aspects: ["invalidHref", "preferButton"] }
      ],
      // tv() and cn() must come from @utils, which knows the custom tokens (text-h1...)
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "tailwind-variants",
              importNames: ["tv", "cn", "cnMerge", "createTV"],
              message: "Import tv from @utils/tv and cn from @utils/cn."
            }
          ],
          // Components are imported through their folder's index, never their internal
          // files. (Icons in @assets/icons are a collection, imported per file.)
          patterns: [
            {
              group: ["@components/*/*"],
              message:
                "Import a component through its folder (@components/button), not its internal files."
            }
          ]
        }
      ],
      // Circular imports cause undefined values at runtime and grow with project size
      "import/no-cycle": "error",
      // Every eslint-disable comment must say why: `-- reason`
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] }
      ]
    }
  },

  // The shared tv/cn setup itself is the one place allowed to import them directly
  {
    files: ["src/utils/tv.ts", "src/utils/cn.ts"],
    rules: { "no-restricted-imports": "off" }
  },

  // Tests: no focused/skipped tests left behind, accessible queries over DOM access,
  // specific matchers (toBeDisabled, not toHaveAttribute("disabled"))
  {
    files: ["src/**/*.test.{ts,tsx}"],
    extends: [
      vitest.configs.recommended,
      testingLibrary.configs["flat/react"],
      jestDom.configs["flat/recommended"]
    ],
    rules: {
      "vitest/consistent-test-it": ["error", { fn: "test" }]
    }
  },

  // Browser tests: awaited assertions, web-first matchers, no fixed waits
  {
    files: ["e2e/**/*.ts"],
    extends: [playwright.configs["flat/recommended"]],
    rules: {
      // Skipping for a known browser difference is fine (test.skip(condition, reason));
      // an unconditional skip is still an error
      "playwright/no-skipped-test": ["error", { allowConditional: { skip: true } }]
    }
  },

  // Must be last: turns off every rule that would fight Prettier's formatting
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
