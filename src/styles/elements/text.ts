import { tv } from "@utils/tv";

export const textVariants = tv({
  variants: {
    // Visual style. Defaults to the element's own style (as="h2" → h2); set it to
    // make an element look different (as="h2" variant="h4").
    variant: {
      h1: "scroll-m-20 text-h1 text-balance",
      h2: "scroll-m-20 text-h2 text-balance",
      h3: "scroll-m-20 text-h3 text-balance",
      h4: "scroll-m-20 text-h4 text-balance",
      h5: "scroll-m-20 text-h5 text-balance",
      h6: "scroll-m-20 text-h6 text-balance",
      lead: "text-lead text-pretty text-muted-foreground",
      p: "text-base leading-7 text-pretty",
      small: "text-sm leading-6",
      caption: "text-xs leading-5 text-muted-foreground",
      overline: "text-xs leading-4 font-semibold tracking-widest uppercase",
      label: "text-sm leading-none font-medium",
      code: "rounded-sm bg-muted px-[0.3em] py-[0.2em] font-mono text-[0.875em]"
    },
    // Only the weights loaded in src/libs/fonts.ts
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    }
  }
});
