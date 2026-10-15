import { tv } from "@utils/tv";

export const stackVariants = tv({
  base: "flex",
  variants: {
    direction: {
      column: "flex-col",
      row: "flex-row"
    },
    // Spacing scale (Tailwind steps). Same scale as Grid, duplicated on purpose: no coupling
    gap: {
      "0": "gap-0",
      "1": "gap-1",
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "8": "gap-8",
      "10": "gap-10",
      "12": "gap-12",
      "16": "gap-16"
    },
    // Cross axis
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      baseline: "items-baseline",
      stretch: "items-stretch"
    },
    // Main axis
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between"
    },
    wrap: {
      true: "flex-wrap"
    }
  },
  defaultVariants: {
    direction: "column",
    gap: "4"
  }
});
