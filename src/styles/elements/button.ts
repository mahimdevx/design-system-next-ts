import { tv } from "tailwind-variants";

export const buttonVariants = tv({
  base: [
    "relative inline-flex shrink-0 items-center justify-center gap-2",
    "text-center font-medium whitespace-nowrap uppercase",
    "border border-transparent outline-none select-none",
    "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
    "active:not-aria-[haspopup]:translate-y-px",
    "disabled:pointer-events-none disabled:opacity-50",
    "transition-all duration-200 ease-in-out",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
  ],
  variants: {
    size: {
      xxs: "h-6 px-2 text-xs leading-4",
      xs: "h-8 px-4 text-xs leading-4",
      sm: "h-10 px-5 text-sm leading-4",
      base: "h-12 px-6 text-sm leading-4",
      lg: "h-14 px-7 text-base leading-4",
      xl: "h-16 px-8 text-lg leading-4"
    },
    variant: {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      accent: "bg-accent text-accent-foreground hover:bg-accent/90",
      soft: "bg-primary/5 text-primary hover:bg-primary/10",
      outline: [
        "border-primary bg-transparent text-primary",
        "hover:bg-primary hover:text-primary-foreground"
      ],
      muted: "bg-muted text-muted-foreground hover:bg-muted/80",
      ghost: "bg-transparent text-foreground hover:bg-muted",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      link: "h-auto bg-transparent px-0 text-primary underline-offset-4 hover:underline"
    },
    iconOnly: {
      true: "aspect-square px-0"
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-none"
    }
  },
  defaultVariants: {
    size: "base",
    variant: "primary",
    iconOnly: false,
    rounded: false
  }
});
