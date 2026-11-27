import { tv } from "@utils/tv";

export const inputVariants = tv({
  base: [
    "w-full min-w-0 rounded-md border border-input bg-transparent text-foreground shadow-xs",
    "transition-[color,border-color,box-shadow] duration-200 ease-in-out",
    "selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground",
    // Focus: no ring around the field. The border turns dark and doubles to 2px, drawn
    // inside (inset-ring), so nothing shifts. Forced colors get outline-hidden's outline
    "focus-visible:border-ring focus-visible:inset-ring-1 focus-visible:inset-ring-ring focus-visible:outline-hidden",
    // Invalid: the -text color, so the border keeps 3:1 in dark mode (destructive is a fill).
    // It stays red on focus and doubles like a valid field, so focus is still visible
    "aria-invalid:border-destructive-text aria-invalid:focus-visible:inset-ring-destructive-text",
    "disabled:cursor-not-allowed disabled:opacity-50",
    // The file button fills the height, so its text centers like the rest of the field
    "file:me-3 file:h-full file:border-0 file:bg-transparent file:font-medium file:text-foreground"
  ],
  variants: {
    // Same heights as Button's sm-xl, so a field and a button line up in a row.
    // 16px text on phones: iOS Safari zooms into inputs with smaller text. To change the
    // text size of sm/base, override both: className="text-lg sm:text-lg"
    size: {
      sm: "h-10 px-3 text-base sm:text-sm",
      base: "h-12 px-4 text-base sm:text-sm",
      lg: "h-14 px-4 text-base",
      xl: "h-16 px-5 text-lg"
    }
  },
  defaultVariants: {
    size: "base"
  }
});
