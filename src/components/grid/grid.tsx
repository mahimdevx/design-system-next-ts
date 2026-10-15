import type { ComponentProps, CSSProperties } from "react";

import { Slot } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { gridVariants } from "./grid.styles";

type GridVariantProps = VariantProps<typeof gridVariants>;

// A CSS length with its unit: "16rem", "20ch", "240px"
type CssLength = `${number}${"rem" | "em" | "ch" | "px"}`;

// Either a fixed column count or a minimum item width, never both
type GridColumnsProps =
  | {
      /** Fixed number of equal columns. */
      columns?: GridVariantProps["columns"];
      minItemWidth?: never;
    }
  | {
      /**
       * Fit as many columns as the space allows, each at least this wide. Responsive
       * without breakpoints: 4 columns on desktop, 1 on a phone.
       */
      minItemWidth: CssLength;
      columns?: never;
    };

type GridProps = ComponentProps<"div"> &
  Omit<GridVariantProps, "columns" | "autoFill"> &
  GridColumnsProps & {
    /** Render the child element (e.g. <ul>) with the grid's layout. */
    asChild?: boolean;
  };

/*
 * Two-dimensional layout. Prefer minItemWidth for card and feature grids; use columns for
 * fixed layouts, and className for breakpoint-specific ones (md:grid-cols-3).
 */
export function Grid({
  columns,
  minItemWidth,
  gap = "4",
  align,
  asChild = false,
  className,
  style,
  ...props
}: GridProps) {
  const Component = asChild ? Slot.Root : "div";

  const gridClasses = gridVariants({
    columns,
    autoFill: minItemWidth != null,
    gap,
    align,
    className
  });

  const gridStyle = minItemWidth
    ? ({ ...style, "--grid-min-item-width": minItemWidth } as CSSProperties)
    : style;

  return (
    <Component data-slot="grid" className={gridClasses} style={gridStyle} {...props} />
  );
}
