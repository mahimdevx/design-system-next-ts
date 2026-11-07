import { tv } from "@utils/tv";

export const cardVariants = tv({
  slots: {
    root: [
      "flex flex-col gap-(--card-padding) overflow-hidden rounded-xl border py-(--card-padding)",
      "bg-card text-card-foreground has-data-[slot=card-footer]:pb-0",
      // Only a link card (asChild + <a>) is interactive: focus ring and hover
      "outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50",
      "transition-colors duration-200 ease-in-out [a&]:hover:bg-muted"
    ],
    header: [
      "grid gap-x-3 gap-y-1 px-(--card-padding)",
      "has-data-[slot=card-action]:grid-cols-[minmax(0,1fr)_auto]"
    ],
    // A heading inside keeps this look: the base layer would size it as a page heading
    title: "text-h6 text-balance [&>*]:tracking-[inherit] [&>*]:[font:inherit]",
    description: "text-sm leading-6 text-pretty text-muted-foreground",
    action: "col-start-2 row-span-2 row-start-1 self-start",
    content: "px-(--card-padding)",
    footer: "flex items-center gap-3 border-t bg-muted/50 p-(--card-padding)"
  },
  variants: {
    // One variable, so every part follows the size without needing the prop or client state
    size: {
      sm: { root: "[--card-padding:1rem]" },
      md: { root: "[--card-padding:1.5rem]" },
      lg: { root: "[--card-padding:2rem]" }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
