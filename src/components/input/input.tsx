import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { inputVariants } from "./input.styles";

// Types that are typed inside a box like this one. The rest aren't text fields: checkbox,
// radio, range and color get their own controls; button, submit, reset and image are
// Buttons; date and time pickers and file uploads aren't supported here; hidden needs no
// styling (use a plain <input type="hidden">).
// Exported for reuse; a list makes type errors show the allowed values
export const inputTypes = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
  "number"
] as const;

// Attributes that only apply to some types (HTML spec): browsers ignore them elsewhere,
// so the wrong pairing is a type error instead of a silent no-op
type RangeAttributes = "min" | "max" | "step";
type LengthAttributes = "minLength" | "maxLength" | "pattern";

type NativeProps = Omit<
  ComponentProps<"input">,
  "size" | "type" | RangeAttributes | LengthAttributes
>;

// A quantity: min, max and step limit and step the value (arrow keys, validation)
type NumberProps = Pick<ComponentProps<"input">, RangeAttributes> & {
  type: "number";
} & { [Key in LengthAttributes]?: never };

// Text you type: length and pattern limits. For digits that aren't a quantity (codes, card
// numbers, ZIP), use type="text" with inputMode="numeric": number drops leading zeros
type TextProps = Pick<ComponentProps<"input">, LengthAttributes> & {
  /**
   * The kind of value: picks the phone keyboard, autofill and built-in validation.
   * Optional: without it the browser uses `text`.
   */
  type?: Exclude<(typeof inputTypes)[number], "number">;
} & { [Key in RangeAttributes]?: never };

// size is the look (sm-xl, like Button), not the native character-width attribute
type InputProps = NativeProps &
  VariantProps<typeof inputVariants> &
  (NumberProps | TextProps);

/*
 * A plain <input> with the system's look. It needs a name: a Label (htmlFor + id) or
 * aria-label. For a label, help text and an error wired up for you, use TextField.
 * A server component with no state: the per-type props above are checked at build time.
 */
export function Input({ size = "base", className, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      data-size={size}
      className={inputVariants({ size, className })}
      {...props}
    />
  );
}
