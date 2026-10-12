import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { headingVariants } from "./heading.styles";

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
  /** Font weight, limited to the weights loaded in src/styles/fonts.ts. */
  weight?: HeadingVariantProps["weight"];
};

export function Heading({ as, size, weight, className, ...props }: HeadingProps) {
  // `as` is required by the types. If it is still missing (untyped code, data), render
  // a neutral <div> instead of crashing the page or guessing a heading level.
  const Component = as ?? "div";
  const resolvedSize = size ?? as ?? "h2";

  const headingClasses = headingVariants({ size: resolvedSize, weight, className });

  return (
    <Component
      data-slot="heading"
      data-size={resolvedSize}
      className={headingClasses}
      {...props}
    />
  );
}
