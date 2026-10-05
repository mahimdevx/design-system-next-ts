import { tv } from "tailwind-variants";

export const iconVariants = tv({
  base: "pointer-events-none shrink-0",
  variants: {
    size: {
      xs: "size-3",
      sm: "size-4",
      base: "size-5",
      lg: "size-6",
      xl: "size-8"
    }
  },
  defaultVariants: {
    size: "sm"
  }
});
