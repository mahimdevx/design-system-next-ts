import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { inputVariants } from "./input.styles";

// Text-entry types only; checkbox, radio and the like get their own components.
// number is for quantities: codes and card numbers use type="text" inputMode="numeric".
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

// size is the look (sm-xl, like Button), not the native character-width attribute
type InputProps = Omit<ComponentProps<"input">, "size" | "type"> &
  VariantProps<typeof inputVariants> & {
    /** The kind of value: picks the phone keyboard and autofill. Defaults to `text`. */
    type?: (typeof inputTypes)[number];
  };

/*
 * A plain <input> with the system's look. It needs a name: a Label (htmlFor + id) or
 * aria-label. For a label, help text and an error wired up for you, use TextField.
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
