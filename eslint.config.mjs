import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
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
      // Leftover console.log calls are mistakes; warn/error logging is fine
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Every eslint-disable comment must say why: `-- reason`
      "@eslint-community/eslint-comments/require-description": [
        "error",
        { ignore: ["eslint-enable"] }
      ]
    }
  },

  // Must be last: turns off every rule that would fight Prettier's formatting
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
