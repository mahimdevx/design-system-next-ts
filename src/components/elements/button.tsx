import type { ComponentProps } from "react";

import { Slot } from "radix-ui";
import type { VariantProps } from "tailwind-variants";

import { buttonVariants } from "@styles/elements/button";

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, "iconOnly">;

// An icon-only button has no visible text, so it must have an accessible name
type IconOnlyProps =
  | { iconOnly: true; "aria-label": string }
  | { iconOnly: true; "aria-labelledby": string }
  | { iconOnly?: false };

// asChild renders the child element (e.g. a link) with button styles.
// A link cannot be disabled, so `disabled` is only allowed on a real <button>
type AsChildProps = { asChild: true; disabled?: never } | { asChild?: false };

type ButtonProps = ComponentProps<"button"> &
  ButtonVariantProps &
  IconOnlyProps &
  AsChildProps;

export function Button({
  size = "base",
  variant = "primary",
  iconOnly,
  rounded,
  asChild = false,
  className,
  type = "button",
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
