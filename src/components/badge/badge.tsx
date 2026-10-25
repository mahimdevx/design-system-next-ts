import type { ComponentProps } from "react";

import { Slot } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { badgeVariants } from "./badge.styles";

type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    /** Render the child element (e.g. a link) with badge styles. */
    asChild?: boolean;
  };

/*
 * A short label: status, category, count. Static by default (a <span>); with asChild it
 * styles a link, which then gets hover and focus states. For a clickable action, use
 * Button instead.
 */
export function Badge({
  variant = "primary",
  rounded,
  asChild = false,
  className,
  ...props
}: BadgeProps) {
  const Component = asChild ? Slot.Root : "span";

  const badgeClasses = badgeVariants({ variant, rounded, className });

  return (
    <Component
      data-slot="badge"
      data-variant={variant}
      className={badgeClasses}
      {...props}
    />
  );
}
