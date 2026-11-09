import { tv } from "@utils/tv";

export const avatarVariants = tv({
  slots: {
    root: "relative inline-flex shrink-0 overflow-hidden rounded-full select-none",
    image: "aspect-square size-full object-cover",
    fallback: "flex size-full items-center justify-center bg-muted text-muted-foreground"
  },
  variants: {
    // Text and icons in the fallback follow the root (see Icon)
    size: {
      sm: { root: "size-8 text-xs [--icon-size:1rem]" },
      md: { root: "size-10 text-sm [--icon-size:1.25rem]" }
    }
  },
  defaultVariants: {
    size: "md"
  }
});
