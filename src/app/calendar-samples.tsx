"use client";

import { useState, type ReactNode } from "react";

import type { DateRange } from "@daypicker/react";

import { Calendar } from "@components/calendar";
import { Grid } from "@components/grid";
import { Heading } from "@components/heading";
import { Stack } from "@components/stack";

type SampleProps = { title: string; children: ReactNode; className?: string };

function Sample({ title, children, className }: SampleProps) {
  return (
    <Stack gap="2" className={className}>
      <Heading as="h3" size="h6">
        {title}
      </Heading>
      <div className="w-fit rounded-xl border">{children}</div>
    </Stack>
  );
}

function SingleSample() {
  const [selected, setSelected] = useState<Date>();

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
      // The footer is a live region, so screen readers hear the choice
      footer={
        <p className="text-muted-foreground">
          {selected
            ? `Selected: ${selected.toLocaleDateString(undefined, { dateStyle: "medium" })}`
            : "Pick a day."}
        </p>
      }
    />
  );
}

function RangeSample() {
  const [selected, setSelected] = useState<DateRange>();

  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={selected}
      onSelect={setSelected}
    />
  );
}

function RestrictedSample() {
  const [selected, setSelected] = useState<Date>();

  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      endMonth={new Date(2030, 11)}
      disabled={{ before: new Date() }}
      showWeekNumber
      selected={selected}
      onSelect={setSelected}
    />
  );
}

export function CalendarSamples() {
  return (
    <Grid columns="1" gap="8" className="lg:grid-cols-2">
      <Sample title="Single day">
        <SingleSample />
      </Sample>
      <Sample title="Menus, past days disabled, week numbers">
        <RestrictedSample />
      </Sample>
      <Sample title="Range over two months" className="lg:col-span-2">
        <RangeSample />
      </Sample>
    </Grid>
  );
}
