import type { ComponentProps } from "react";

import { Tabs as TabsPrimitive } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { tabsVariants } from "./tabs.styles";

const { root, list, trigger, content } = tabsVariants();

/*
 * Panels of content, one shown at a time (WAI-ARIA tabs pattern). Radix wires the roles
 * and ids, moves between tabs with the arrow keys (Home/End too) and selects on focus.
 * Only the active panel renders; Tab moves from the tabs into it.
 */
export function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root data-slot="tabs" className={root({ className })} {...props} />
  );
}

type TabsListProps = ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsVariants>;

// The row (or column) of tabs. Name it with aria-label when the page has no visible label.
// It doesn't scroll: keep a horizontal row short enough for a 320px screen (about three
// short labels with icons); for many options, a select fits better
export function TabsList({ variant = "default", className, ...props }: TabsListProps) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={list({ variant, className })}
      {...props}
    />
  );
}

export function TabsTrigger({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={trigger({ className })}
      {...props}
    />
  );
}

export function TabsContent({
  className,
  ...props
}: ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={content({ className })}
      {...props}
    />
  );
}
