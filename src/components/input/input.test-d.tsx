// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Input } from "./input";

export const textTypes = (
  <>
    <Input aria-label="Name" />
    <Input aria-label="Email" type="email" />
    <Input aria-label="Quantity" type="number" min={1} max={10} />
  </>
);

export const checkbox = (
  // @ts-expect-error -- checkbox, radio and the like get their own components
  <Input aria-label="Agree" type="checkbox" />
);

export const typo = (
  // @ts-expect-error -- only the types in inputTypes
  <Input aria-label="Email" type="emial" />
);
