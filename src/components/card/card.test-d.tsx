// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Card, CardTitle } from "./card";

export const small = <Card size="sm">Content</Card>;
export const title = <CardTitle>Pricing</CardTitle>;

export const unknownSize = (
  // @ts-expect-error -- only the sizes in card.styles.ts
  <Card size="xl">Content</Card>
);

export const headingProp = (
  // @ts-expect-error -- no `as`: a heading goes inside the title
  <CardTitle as="h3">Pricing</CardTitle>
);
