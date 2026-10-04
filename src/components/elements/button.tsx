import type { ComponentProps } from "react";

import { Slot } from "radix-ui";
import type { VariantProps } from "tailwind-variants";

import { buttonVariants } from "@styles/elements/button";

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    // Render the child element (e.g. a link) with button styles instead of a <button>
    asChild?: boolean;
  };

export function Button({
  size = "base",
  variant = "primary",
  iconOnly,
  rounded,
  asChild = false,
  type = "button",
  className,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";

  const buttonClasses = buttonVariants({ size, variant, iconOnly, rounded, className });

  return (
    <Component
      data-slot="button"
      data-variant={variant}
      data-size={size}
      // A <button> inside a form defaults to "submit"; make it explicit
      type={asChild ? undefined : type}
      className={buttonClasses}
      {...props}
    />
  );
}
