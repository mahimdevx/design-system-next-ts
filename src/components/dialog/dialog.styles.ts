import { tv } from "@utils/tv";

export const dialogVariants = tv({
  slots: {
    /*
     * The backdrop is also the scroll container (Radix's "scrollable overlay"): a dialog
     * taller than the screen scrolls as a whole instead of being cut off. p-4 keeps a
     * gutter on phones.
     */
    overlay: [
      "fixed inset-0 z-50 grid overflow-y-auto bg-black/50 p-4",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
    ],
    // m-auto, not place-items-center: a centered grid item taller than the overlay
    // would overflow at the top, out of scroll reach
    content: [
      "relative m-auto flex w-full max-w-lg flex-col gap-4 rounded-lg border bg-popover p-6 text-popover-foreground shadow-lg outline-hidden",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
    ],
    close: "absolute top-4 right-4",
    // pr-8 keeps a long title clear of the close button
    header: "flex flex-col gap-2 pr-8",
    // Stacked on phones with the main action on top; a row on wider screens
    footer: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    // An <h2>: the base layer sizes it as a page heading, so size, weight and tracking reset
    title: "text-lg leading-7 font-semibold tracking-normal",
    description: "text-sm text-muted-foreground"
  }
});
