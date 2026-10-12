import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { headingVariants } from "./heading.styles";

// Allowed elements. Exported for reuse; a list makes type errors
// show the allowed values instead of a type name
export const headingElements = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;

type HeadingElement = (typeof headingElements)[number];

type HeadingVariantProps = VariantProps<typeof headingVariants>;

type HeadingProps = ComponentProps<"h1"> & {
  /**
   * The heading element. It sets the document outline, so it is required:
   * keep one h1 per page and do not skip levels. For the look, use `size`.
   *
   * @example <Heading as="h2">Section</Heading>
   */
  as: HeadingElement;
  /**
   * How the heading looks, independent of `as`. Defaults to the size of `as`.
   *
   * @example <Heading as="h2" size="h4">Smaller section</Heading>
   */
  size?: HeadingVariantProps["size"];
  /** Font weight, limited to the weights loaded in src/styles/fonts.ts. */
  weight?: HeadingVariantProps["weight"];
};

function isHeadingElement(value: unknown): value is HeadingElement {
  return headingElements.includes(value as HeadingElement);
}

// Each invalid value is reported once, not on every render
const reported = new Set<string>();

function reportInvalidHeading(value: unknown) {
  const key = String(value);
  if (reported.has(key) || reported.size >= 50) return;
  reported.add(key);

  console.error(
    `<Heading as={${JSON.stringify(value)}}>: "as" must be one of ${headingElements.join(", ")}. ` +
      `Rendering a <div> so the page keeps working.`
  );
}

export function Heading({ as, size, weight, className, ...props }: HeadingProps) {
  // `as` is required by the types. If it still arrives missing or invalid (untyped code,
  // CMS data), never crash the page and never guess a heading level: render a neutral
  // <div>, which keeps the layout without adding a fake section to the outline.
  const isValid = isHeadingElement(as);
  if (!isValid) reportInvalidHeading(as);

  const Component = isValid ? as : "div";
  const resolvedSize = size ?? (isValid ? as : "h2");

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
