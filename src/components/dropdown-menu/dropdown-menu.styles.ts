import { tv } from "@utils/tv";

export const dropdownMenuVariants = tv({
  slots: {
    // The menu and its submenus
    content: [
      "z-50 min-w-32 overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      // Never taller than the space Radix measured, so long menus scroll
      "max-h-(--radix-dropdown-menu-content-available-height)",
      // Grows from the trigger, slides in from the side it opens on
      "origin-(--radix-dropdown-menu-content-transform-origin)",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    ],
    // Item, checkbox and radio items, submenu trigger
    item: [
      "relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none",
      "[--icon-size:1rem] *:data-[slot=icon]:text-muted-foreground",
      // Highlighted: hovered or reached with the arrow keys (the accent token is a fill)
      "data-highlighted:bg-muted",
      "data-disabled:pointer-events-none data-disabled:opacity-50"
    ],
    // Check or dot of a checkbox / radio item, in the inset space
    indicator:
      "pointer-events-none absolute left-2 flex size-4 items-center justify-center",
    label: "px-2 py-1.5 text-sm font-medium",
    separator: "-mx-1 my-1 h-px bg-border",
    shortcut: "ml-auto pl-4 text-xs tracking-widest text-muted-foreground"
  },
  variants: {
    variant: {
      default: {},
      /*
       * Irreversible actions: red text, the solid destructive fill when highlighted.
       * A red tint fails contrast in light mode (red text on bg-destructive/10: 4.0:1).
       */
      destructive: {
        item: [
          "text-destructive-text *:data-[slot=icon]:text-destructive-text",
          "data-highlighted:bg-destructive data-highlighted:text-destructive-foreground",
          "data-highlighted:*:data-[slot=icon]:text-destructive-foreground"
        ]
      }
    },
    // Lines the text up with items that have an indicator or icon
    inset: {
      true: { item: "pl-8", label: "pl-8" }
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
