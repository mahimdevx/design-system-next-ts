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
  href,
  variant = "inline",
  className,
  ...props
}: LinkProps<RouteType>) {
  const linkClasses = linkVariants({ variant, className });

  // `href` is required by the types. If it is still missing, render a placeholder <a>
  // (no href: not focusable, not announced as a link) instead of crashing or guessing "/".
  if (href == null) {
    return (
      <a data-slot="link" data-variant={variant} className={linkClasses} {...props} />
    );
  }

  return (
    <NextLink
      href={href}
      data-slot="link"
      data-variant={variant}
      className={linkClasses}
      {...props}
    />
  );
}
