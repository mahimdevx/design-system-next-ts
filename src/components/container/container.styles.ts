import { tv } from "@utils/tv";

export const containerVariants = tv({
  // Centered with margin-inline, fluid side padding (--spacing-gutter): RTL-safe, no
  // breakpoint jumps
  base: "mx-auto w-full px-gutter",
  variants: {
    // Max content width: sm for reading and forms, md for documentation, lg for app pages
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      full: "max-w-none"
    }
  },
  defaultVariants: {
    size: "lg"
  }
});
