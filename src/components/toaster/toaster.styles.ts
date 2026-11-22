import { tv } from "@utils/tv";

import { buttonVariants } from "@components/button";

/*
 * Slot names match sonner's classNames keys, so each one is passed straight through.
 * Toasts are unstyled: sonner's own CSS still positions, stacks, animates and swipes them,
 * but it is unlayered, so it would beat these utilities on anything it styles itself.
 */
export const toasterVariants = tv({
  slots: {
    toast: [
      "flex w-(--width) items-center gap-3 rounded-lg border bg-popover p-4 shadow-lg",
      "font-sans text-popover-foreground [--icon-size:1rem]",
      // sonner sets a box-shadow on :focus-visible, so the focus ring is an outline
      "outline-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      // Room for the close button in the corner
      "has-data-close-button:pe-10"
    ],
    // Top-aligned with the title's first line
    icon: "flex shrink-0 self-start py-0.5",
    content: "flex min-w-0 flex-1 flex-col gap-0.5",
    title: "text-sm leading-5 font-medium",
    description: "text-sm leading-5 text-muted-foreground",
    actionButton: buttonVariants({ variant: "primary", size: "xs" }),
    cancelButton: buttonVariants({ variant: "muted", size: "xs" }),
    closeButton: [
      buttonVariants({ variant: "muted", size: "xxs", iconOnly: true, rounded: true }),
      "absolute end-2 top-2"
    ],
    // Status icons use the -text colors: the plain status colors are fills
    success: "*:data-icon:text-success-text",
    warning: "*:data-icon:text-warning-text",
    error: "*:data-icon:text-destructive-text"
  }
});
