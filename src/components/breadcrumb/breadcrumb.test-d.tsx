import { Breadcrumb } from "./breadcrumb";

export const trail = (
  <Breadcrumb
    items={[
      { label: "Home", href: "/" },
      { label: "Demos", href: "/demo" },
      { label: "Store" }
    ]}
  />
);

export const currentPageOnly = <Breadcrumb items={[{ label: "Home" }]} />;

// @ts-expect-error -- the last item is the current page: it has no href
export const linkedCurrentPage = <Breadcrumb items={[{ label: "Home", href: "/" }]} />;

export const unlinkedParent = (
  // @ts-expect-error -- every parent page needs an href
  <Breadcrumb items={[{ label: "Home" }, { label: "Store" }]} />
);

// @ts-expect-error -- at least the current page
export const empty = <Breadcrumb items={[]} />;

export const unknownRoute = (
  // @ts-expect-error -- hrefs are checked against the app's routes (typedRoutes)
  <Breadcrumb items={[{ label: "Home", href: "/no-such-page" }, { label: "Store" }]} />
);
