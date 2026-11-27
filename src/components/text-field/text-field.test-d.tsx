// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { TextField } from "./text-field";

export const field = <TextField label="Email" type="email" size="lg" error="Required" />;

export const noLabel = (
  // @ts-expect-error -- a visible label is required
  <TextField type="email" />
);

export const nativeSize = (
  // @ts-expect-error -- size is the look (sm-xl), not the native character width
  <TextField label="Code" size={6} />
);

export const notATextField = (
  // @ts-expect-error -- the same types as Input: a checkbox isn't a text field
  <TextField label="Remember me" type="checkbox" />
);

export const quantity = <TextField label="Seats" type="number" min={1} max={8} />;

export const rangeOnText = (
  // @ts-expect-error -- the same per-type attributes as Input: min needs type="number"
  <TextField label="Email" type="email" min={1} />
);
