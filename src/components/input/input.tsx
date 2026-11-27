import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { inputVariants } from "./input.styles";

// Types that are typed or picked inside a box like this one. The rest aren't text fields:
// checkbox, radio, range and color get their own controls; button, submit, reset and image
// are Buttons; hidden needs no styling (use a plain <input type="hidden">).
// Exported for reuse; a list makes type errors show the allowed values
export const inputTypes = [
  "text",
  "email",
  "password",
  "search",
  "tel",
  "url",
  "number",
  "date",
  "time",
  "datetime-local",
  "month",
  "week",
  "file"
] as const;

// size is the look (sm-xl, like Button), not the native character-width attribute
type InputProps = Omit<ComponentProps<"input">, "size" | "type"> &
  VariantProps<typeof inputVariants> & {
    /**
     * The kind of value: picks the phone keyboard, autofill and built-in validation.
     * Optional: without it the browser uses `text`.
     */
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
