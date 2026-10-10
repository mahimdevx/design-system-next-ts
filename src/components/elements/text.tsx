import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { textVariants } from "@styles/elements/text";

// Running text only: headings use <Heading>, inline code/kbd/quotes are plain HTML
type TextElement = "p" | "span" | "div";

type TextVariantProps = VariantProps<typeof textVariants>;

type TextProps<T extends TextElement> = ComponentProps<T> & {
  /**
   * The HTML element to render: `p` (default), `span` (inline) or `div`.
   * This sets the semantics only. For the look, use `variant`.
   *
   * @example <Text as="span" variant="caption">8 Oct</Text>
   */
  as?: T;
  /**
   * How the text looks: `lead`, `p` (default), `small`, `caption`, `overline`, `label`.
   *
   * @example <Text variant="caption">Photo by …</Text>
   */
  variant?: TextVariantProps["variant"];
  /** Font weight, limited to the weights loaded in src/libs/fonts.ts. */
  weight?: TextVariantProps["weight"];
};

export function Text<T extends TextElement = "p">({
  as,
  variant = "p",
  weight,
  className,
  ...props
}: TextProps<T>) {
  // Checked as a <p> internally; callers are typed for the element they pass in `as`
  const Component = (as ?? "p") as "p";

  const elementProps = props as ComponentProps<"p">;

  const textClasses = textVariants({ variant, weight, className });

  return (
    <Component
      data-slot="text"
      data-variant={variant}
      className={textClasses}
      {...elementProps}
    />
  );
}
