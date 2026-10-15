# design-system-next-ts

[![CI](https://github.com/mahimdevx/design-system-next-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/mahimdevx/design-system-next-ts/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A design system for React and Next.js: accessible components, design tokens and dark mode,
built with Tailwind CSS v4 and Radix UI.

> **Status: early development.** The foundation is in place; components are being built.
> APIs will change until the first release.

## Stack

| Area      | Choice                                                       |
| --------- | ------------------------------------------------------------ |
| Framework | Next.js 16 (App Router, Turbopack, React Compiler), React 19 |
| Language  | TypeScript 6, strict mode                                    |
| Styling   | Tailwind CSS v4, tailwind-variants, design tokens in OKLCH   |
| Tooling   | pnpm, ESLint 9, Prettier (import and Tailwind class sorting) |
| Testing   | Vitest + Testing Library; Playwright + axe in three browsers |
| CI        | GitHub Actions: typecheck, lint, format, tests, build per PR |

## Getting started

Requirements: Node.js 24.15+ and pnpm (`npm install -g pnpm`).

```bash
git clone https://github.com/mahimdevx/design-system-next-ts.git
cd design-system-next-ts
pnpm install
pnpm dev
```

Open http://localhost:3000.

## Scripts

| Command          | What it does                                    |
| ---------------- | ----------------------------------------------- |
| `pnpm dev`       | Dev server + live type checking (same terminal) |
| `pnpm build`     | Production build                                |
| `pnpm check`     | Typecheck, lint, format check, unit tests (CI)  |
| `pnpm typecheck` | Generate route types, then run `tsc`            |
| `pnpm lint`      | ESLint, zero warnings allowed                   |
| `pnpm format`    | Format everything with Prettier                 |
| `pnpm test`      | Unit tests once (`test:watch`, `test:coverage`) |
| `pnpm test:e2e`  | Browser and accessibility tests (Playwright)    |

## Project structure

```
src/
├── app/                    # Next.js routes: the component showcase
├── components/
│   ├── button/             # One folder per component:
│   │   ├── button.tsx      #   the component
│   │   ├── button.styles.ts#   its variants (tv)
│   │   ├── button.test.tsx #   behavior tests (Vitest)
│   │   ├── button.test-d.tsx#  type tests (pnpm typecheck)
│   │   └── index.ts        #   public exports
│   └── …                   # container, grid, heading, icon, link, section, stack,
│                           # text, theme-toggle, theme-provider
├── assets/
│   └── icons/              # Custom SVG icons as React components (imported per file)
├── styles/                 # Global foundations: globals.css, tokens.css, fonts.ts
├── utils/                  # cn() and the shared tv() setup
└── hooks/                  # Shared React hooks
```

Imports use per-folder aliases: `@components/*`, `@assets/*`, `@styles/*`, `@utils/*`,
`@hooks/*`.
Import a component through its folder (`@components/button`), never its internal files.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards. Report security issues
privately as described in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © Mahim Farhad
