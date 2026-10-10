import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { headingVariants } from "@styles/elements/heading";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = ComponentProps<"h1"> &
  VariantProps<typeof headingVariants> & {
    // The heading level (h1–h6) sets the document outline; `size` only changes the look
    level: HeadingLevel;
  };

export function Heading({ level, size, weight, className, ...props }: HeadingProps) {
  const Component = `h${level}` as const;

  const headingClasses = headingVariants({ size: size ?? Component, weight, className });

  return (
    <Component
      data-slot="heading"
      data-size={size ?? Component}
      className={headingClasses}
      {...props}
    />
  );
}
