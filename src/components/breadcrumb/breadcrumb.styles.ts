import { tv } from "@utils/tv";

export const breadcrumbVariants = tv({
  slots: {
    list: [
      "flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground",
      "sm:gap-x-2.5"
    ],
    item: "inline-flex min-w-0 items-center gap-1.5 break-words sm:gap-2.5",
    separator: "inline-flex shrink-0 [--icon-size:0.875rem]",
    page: "font-medium text-foreground"
  }
});
