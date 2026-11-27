import type { ComponentProps } from "react";

import { Label as LabelPrimitive } from "radix-ui";

import { labelVariants } from "./label.styles";

/*
 * Names a form control: point htmlFor at the control's id, or wrap the control. Radix's
 * label keeps a double-click from selecting the label text. TextField wires it for you.
 */
export function Label({
  className,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={labelVariants({ className })}
      {...props}
    />
  );
}
