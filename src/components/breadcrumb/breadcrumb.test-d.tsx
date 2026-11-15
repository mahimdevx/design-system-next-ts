import { Breadcrumb } from "./breadcrumb";

export const trail = (
  <Breadcrumb
    links={[
      { label: "Home", href: "/" },
      { label: "Demos", href: "/demo" }
    ]}
    current="Store"
  />
);

export const currentPageOnly = <Breadcrumb links={[]} current="Home" />;

export const unlinkedParent = (
  // @ts-expect-error -- every parent page needs an href
  <Breadcrumb links={[{ label: "Home" }]} current="Store" />
);

export const withoutCurrent = (
  // @ts-expect-error -- the current page is required
  <Breadcrumb links={[{ label: "Home", href: "/" }]} />
);

export const unknownRoute = (
  // @ts-expect-error -- hrefs are checked against the app's routes (typedRoutes)
  <Breadcrumb links={[{ label: "Home", href: "/no-such-page" }]} current="Store" />
);
