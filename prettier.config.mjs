/** @type {import("prettier").Config} */
const config = {
  arrowParens: "always",
  printWidth: 90,
  trailingComma: "none",

  // Order matters: prettier-plugin-tailwindcss must be last
  plugins: ["@ianvs/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],

  // Import groups, separated by a blank line ("" = blank line)
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^react$",
    "",
    "^next(/.*)?$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@libs/(.*)$",
    "^@utils/(.*)$",
    "^@hooks/(.*)$",
    "",
    "^@styles/(.*)$",
    "",
    "^@components/(.*)$",
    "",
    "^[./]"
  ],
  importOrderTypeScriptVersion: "6.0.0",

  // Tailwind v4: the CSS entry point that defines the theme
  tailwindStylesheet: "./src/app/globals.css",
  // Also sort classes inside these function calls
  tailwindFunctions: ["tv", "cn", "clsx"]
};

export default config;
