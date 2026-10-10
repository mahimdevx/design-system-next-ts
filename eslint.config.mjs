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
      // === instead of == (loose equality converts types silently); x == null is allowed
      eqeqeq: ["error", "smart"],
      // Leftover console.log calls are mistakes; warn/error logging is fine
      "no-console": ["warn", { allow: ["warn", "error"] }],
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
          ]
        }
      ],
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

  // Must be last: turns off every rule that would fight Prettier's formatting
  prettier,

  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"])
]);

export default eslintConfig;
