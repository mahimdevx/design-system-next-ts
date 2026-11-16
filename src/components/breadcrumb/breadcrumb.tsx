import type { ComponentProps } from "react";

import { Ellipsis } from "lucide-react";

import type { VariantProps } from "@utils/tv";

import { Icon } from "@components/icon";
import { Link } from "@components/link";

import { breadcrumbVariants } from "./breadcrumb.styles";

const { list, item, page, ellipsis } = breadcrumbVariants();

/*
 * Where the current page sits in the site, following the WAI-ARIA breadcrumb pattern
 */
export function Breadcrumb({
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: ComponentProps<"nav">) {
  // A navigation landmark; rename it when a page has two breadcrumbs
  return <nav data-slot="breadcrumb" aria-label={ariaLabel} {...props} />;
}

/*
 * The items' separator is drawn by CSS between them, never after the last one:
 * `separator` picks the shape ("chevron" by default, or "slash").
 */
export function BreadcrumbList({
  separator,
  className,
  ...props
}: ComponentProps<"ol"> & VariantProps<typeof breadcrumbVariants>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={list({ separator, className })}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={item({ className })} {...props} />;
}

// Link (next/link), so `href` is checked by typedRoutes and routing stays client-side
export function BreadcrumbLink<RouteType>(props: ComponentProps<typeof Link<RouteType>>) {
  return <Link data-slot="breadcrumb-link" variant="subtle" {...props} />;
}

// The current page: plain text marked aria-current, not a link to itself
export function BreadcrumbPage({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={page({ className })}
      {...props}
    />
  );
}

// Stands in for collapsed items; screen readers hear "More"
export function BreadcrumbEllipsis({ className, ...props }: ComponentProps<"span">) {
  return (
    <span data-slot="breadcrumb-ellipsis" className={ellipsis({ className })} {...props}>
      <Icon as={Ellipsis} />
      <span className="sr-only">More</span>
    </span>
  );
}
