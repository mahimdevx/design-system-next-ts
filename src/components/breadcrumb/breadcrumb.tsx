import type { ComponentProps, ReactNode } from "react";

import type { Route } from "next";

import { ChevronRight } from "lucide-react";

import { Icon } from "@components/icon";
import { Link } from "@components/link";

import { breadcrumbVariants } from "./breadcrumb.styles";

const { list, item, separator: separatorStyles, page } = breadcrumbVariants();

type BreadcrumbProps = Omit<ComponentProps<"nav">, "children"> & {
  /** Parent pages, in order. Each `href` is checked against the app's routes (typedRoutes) */
  links: { label: ReactNode; href: Route }[];
  /** The current page: shown last, not a link */
  current: ReactNode;
  /** Between items; hidden from screen readers. Default: a chevron */
  separator?: ReactNode;
};

/*
 * Where the current page sits in the site, following the WAI-ARIA breadcrumb pattern: a
 * labelled <nav> landmark with an ordered list of links, separators hidden from screen
 * readers, and aria-current="page" on the current page.
 */
export function Breadcrumb({
  links,
  current,
  separator = <Icon as={ChevronRight} />,
  "aria-label": ariaLabel = "Breadcrumb",
  ...props
}: BreadcrumbProps) {
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
            {current}
          </span>
        </li>
      </ol>
    </nav>
  );
}
