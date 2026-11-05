# design-system-next-ts

[![CI](https://github.com/mahimdevx/design-system-next-ts/actions/workflows/ci.yml/badge.svg)](https://github.com/mahimdevx/design-system-next-ts/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A design system for React and Next.js: accessible components, design tokens and dark mode,
built with Tailwind CSS v4 and Radix UI.

> **Status: early development.** The foundation is in place; components are being built.
> APIs will change until the first release.

## Stack

| Area      | Choice                                                                           |
| --------- | -------------------------------------------------------------------------------- |
| Framework | Next.js 16 (App Router, Turbopack, React Compiler), React 19                     |
| Language  | TypeScript 6, strict mode                                                        |
| Styling   | Tailwind CSS v4, tailwind-variants, OKLCH color tokens, fluid type and spacing   |
| Tooling   | pnpm, ESLint 9, Prettier (import and Tailwind class sorting)                     |
| Testing   | Vitest + Testing Library; Playwright + axe in three browsers                     |
| CI        | GitHub Actions per PR: typecheck, lint, format, unit tests, build, browser tests |

## Components

| Component                      | Use it for                                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `Button`                       | Actions. 8 variants, 6 sizes, icon-only (requires a label), `asChild` for links    |
| `Badge`                        | Short labels: status, category, count. 9 variants, pill shape, `asChild` for links |
| `Icon`                         | Lucide or custom SVG icons; decorative by default, labelled with `aria-label`      |
| `Heading`                      | Headings: `as` sets the level (h1–h6), `size` the look                             |
| `Text`                         | Running text: lead, p, small, caption, overline, label                             |
| `Link`                         | Links with typed routes; `inline` (underlined) or `subtle`                         |
| `Container`                    | Page width and fluid side padding                                                  |
| `Section`                      | Vertical spacing between page sections                                             |
| `Stack`                        | Flex layout: column or row, gap, alignment                                         |
| `Grid`                         | Grid layout: fixed `columns`, or `minItemWidth` for a self-responsive grid         |
| `ThemeProvider`, `ThemeToggle` | Light, dark and system theme                                                       |

```tsx
import { Button } from "@components/button";
import { Container } from "@components/container";
import { Grid } from "@components/grid";
import { Heading } from "@components/heading";
import { Section } from "@components/section";

<Section aria-labelledby="features">
  <Container>
    <Heading as="h2" id="features">
      Features
    </Heading>
    <Grid minItemWidth="16rem" gap="6">
      {/* 4 columns on desktop, 1 on a phone, no breakpoints */}
    </Grid>
    <Button>Get started</Button>
  </Container>
</Section>;
```

Run `pnpm dev` to see every component in light and dark mode on the showcase page (`/`).

`/demo` lists showcase pages: complete pages (such as a portfolio with dummy data) built
only from these components and the system's own theme, without changing the system.

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
e2e/                        # Browser tests (Playwright): accessibility, layout, theming
src/
├── app/                    # Next.js routes: the showcase (/) and demo pages (/demo)
├── components/
│   ├── button/             # One folder per component:
│   │   ├── button.tsx      #   the component
│   │   ├── button.styles.ts#   its variants (tv)
│   │   ├── button.test.tsx #   behavior tests (Vitest)
│   │   ├── button.test-d.tsx#  type tests (pnpm typecheck)
│   │   └── index.ts        #   public exports
│   └── …                   # badge, container, grid, heading, icon, link, section,
│                           # stack, text, theme-toggle, theme-provider
├── assets/
│   └── icons/              # Custom SVG icons as React components (imported per file)
├── styles/                 # Global foundations: globals.css, tokens.css, fonts.ts
└── utils/                  # cn() and the shared tv() setup
```

Imports use per-folder aliases: `@components/*`, `@assets/*`, `@styles/*`, `@utils/*`
(and `@hooks/*`, reserved for shared hooks in `src/hooks/`).
Import a component through its folder (`@components/button`), never its internal files.

## Contributing

Contributions are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow and
[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for community standards. Report security issues
privately as described in [SECURITY.md](SECURITY.md).

## License

[MIT](LICENSE) © Mahim Farhad
