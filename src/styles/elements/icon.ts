import { tv } from "tailwind-variants";

export const iconVariants = tv({
  // Without a size prop the icon uses --icon-size, which parents (Button, Badge...) set
  // to match their own size. Falls back to 1rem (16px).
  base: "pointer-events-none size-[var(--icon-size,1rem)] shrink-0",
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      base: "size-5",
      lg: "size-6",
      xl: "size-8"
    }
  }
});
