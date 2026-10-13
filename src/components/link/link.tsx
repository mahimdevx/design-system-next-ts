import type { ComponentProps } from "react";

import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import type { VariantProps } from "@utils/tv";

import { linkVariants } from "./link.styles";

// Anchor attributes (target, rel, children, aria-*…) plus Next's link props, composed the
// same way next/link does. Without typedRoutes, NextLinkProps has no anchor attributes.
type LinkProps<RouteType> = Omit<ComponentProps<"a">, keyof NextLinkProps<RouteType>> &
  NextLinkProps<RouteType> &
  VariantProps<typeof linkVariants>;

/*
 * Generic like next/link itself, so typedRoutes keeps checking `href` against real routes.
 * Every next/link prop passes through: transitionTypes (view transitions), onNavigate,
 * prefetch, replace, scroll.
 */
export function Link<RouteType>({
  variant = "inline",
  className,
  ...props
}: LinkProps<RouteType>) {
  const linkClasses = linkVariants({ variant, className });

  return (
    <NextLink
      data-slot="link"
      data-variant={variant}
      className={linkClasses}
      {...props}
    />
  );
}
