import { BreadcrumbLink } from "./breadcrumb";

export const knownRoute = <BreadcrumbLink href="/demo">Demos</BreadcrumbLink>;

// @ts-expect-error -- hrefs are checked against the app's routes (typedRoutes)
export const unknownRoute = <BreadcrumbLink href="/no-such-page">Nowhere</BreadcrumbLink>;
