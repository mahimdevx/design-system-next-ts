import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { textVariants } from "@styles/elements/text";

// Running text only: headings use <Heading>, inline code/kbd/quotes are plain HTML
type TextElement = "p" | "span" | "div";

type TextProps<T extends TextElement> = { as?: T } & ComponentProps<T> &
  VariantProps<typeof textVariants>;

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
