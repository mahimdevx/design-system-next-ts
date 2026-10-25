import { tv } from "@utils/tv";

export const skipLinkVariants = tv({
  base: [
    // Parked just above the viewport; slides in when focused. A transform (not sr-only)
    // keeps it in the accessibility tree and avoids toggling position utilities.
    "fixed top-4 left-4 z-50 -translate-y-[calc(100%+2rem)] focus:translate-y-0",
    "rounded-md border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-md",
    "outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50",
    "transition-transform duration-200 ease-in-out"
  ]
});
