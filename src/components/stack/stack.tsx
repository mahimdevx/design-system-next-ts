import type { ComponentProps } from "react";

import { Slot } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { stackVariants } from "./stack.styles";

type StackProps = ComponentProps<"div"> &
  VariantProps<typeof stackVariants> & {
    /** Render the child element (e.g. <ul>, <nav>) with the stack's layout. */
    asChild?: boolean;
  };

/*
 * One-dimensional layout: children in a column (default) or a row, spaced with gap.
 * Breakpoint changes stay in className: <Stack className="md:flex-row">.
 */
export function Stack({
  direction = "column",
  gap = "4",
  align,
  justify,
  wrap,
  asChild = false,
  className,
  ...props
}: StackProps) {
  const Component = asChild ? Slot.Root : "div";

  const stackClasses = stackVariants({ direction, gap, align, justify, wrap, className });

  return (
    <Component
      data-slot="stack"
      data-direction={direction}
      className={stackClasses}
      {...props}
    />
  );
}
