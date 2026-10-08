import { tv } from "@utils/tv";

export const textVariants = tv({
  variants: {
    // Visual style. The rendered element is chosen separately with `as`.
    variant: {
      h1: "scroll-m-20 text-h1 text-balance",
      h2: "scroll-m-20 text-h2 text-balance",
      h3: "scroll-m-20 text-h3 text-balance",
      h4: "scroll-m-20 text-h4 text-balance",
      h5: "scroll-m-20 text-h5 text-balance",
      h6: "scroll-m-20 text-h6 text-balance",
      lead: "text-lead text-pretty text-muted-foreground",
      body: "text-base leading-7 text-pretty",
      small: "text-sm leading-6",
      caption: "text-xs leading-5 text-muted-foreground",
      overline: "text-xs leading-4 font-semibold tracking-widest uppercase",
      label: "text-sm leading-none font-medium",
      code: "rounded-sm bg-muted px-[0.3em] py-[0.2em] font-mono text-[0.875em]"
    },
    // Text colors that pass WCAG AA on the background in both themes (-text tokens are
    // lighter in dark mode; warning has no text tone, it is a fill color only)
    tone: {
      foreground: "text-foreground",
      muted: "text-muted-foreground",
      accent: "text-accent-text",
      destructive: "text-destructive-text",
      success: "text-success-text"
    },
    // Only the weights loaded in src/libs/fonts.ts
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold"
    },
    align: {
      start: "text-start",
      center: "text-center",
      end: "text-end"
    },
    truncate: {
      true: "truncate"
    }
  },
  defaultVariants: {
    variant: "body"
  }
});
