import type { ComponentProps } from "react";

import { ChevronRight, Ellipsis } from "lucide-react";

import { Icon } from "@components/icon";
import { Link } from "@components/link";

import { breadcrumbVariants } from "./breadcrumb.styles";

const { list, item, page, separator, ellipsis } = breadcrumbVariants();

/*
 * Where the current page sits in the site, following the WAI-ARIA breadcrumb pattern:
 *
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem><BreadcrumbPage>Store</BreadcrumbPage></BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 *
 * Server components: no client JavaScript.
 */
export function Breadcrumb({
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: ComponentProps<"nav">) {
  // A navigation landmark; rename it when a page has two breadcrumbs
  return <nav data-slot="breadcrumb" aria-label={ariaLabel} {...props} />;
}

export function BreadcrumbList({ className, ...props }: ComponentProps<"ol">) {
  return <ol data-slot="breadcrumb-list" className={list({ className })} {...props} />;
}

export function BreadcrumbItem({ className, ...props }: ComponentProps<"li">) {
  return <li data-slot="breadcrumb-item" className={item({ className })} {...props} />;
}

// Our Link (next/link), so `href` is checked by typedRoutes and routing stays client-side
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

// Hidden from screen readers. Default: a chevron; pass children for another one
export function BreadcrumbSeparator({
  children = <Icon as={ChevronRight} />,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden
      className={separator({ className })}
      {...props}
    >
      {children}
    </li>
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
