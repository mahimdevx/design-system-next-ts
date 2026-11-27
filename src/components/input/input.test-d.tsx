// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Input } from "./input";

export const textTypes = (
  <>
    <Input aria-label="Name" />
    <Input aria-label="Email" type="email" maxLength={254} />
    <Input aria-label="Code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} />
    <Input aria-label="Quantity" type="number" min={1} max={10} step={1} />
  </>
);

export const checkbox = (
  // @ts-expect-error -- checkbox, radio, range and color get their own controls
  <Input aria-label="Agree" type="checkbox" />
);

export const date = (
  // @ts-expect-error -- date and time pickers aren't text fields here
  <Input aria-label="Start" type="date" />
);

export const typo = (
  // @ts-expect-error -- only the types in inputTypes
  <Input aria-label="Email" type="emial" />
);

export const rangeOnText = (
  // @ts-expect-error -- min, max and step only apply to type="number"
  <Input aria-label="Email" type="email" min={1} />
);

export const rangeWithoutType = (
  // @ts-expect-error -- without a type the field is text: no min
  <Input aria-label="Name" max={10} />
);

export const lengthOnNumber = (
  // @ts-expect-error -- maxLength and pattern don't apply to type="number"
  <Input aria-label="Quantity" type="number" maxLength={2} />
);
