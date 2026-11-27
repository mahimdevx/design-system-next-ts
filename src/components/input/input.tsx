import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { inputVariants } from "./input.styles";

// size is the look (sm-xl, like Button), not the native character-width attribute
type InputProps = Omit<ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>;

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
