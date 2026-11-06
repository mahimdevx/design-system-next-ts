import { tv } from "@utils/tv";

export const alertVariants = tv({
  base: [
    "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] rounded-lg border p-4",
    // Icons inside follow the alert (see Icon). The tracks collapse without an icon or action
    "[--icon-size:1.25rem] [&>svg]:col-start-1 [&>svg]:row-span-2 [&>svg]:mt-0.5 [&>svg]:mr-3"
  ],
  variants: {
    // Same names as Badge. Status colors are a tint, so long text stays easy to read
    variant: {
      primary: "border-transparent bg-primary text-primary-foreground",
      secondary: "border-transparent bg-secondary text-secondary-foreground",
      accent: "border-transparent bg-accent text-accent-foreground",
      soft: "border-transparent bg-primary/5 text-primary",
      outline: "border-primary text-primary",
      muted: "border-transparent bg-muted text-muted-foreground",
      success:
        "border-success/40 bg-success/10 text-foreground [&>svg]:text-success-text",
      warning:
        "border-warning/60 bg-warning/10 text-foreground [&>svg]:text-warning-text",
      destructive:
        "border-destructive/40 bg-destructive/10 text-foreground [&>svg]:text-destructive-text"
    }
  },
  defaultVariants: {
    variant: "primary"
  }
});

export const alertTitleVariants = tv({
  base: "col-start-2 text-base leading-6 font-semibold text-balance"
});

export const alertDescriptionVariants = tv({
  // Links take the alert's color: the accent text color fails contrast on filled variants
  base: "col-start-2 text-sm leading-6 text-pretty [&_a]:text-inherit [&_a]:decoration-current"
});

export const alertActionVariants = tv({
  // Beside the text, so long text can't run under it; below the text on phones
  base: "col-start-2 mt-3 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:mt-0 sm:ml-3"
});
