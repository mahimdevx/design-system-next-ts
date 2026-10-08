import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { textVariants } from "@styles/elements/text";

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>;

// HTML elements that hold text. `as` is limited to these.
type TextElement =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div"
  | "small"
  | "strong"
  | "em"
  | "mark"
  | "code"
  | "kbd"
  | "abbr"
  | "time"
  | "label"
  | "legend"
  | "figcaption"
  | "blockquote"
  | "cite"
  | "dt"
  | "dd"
  | "li";

// The element each variant renders when `as` is not given
const defaultElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  body: "p",
  small: "p",
  caption: "span",
  overline: "span",
  label: "span",
  code: "code"
} satisfies Record<TextVariant, TextElement>;

// Generic over the element, so `as="label"` accepts htmlFor and `as="time"` dateTime
type TextProps<T extends TextElement> = {
  as?: T;
} & Omit<ComponentProps<T>, "color"> &
  VariantProps<typeof textVariants>;

export function Text<T extends TextElement = "p">({
  as,
  variant = "body",
  tone,
  weight,
  align,
  truncate,
  className,
  ...props
}: TextProps<T>) {
  // TypeScript cannot check props against a union of 25 elements, so it is checked as a
  // <span> here. Callers are still fully typed through TextProps<T>.
  const Component = (as ?? defaultElements[variant]) as "span";
  const elementProps = props as ComponentProps<"span">;

  const textClasses = textVariants({ variant, tone, weight, align, truncate, className });

  return (
    <Component
      data-slot="text"
      data-variant={variant}
      className={textClasses}
      {...elementProps}
    />
  );
}
