import { tv } from "@utils/tv";

export const sectionVariants = tv({
  base: "w-full",
  variants: {
    // Vertical rhythm between page sections, fluid (--spacing-section-*)
    spacing: {
      sm: "py-section-sm",
      md: "py-section-md",
      lg: "py-section-lg"
    }
  },
  defaultVariants: {
    spacing: "md"
  }
});
