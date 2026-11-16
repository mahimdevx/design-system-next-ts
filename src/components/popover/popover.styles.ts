import { tv } from "@utils/tv";

export const popoverVariants = tv({
  slots: {
    // Same surface as DropdownMenu's content, duplicated on purpose (no coupling)
    content: [
      "z-50 flex w-72 flex-col gap-4 rounded-md border bg-popover p-4 text-sm text-popover-foreground shadow-md outline-hidden",
      // Never taller than the space Radix measured, so long content scrolls
      "max-h-(--radix-popover-content-available-height) overflow-y-auto",
      // Grows from the trigger, slides in from the side it opens on
      "origin-(--radix-popover-content-transform-origin)",
      "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
      "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2",
      "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
    ],
    header: "flex flex-col gap-1",
    // An <h2>: the base layer sizes it as a page heading, so size, weight and tracking reset
    title: "text-base leading-6 font-semibold tracking-normal",
    description: "text-muted-foreground"
  }
});
