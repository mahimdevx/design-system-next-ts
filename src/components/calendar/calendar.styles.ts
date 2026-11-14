import { tv } from "@utils/tv";

// The previous and next month buttons
const navButton = [
  "inline-flex size-(--cell-size) items-center justify-center rounded-md",
  "outline-hidden transition-colors duration-200 ease-in-out [--icon-size:1rem]",
  "hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50"
];

// The calendar is its own bordered box (also its placeholder, so nothing shifts)
const box = "rounded-lg border bg-background p-3";

// 2rem cells on phones keep a calendar with week numbers within 320px (WCAG 1.4.10)
const cellSize = "[--cell-size:2rem] sm:[--cell-size:2.5rem]";

// Slot names match DayPicker's classNames keys, so each one is passed straight through
export const calendarVariants = tv({
  slots: {
    root: ["relative w-fit text-sm text-foreground", box, cellSize],
    // Holds the calendar's place until it renders in the browser (see Calendar)
    placeholder: [
      "box-content",
      box,
      cellSize,
      "h-[calc(var(--cell-size)*7+1rem)] w-[calc(var(--cell-size)*7)]"
    ],
    months: "relative flex flex-col gap-4 sm:flex-row",
    // navLayout="around": previous button, caption, next button, then the grid
    month: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-y-4",
    button_previous: [navButton, "col-start-1 row-start-1"],
    button_next: [navButton, "col-start-3 row-start-1"],
    month_caption:
      "col-start-2 row-start-1 flex h-(--cell-size) items-center justify-center",
    caption_label: [
      "flex items-center gap-1 font-semibold select-none",
      "[--icon-size:0.875rem] [&>svg]:text-muted-foreground"
    ],
    dropdowns: "flex items-center justify-center gap-2",
    // A native <select>, invisible over its label, keeps the OS picker and keyboard
    dropdown_root: [
      "relative inline-flex h-8 items-center rounded-md border border-input px-2",
      "has-focus-visible:border-ring has-focus-visible:ring-3 has-focus-visible:ring-ring/50"
    ],
    dropdown: "absolute inset-0 cursor-pointer opacity-0",
    month_grid: "col-span-3 border-separate border-spacing-0",
    weekday: [
      "size-(--cell-size) p-0 font-mono text-xs font-semibold text-muted-foreground",
      "select-none"
    ],
    week_number_header: "size-(--cell-size) p-0",
    week_number:
      "size-(--cell-size) p-0 font-mono text-xs font-semibold text-muted-foreground",
    // data-selection comes from CalendarDay: single, start, middle or end
    day: [
      "group/day size-(--cell-size) p-0 text-center data-outside:text-muted-foreground",
      "data-[selection=end]:rounded-r-md data-[selection=end]:bg-muted",
      "data-[selection=middle]:bg-muted",
      "data-[selection=start]:rounded-l-md data-[selection=start]:bg-muted"
    ],
    day_button: [
      "relative inline-flex size-full items-center justify-center rounded-md",
      "font-mono font-semibold outline-hidden transition-colors duration-200 ease-in-out",
      "not-group-data-selection/day:hover:bg-muted",
      "focus-visible:z-10 focus-visible:ring-3 focus-visible:ring-ring/50",
      "disabled:pointer-events-none disabled:opacity-50",
      // Today: a muted fill, unless it is selected
      "group-data-today/day:not-group-data-[selection]/day:bg-muted",
      "group-data-[selection=end]/day:bg-primary group-data-[selection=end]/day:text-primary-foreground",
      "group-data-[selection=single]/day:bg-primary group-data-[selection=single]/day:text-primary-foreground",
      "group-data-[selection=start]/day:bg-primary group-data-[selection=start]/day:text-primary-foreground"
    ],
    footer: "mt-3",
    hidden: "invisible"
  }
});
