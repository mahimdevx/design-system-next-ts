# Contributing

Thanks for helping improve this design system. This guide covers setup, the branch and
commit workflow, and what a pull request needs before it can merge.

## Setup

1. Install Node.js 24+ (the version is pinned in `.node-version`) and pnpm
   (`npm install -g pnpm`).
2. Fork and clone the repository, then run `pnpm install`.
3. Run `pnpm dev` and open http://localhost:3000.

Recommended VS Code extensions are listed in `.vscode/extensions.json`. Formatting and
lint fixes run on save.

## Workflow

`main` is protected: every change goes through a pull request, and CI must pass.

1. Create a branch from `main`:
   - `feat/button-loading-state`
   - `fix/dialog-focus-trap`
   - `docs/token-guide`
   - `chore/upgrade-tailwind`
2. Make your change. Keep each pull request focused on one thing.
3. Run `pnpm check` before you push. It runs the same checks as CI.
4. Open a pull request and fill in the template.

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add loading state
fix(dialog): return focus to the trigger on close
docs: explain color tokens
chore(deps): upgrade tailwindcss to 4.4
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`.
Mark breaking changes with `!` (`feat(button)!: rename variant "soft" to "subtle"`) and
explain the migration in the commit body.

## Code standards

Formatting and most rules are automatic: Prettier formats and sorts imports and Tailwind
classes, and ESLint enforces the rest. Beyond that:

- Components are accessible: keyboard support, visible focus states, correct roles and
  labels. Test them with the keyboard only.
- Every component works in light and dark mode and uses design tokens, never raw colors.
- Add `"use client"` only to components that use hooks, context or event handlers.
- Disable a lint rule only for one line, and give the reason:
  `// eslint-disable-next-line rule-name -- reason`.

## Reporting bugs and requesting features

Use the issue forms on GitHub. For security issues, follow [SECURITY.md](SECURITY.md)
instead of opening a public issue.
