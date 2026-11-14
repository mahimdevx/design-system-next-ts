import { tv } from "@utils/tv";

export const tooltipVariants = tv({
  slots: {
    content: [
      "z-50 max-w-xs rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background",
      // A shortcut inside stays readable on the dark surface (base <kbd> is a light chip)
      "[&_kbd]:border-background/40 [&_kbd]:bg-transparent",
      // Grows from the trigger, slides in from the side it opens on
      "origin-(--radix-tooltip-content-transform-origin) animate-in fade-in-0 zoom-in-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
      "data-[state=closed]:zoom-out-95"
    ],
    arrow: "fill-foreground"
  }
});
