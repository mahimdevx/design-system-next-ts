// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Alert, AlertTitle } from "./alert";

export const status = <Alert variant="success">Saved</Alert>;
export const title = <AlertTitle>Saved</AlertTitle>;

export const unknownVariant = (
  // @ts-expect-error -- only the variants in alert.styles.ts
  <Alert variant="info">Info</Alert>
);

export const headingProp = (
  // @ts-expect-error -- no `as`: a heading goes inside the title
  <AlertTitle as="h3">Saved</AlertTitle>
);
