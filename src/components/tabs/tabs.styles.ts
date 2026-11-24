import { tv } from "@utils/tv";

/*
 * Orientation comes from the root (group/tabs), the look from the list (group/tabs-list):
 * Radix renders data-orientation and we render data-variant, so triggers style themselves
 * without props. Classes are written out in full: Tailwind finds them in the source text.
 */
export const tabsVariants = tv({
  slots: {
    root: "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
    list: [
      "group/tabs-list inline-flex w-fit items-center justify-center text-muted-foreground",
      "group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:items-stretch"
    ],
    trigger: [
      "relative inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md px-3",
      "text-sm font-medium whitespace-nowrap [--icon-size:1rem]",
      "transition-[color,background-color,box-shadow] duration-200 ease-in-out",
      // focus-visible:outline-hidden, not outline-hidden: in forced colors it becomes a real
      // outline, which belongs on the focused tab only, not around every tab
      "hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden",
      "disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground",
      "group-data-[orientation=vertical]/tabs:justify-start",
      // default: the active tab is a raised pill on the muted track
      "group-data-[variant=default]/tabs-list:data-[state=active]:bg-background",
      "group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm",
      // line: a bar under the active tab, or beside it when vertical (end side, so RTL flips)
      "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity",
      "group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
      "group-data-[orientation=horizontal]/tabs:after:inset-x-0",
      "group-data-[orientation=horizontal]/tabs:after:-bottom-1",
      "group-data-[orientation=horizontal]/tabs:after:h-0.5",
      "group-data-[orientation=vertical]/tabs:after:inset-y-0",
      "group-data-[orientation=vertical]/tabs:after:-inset-e-1",
      "group-data-[orientation=vertical]/tabs:after:w-0.5",
      // Forced colors drop the fill, shadow and bar: mark the active tab with system colors.
      // Opted out of forcing, or the browser paints a backplate over the label; important,
      // or the more specific default-variant fill (group selector) would win
      "forced-colors:data-[state=active]:bg-[Highlight]!",
      "forced-colors:data-[state=active]:text-[HighlightText]!",
      "forced-colors:data-[state=active]:forced-color-adjust-none"
    ],
    // Radix makes the panel focusable (tabIndex 0), so it needs a visible focus ring
    content: [
      "flex-1 rounded-md",
      "focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-hidden"
    ]
  },
  variants: {
    variant: {
      default: { list: "rounded-lg bg-muted p-1" },
      line: { list: "gap-1" }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
