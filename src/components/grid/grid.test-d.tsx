// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Grid } from "./grid";

export const fixedColumns = <Grid columns="3" />;
export const intrinsic = <Grid minItemWidth="16rem" />;
export const intrinsicCh = <Grid minItemWidth="30ch" />;

export const both = (
  // @ts-expect-error -- columns and minItemWidth are mutually exclusive
  <Grid columns="3" minItemWidth="16rem" />
);

export const unitless = (
  // @ts-expect-error -- minItemWidth needs a unit
  <Grid minItemWidth="16" />
);

export const tooManyColumns = (
  // @ts-expect-error -- 1 to 12 columns
  <Grid columns="13" />
);

export const offScaleGap = (
  // @ts-expect-error -- gap uses the spacing scale
  <Grid gap="7" />
);
