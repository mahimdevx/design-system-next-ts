import { tv } from "@utils/tv";

export const breadcrumbVariants = tv({
  slots: {
    list: [
      "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground",
      "sm:gap-x-2.5"
    ],
    /*
     * Every item but the last draws the separator after itself: a pseudo-element, so no
     * markup, nothing for screen readers, and it stays with its item when the trail wraps.
     * The shape is a mask filled with the text color; the list's `separator` picks it.
     * forced-color-adjust-none: forced-colors mode would repaint the fill to the background.
     */
    item: [
      "inline-flex min-w-0 items-center gap-1.5 wrap-break-word",
      "not-last:after:size-3.5 not-last:after:shrink-0 not-last:after:bg-current",
      "not-last:after:mask-(--breadcrumb-separator) not-last:after:mask-contain",
      "not-last:after:forced-color-adjust-none"
    ],
    page: "font-medium text-foreground",
    ellipsis: "inline-flex items-center [--icon-size:1rem]"
  },
  variants: {
    // Lucide's chevron-right and slash, fully URL-encoded: no spaces (Tailwind keeps `_` in
    // url()) and no quotes (its class scanner reads the source text, escapes included)
    separator: {
      chevron: {
        list: [
          "[--breadcrumb-separator:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27black%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27m9%2018%206-6-6-6%27/%3E%3C/svg%3E)]",
          // Points the other way in right-to-left text
          "rtl:*:not-last:after:-scale-x-100"
        ]
      },
      slash: {
        list: "[--breadcrumb-separator:url(data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27black%27%20stroke-width=%272%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M22%202%202%2022%27/%3E%3C/svg%3E)]"
      }
    }
  },
  defaultVariants: {
    separator: "chevron"
  }
});
