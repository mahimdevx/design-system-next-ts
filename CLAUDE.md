@AGENTS.md

# design-system-v2

Personal design system: Next.js 16 (App Router, Turbopack, React Compiler), React 19,
TypeScript 6, Tailwind CSS v4. Package manager: pnpm. Node 24 (`.node-version`).

## Commands

- `pnpm dev` / `pnpm build` / `pnpm start`
- `pnpm check` — typecheck + lint + format check. Must pass before every commit.
- `pnpm typecheck` — `next typegen && tsc --noEmit` (typegen creates `LayoutProps` etc.)
- `pnpm lint` / `pnpm lint:fix` — ESLint, zero warnings allowed
- `pnpm format` / `pnpm format:check` — Prettier

## Version pins (do not bump without checking)

- `eslint` ^9: ESLint 10 crashes eslint-config-next's React plugin.
- `typescript` ^6: the typescript-eslint parser needs TypeScript's JS API, which TS 7 lacks.

## Code quality rules

- Prettier owns formatting, ESLint owns correctness. Never add `eslint-plugin-prettier`;
  `eslint-config-prettier` stays last in `eslint.config.mjs`.
- Tool settings live in the repo config files, not in editor settings.
- Imports are grouped and sorted by Prettier (`@ianvs/prettier-plugin-sort-imports`):
  builtins → react → next → third-party → @libs/@utils/@hooks → @styles → @components →
  relative. Don't hand-order them.
- Tailwind classes are sorted by Prettier, including inside `tv()`, `cn()`, `clsx()`.
- Type-only imports use `import type` / inline `type` (enforced).
- Unused vars/args are errors; prefix with `_` when intentionally unused.
- No `console.log`; `console.warn` / `console.error` are allowed.
- Disabling a rule: only per line, only named rules, always with a reason:
  `// eslint-disable-next-line no-console -- reason`. Blanket `eslint-disable` is an error,
  and so is a disable comment that no longer suppresses anything.
- Large reformatting goes in its own commit; add its hash to `.git-blame-ignore-revs`.
- Tooling upgrades (Prettier, ESLint, TypeScript) go in their own commit.
- Text files use LF line endings (`.gitattributes`, `.editorconfig`).
