import NextLink, { type LinkProps as NextLinkProps } from "next/link";

import type { VariantProps } from "@utils/tv";

import { linkVariants } from "./link.styles";

type LinkProps<RouteType> = NextLinkProps<RouteType> & VariantProps<typeof linkVariants>;

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
