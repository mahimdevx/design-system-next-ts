import { tv } from "@utils/tv";

export const linkVariants = tv({
  base: [
    "rounded-xs underline-offset-4",
    "transition-[color,text-decoration-color] duration-200 ease-in-out",
    "outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50"
  ],
  variants: {
    variant: {
      // Inside running text: underlined, so it is not identified by color alone (WCAG 1.4.1)
      inline: [
        "text-accent-text underline decoration-accent-text/40",
        "hover:decoration-accent-text"
      ],
      // Navigation, footers, cards: placement already says "link"
      subtle: "text-muted-foreground hover:text-foreground"
    }
  },
  defaultVariants: {
    variant: "inline"
  }
});
