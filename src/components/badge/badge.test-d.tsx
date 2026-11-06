// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Badge } from "./badge";

export const status = <Badge variant="success">Live</Badge>;
export const pill = <Badge rounded>Pill</Badge>;

export const unknownVariant = (
  // @ts-expect-error -- only the variants in badge.styles.ts
  <Badge variant="info">Info</Badge>
);

export const linkVariant = (
  // @ts-expect-error -- no "link" variant: a link badge is asChild + <a>
  <Badge variant="link">Docs</Badge>
);
