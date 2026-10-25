import { tv } from "@utils/tv";

export const badgeVariants = tv({
  base: [
    "inline-flex h-6 shrink-0 items-center justify-center gap-1 px-2.5",
    "text-xs font-semibold tracking-wide whitespace-nowrap uppercase",
    "overflow-hidden border border-transparent",
    // Icons inside follow the badge (see Icon): no per-icon size needed
    "[--icon-size:0.75rem]",
    // Only a link badge (asChild + <a>) is interactive: focus ring and hover below
    "outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50",
    "transition-colors duration-200 ease-in-out"
  ],
  variants: {
    // Same names as Button, plus the status colors
    variant: {
      primary: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/80",
      accent: "bg-accent text-accent-foreground [a&]:hover:bg-accent/90",
      soft: "bg-primary/5 text-primary [a&]:hover:bg-primary/10",
      outline: [
        "border-primary text-primary",
        "[a&]:hover:bg-primary [a&]:hover:text-primary-foreground"
      ],
      muted: "bg-muted text-muted-foreground [a&]:hover:bg-muted/80",
      success: "bg-success text-success-foreground [a&]:hover:bg-success/90",
      warning: "bg-warning text-warning-foreground [a&]:hover:bg-warning/90",
      destructive:
        "bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90"
    },
    // Corners from the radius scale; `rounded` makes a pill, like Button
    rounded: {
      true: "rounded-full",
      false: "rounded-md"
    }
  },
  defaultVariants: {
    variant: "primary",
    rounded: false
  }
});
