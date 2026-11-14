"use client";

import { useSyncExternalStore, type ComponentProps } from "react";

import {
  DayPicker,
  type ChevronProps,
  type ClassNames,
  type DayProps,
  type Labels,
  type Modifiers
} from "@daypicker/react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

import { Icon } from "@components/icon";

import { calendarVariants } from "./calendar.styles";

const { root, placeholder, ...parts } = calendarVariants();

// The other slots are named after DayPicker's classNames keys, so they map straight across
const partClassNames: Partial<ClassNames> = Object.fromEntries(
  Object.entries(parts).map(([name, slot]) => [name, slot()])
);

// Arrows for the month buttons, chevrons for the month and year menus
const chevrons = { up: ChevronUp, down: ChevronDown, left: ArrowLeft, right: ArrowRight };

function CalendarChevron({ orientation = "left", className }: ChevronProps) {
  return <Icon as={chevrons[orientation]} className={className} />;
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
 * The day's full date in the calendar's locale ("Sunday, November 1, 2026",
 * "Sonntag, 1. November 2026"). DayPicker's English default says "1st", which keeps the
 * visible number out of the button's name (WCAG 2.5.3, Label in Name).
 */
const labelDayButton: Labels["labelDayButton"] = (date, modifiers, options) => {
  let label = new Intl.DateTimeFormat(options?.locale?.code ?? "en-US", {
    dateStyle: "full",
    timeZone: options?.timeZone
  }).format(date);
  if (modifiers.today) label = `Today, ${label}`;
  if (modifiers.selected) label = `${label}, selected`;
  return label;
};

const subscribe = () => () => {};

// navLayout is fixed to "around": the styles place those buttons and no other layout
// (Omit per mode: DayPicker's props are a union over `mode`, which a plain Omit would merge)
type CalendarProps =
  ComponentProps<typeof DayPicker> extends infer Props
    ? Props extends unknown
      ? Omit<Props, "navLayout">
      : never
    : never;

/*
 * A month grid for picking a day, several days or a range, built on DayPicker (keyboard,
 * focus and labels follow the WAI-ARIA date picker pattern). Takes DayPicker's props:
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
  showOutsideDays = true,
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
      data-slot="calendar"
      className={root({ className })}
      classNames={{ ...partClassNames, ...classNames }}
      labels={{ labelDayButton, ...labels }}
      components={{ Chevron: CalendarChevron, Day: CalendarDay, ...components }}
      showOutsideDays={showOutsideDays}
      {...props}
      // Buttons beside each month's caption: no <nav> landmark per calendar, and the tab
      // order follows the visual order (the docs ask for "after" or "around" with dropdowns)
      navLayout="around"
    />
  );
}
