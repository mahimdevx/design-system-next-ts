import { tv } from "@utils/tv";

export const textFieldVariants = tv({
  slots: {
    root: "group/text-field flex flex-col gap-2",
    // The label sits before the input, so it reads the disabled state from the root
    label: "group-has-disabled/text-field:opacity-50",
    description: "text-sm leading-5 text-muted-foreground",
    // The -text color: plain destructive is a fill and fails as text in dark mode
    error: "text-sm leading-5 font-medium text-destructive-text"
  }
});
