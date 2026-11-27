// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Input } from "./input";

export const textTypes = (
  <>
    <Input aria-label="Email" type="email" />
    <Input aria-label="Search" type="search" />
    <Input aria-label="Date" type="date" />
    <Input aria-label="Attachment" type="file" />
    <Input aria-label="Name" />
  </>
);

export const checkbox = (
  // @ts-expect-error -- checkbox, radio, range and color get their own controls
  <Input aria-label="Agree" type="checkbox" />
);

export const submit = (
  // @ts-expect-error -- a submit is a Button, not a text field
  <Input type="submit" value="Send" />
);

export const typo = (
  // @ts-expect-error -- only the types in inputTypes
  <Input aria-label="Email" type="emial" />
);
