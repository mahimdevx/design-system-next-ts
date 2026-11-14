import type { ComponentProps, ReactNode } from "react";

import type { Route } from "next";

import { ChevronRight } from "lucide-react";

import { Icon } from "@components/icon";
import { Link } from "@components/link";

import { breadcrumbVariants } from "./breadcrumb.styles";

const { list, item, separator: separatorStyles, page } = breadcrumbVariants();

type BreadcrumbLinkItem = { label: ReactNode; href: Route };
type BreadcrumbPageItem = { label: ReactNode; href?: never };

type BreadcrumbProps = Omit<ComponentProps<"nav">, "children"> & {
  /** Parent pages with an `href` (checked by typedRoutes), then the current page without one */
  items: [...BreadcrumbLinkItem[], BreadcrumbPageItem];
  /** Between items; hidden from screen readers. Default: a chevron */
  separator?: ReactNode;
};

/*
 * Where the current page sits in the site, following the WAI-ARIA breadcrumb pattern: a
 * labelled <nav> landmark with an ordered list of links, separators hidden from screen
 * readers, and aria-current="page" on the last item.
 */
export function Breadcrumb({
  items,
  separator = <Icon as={ChevronRight} />,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbProps) {
  const links = items.slice(0, -1) as BreadcrumbLinkItem[];
  const current = items.at(-1) as BreadcrumbPageItem;

  return (
    <nav data-slot="breadcrumb" aria-label={ariaLabel} {...props}>
      <ol className={list()}>
        {links.map(({ label, href }) => (
          <li key={href} className={item()}>
            <Link href={href} variant="subtle">
              {label}
            </Link>
            <span
              data-slot="breadcrumb-separator"
              aria-hidden
              className={separatorStyles()}
            >
              {separator}
            </span>
          </li>
        ))}
        <li className={item()}>
          <span data-slot="breadcrumb-page" aria-current="page" className={page()}>
            {current.label}
          </span>
        </li>
      </ol>
    </nav>
  );
}
