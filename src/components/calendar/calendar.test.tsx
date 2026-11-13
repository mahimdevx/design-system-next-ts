import { useState } from "react";

import type { DateRange } from "@daypicker/react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";

import { Calendar } from "./calendar";

const january = new Date(2026, 0, 1);

function SingleCalendar() {
  const [selected, setSelected] = useState<Date>();

  return (
    <Calendar
      mode="single"
      defaultMonth={january}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function RangeCalendar() {
  const [selected, setSelected] = useState<DateRange>();

  return (
    <Calendar
      mode="range"
      defaultMonth={january}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function dayButton(day: number) {
  return screen.getByRole("button", {
    name: new RegExp(`January ${day}, 2026`)
  });
}

function dayCell(day: number) {
  return screen.getAllByRole("gridcell").find((cell) => cell.textContent === String(day));
}

describe("Calendar", () => {
  test("shows the month as a labelled grid", () => {
    render(<Calendar defaultMonth={january} />);

    expect(screen.getByRole("grid", { name: "January 2026" })).toBeInTheDocument();
  });

  test("selects the day that is clicked", async () => {
    const user = userEvent.setup();
    render(<SingleCalendar />);

    await user.click(dayButton(15));

    expect(screen.getByRole("gridcell", { selected: true })).toHaveTextContent("15");
  });

  test("arrow keys move focus between days", async () => {
    const user = userEvent.setup();
    render(<SingleCalendar />);

    await user.click(dayButton(15));
    await user.keyboard("{ArrowRight}");

    expect(dayButton(16)).toHaveFocus();
  });

  test("the next month button moves to the next month", async () => {
    const user = userEvent.setup();
    render(<Calendar defaultMonth={january} />);

    await user.click(screen.getByRole("button", { name: /next month/i }));

    expect(screen.getByRole("grid", { name: "February 2026" })).toBeInTheDocument();
  });

  // Documented contract: data-selection is what the range styles hook into
  test("marks the start, middle and end of a range", async () => {
    const user = userEvent.setup();
    render(<RangeCalendar />);

    await user.click(dayButton(10));
    await user.click(dayButton(14));

    expect(dayCell(10)).toHaveAttribute("data-selection", "start");
    expect(dayCell(12)).toHaveAttribute("data-selection", "middle");
    expect(dayCell(14)).toHaveAttribute("data-selection", "end");
  });
});
