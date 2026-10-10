import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { headingVariants } from "@styles/elements/heading";

// Allowed elements. Exported for reuse; a list makes type errors
// show the allowed values instead of a type name
export const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

type HeadingVariantProps = VariantProps<typeof headingVariants>;

type HeadingProps = ComponentProps<"h1"> & {
  /**
   * The heading element. It sets the document outline, so it is required:
   * keep one h1 per page and do not skip levels. For the look, use `size`.
   *
   * @example <Heading as="h2">Section</Heading>
   */
  as: (typeof headingElements)[number];
  /**
   * How the heading looks, independent of `as`. Defaults to the size of `as`.
   *
   * @example <Heading as="h2" size="h4">Smaller section</Heading>
   */
  size?: HeadingVariantProps["size"];
  /** Font weight, limited to the weights loaded in src/libs/fonts.ts. */
  weight?: HeadingVariantProps["weight"];
};

export function Heading({
  as: Component,
  size = Component,
  weight,
  className,
  ...props
}: HeadingProps) {
  const headingClasses = headingVariants({ size, weight, className });

  return (
    <Component
      data-slot="heading"
      data-size={size}
      className={headingClasses}
      {...props}
    />
  );
}
