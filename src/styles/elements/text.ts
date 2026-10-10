import { tv } from "@utils/tv";

export const textVariants = tv({
  base: "text-pretty",
  variants: {
    variant: {
      lead: "text-lead text-muted-foreground",
      p: "text-base leading-7",
      small: "text-sm leading-6",
      caption: "text-xs leading-5 text-muted-foreground",
      overline: "text-xs leading-4 font-semibold tracking-widest uppercase",
      label: "text-sm leading-none font-medium"
    },
    // Only the weights loaded in src/libs/fonts.ts
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    }
  },
  defaultVariants: {
    variant: "p"
  }
});
