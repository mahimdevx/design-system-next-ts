import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { textVariants } from "@styles/elements/text";

// Single source of truth: the types and the runtime check both come from this list
export const textElements = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "small",
  "strong",
  "em",
  "mark",
  "code",
  "kbd",
  "abbr",
  "time",
  "label",
  "legend",
  "figcaption",
  "blockquote",
  "cite",
  "dt",
  "dd"
] as const;

export type TextElement = (typeof textElements)[number];

type TextVariant = NonNullable<VariantProps<typeof textVariants>["variant"]>;

// Element used when only a variant is given (<Text variant="lead"> renders a <p>)
const variantElements = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  lead: "p",
  p: "p",
  small: "small",
  caption: "span",
  overline: "span",
  label: "label",
  code: "code"
} satisfies Record<TextVariant, TextElement>;

const textElementSet = new Set<string>(textElements);

// Invalid elements already reported, so a bad value logs once instead of on every render.
// Capped, so values from dynamic data cannot grow it without limit.
const reportedElements = new Set<string>();
const MAX_REPORTED = 50;

function reportInvalidElement(element: string) {
  if (reportedElements.has(element) || reportedElements.size >= MAX_REPORTED) return;
  reportedElements.add(element);

  console.error(
    `<Text as="${element}">: "${element}" is not a text element, rendering a <span> ` +
      `instead. Use one of: ${textElements.join(", ")}.`
  );
}

function isTextVariant(value: string): value is TextVariant {
  return value in variantElements;
}

/*
 * The element and the style follow each other by default:
 * - <Text as="h2">              → <h2>, h2 style
 * - <Text variant="lead">       → <p>, lead style
 * - <Text as="h2" variant="h4"> → <h2>, h4 style (looks smaller, keeps the outline)
 * - <Text as="strong">          → <strong>, no style: inherits from its parent
 * - <Text>                      → <p>, p style
 */
function resolveText(as: string | undefined, variant: TextVariant | undefined) {
  const element = as ?? (variant ? variantElements[variant] : "p");

  // Types already reject invalid elements; this guards untyped code and dynamic data.
  // Same in dev and production: warn and render a safe <span>, never crash the page.
  if (!textElementSet.has(element)) {
    reportInvalidElement(element);
    return { element: "span", variant };
  }

  return { element, variant: variant ?? (isTextVariant(element) ? element : undefined) };
}

// Generic over the element, so as="label" accepts htmlFor and as="time" dateTime
type TextProps<T extends TextElement> = {
  as?: T;
} & Omit<ComponentProps<T>, "color"> &
  VariantProps<typeof textVariants>;

export function Text<T extends TextElement = "p">({
  as,
  variant,
  weight,
  className,
  ...props
}: TextProps<T>) {
  const resolved = resolveText(as, variant);

  // TypeScript cannot check props against a union of 25 elements,
  // so it is checked as a <span> here.
  // Callers are still fully typed through TextProps<T>.
  const Component = resolved.element as "span";
  const elementProps = props as ComponentProps<"span">;

  const textClasses = textVariants({ variant: resolved.variant, weight, className });

  return (
    <Component
      data-slot="text"
      data-variant={resolved.variant}
      className={textClasses}
      {...elementProps}
    />
  );
}
