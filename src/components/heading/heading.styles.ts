import { tv } from "@utils/tv";

export const headingVariants = tv({
  base: "scroll-m-20 text-balance",
  variants: {
    // Visual size, independent of the heading level (the element)
    size: {
      h1: "text-h1",
      h2: "text-h2",
      h3: "text-h3",
      h4: "text-h4",
      h5: "text-h5",
      h6: "text-h6"
    },
    // Only the weights loaded in src/styles/fonts.ts
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    }
  }
});
