"use client";

import { useSyncExternalStore, type ComponentProps } from "react";

import {
  DateLib,
  DayPicker,
  type ChevronProps,
  type DayProps,
  type Labels,
  type Modifiers,
  type RootProps
} from "@daypicker/react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

import { Icon } from "@components/icon";

import { calendarVariants } from "./calendar.styles";

const {
  root,
  placeholder,
  months,
  month,
  button_previous,
  button_next,
  month_caption,
  caption_label,
  dropdowns,
  dropdown_root,
  dropdown,
  month_grid,
  weekday,
  week_number_header,
  week_number,
  day,
  day_button,
  footer,
  hidden
} = calendarVariants();

const chevrons = {
  up: ChevronUp,
  down: ChevronDown,
  left: ChevronLeft,
  right: ChevronRight
};

function CalendarChevron({ orientation = "left", className }: ChevronProps) {
  return <Icon as={chevrons[orientation]} className={className} />;
}

function CalendarRoot({ rootRef, ...props }: RootProps) {
  return <div ref={rootRef} data-slot="calendar" {...props} />;
}

// One attribute for the selection, so its styles never compete
function selectionOf(modifiers: Modifiers) {
  if (modifiers.range_start && modifiers.range_end) return "single";
  if (modifiers.range_start) return "start";
  if (modifiers.range_end) return "end";
  if (modifiers.range_middle) return "middle";
  if (modifiers.selected) return "single";
  return undefined;
}

function CalendarDay({ day: _day, modifiers, ...props }: DayProps) {
  return <td data-selection={selectionOf(modifiers)} {...props} />;
}

/*
 * DayPicker's label without the ordinal ("Sunday, November 1, 2026", not "1st"), so the
 * visible number is a whole word in the button's name (WCAG 2.5.3, Label in Name)
 */
const labelDayButton: Labels["labelDayButton"] = (date, modifiers, options, dateLib) => {
  let label = (dateLib ?? new DateLib(options)).format(date, "EEEE, MMMM d, yyyy");
  if (modifiers.today) label = `Today, ${label}`;
  if (modifiers.selected) label = `${label}, selected`;
  return label;
};

const subscribe = () => () => {};

type CalendarProps = ComponentProps<typeof DayPicker>;

/*
 * A month grid for picking a day, several days or a range, built on DayPicker (keyboard,
 * focus and labels follow the WAI-ARIA date picker pattern). Pass DayPicker's props:
 * `mode`, `selected`, `onSelect`, `disabled`, `captionLayout`, `numberOfMonths`…
 *
 * "Today" and the first month shown depend on the browser's date, which a server or a
 * build cannot know, so the calendar renders after hydration and keeps its place until then.
 */
export function Calendar({
  className,
  classNames,
  components,
  labels,
  ...props
}: CalendarProps) {
  const isHydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  if (!isHydrated) {
    return (
      <div data-slot="calendar" aria-hidden className={placeholder({ className })} />
    );
  }

  return (
    <DayPicker
      // Buttons beside each month's caption: no extra <nav> landmark per calendar, and the
      // tab order follows the visual order
      navLayout="around"
      className={root({ className })}
      classNames={{
        months: months(),
        month: month(),
        button_previous: button_previous(),
        button_next: button_next(),
        month_caption: month_caption(),
        caption_label: caption_label(),
        dropdowns: dropdowns(),
        dropdown_root: dropdown_root(),
        dropdown: dropdown(),
        month_grid: month_grid(),
        weekday: weekday(),
        week_number_header: week_number_header(),
        week_number: week_number(),
        day: day(),
        day_button: day_button(),
        footer: footer(),
        hidden: hidden(),
        ...classNames
      }}
      labels={{ labelDayButton, ...labels }}
      components={{
        Root: CalendarRoot,
        Chevron: CalendarChevron,
        Day: CalendarDay,
        ...components
      }}
      {...props}
    />
  );
}
