// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Link } from "./link";

// typedRoutes checks href against the routes in src/app, like next/link
export const knownRoute = <Link href="/">Home</Link>;
export const hashLink = <Link href="#colors">Colors</Link>;
export const externalLink = <Link href="https://nextjs.org">Next.js</Link>;
export const unknownRoute = (
  // @ts-expect-error -- no such route in src/app
  <Link href="/no-such-page">Missing</Link>
);

export const missingHref = (
  // @ts-expect-error -- href is required
  <Link>Docs</Link>
);
