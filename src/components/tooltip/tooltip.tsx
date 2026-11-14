import type { ComponentProps } from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

import { tooltipVariants } from "./tooltip.styles";

const { content, arrow } = tooltipVariants();

/*
 * Wrap the app once (src/app/layout.tsx). It sets the delay for every tooltip, and moving
 * between tooltips within skipDelayDuration opens the next one at once. Radix's defaults:
 * 700ms delay, 300ms skip.
 */
export const TooltipProvider = TooltipPrimitive.Provider;

/*
 * A short label for the element it points at, shown on hover and keyboard focus. Escape
 * closes it, and the pointer can move onto it without it closing (WCAG 1.4.13).
 * Text only: a tooltip never takes focus, so links or buttons inside can't be reached.
 * (Provider and Root render no element of their own, so they need no wrapper.)
 */
export const Tooltip = TooltipPrimitive.Root;

// Use asChild with a focusable element (a Button), so keyboard users can open it too
export function TooltipTrigger(props: ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

export function TooltipContent({
  sideOffset = 4,
  className,
  children,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Content>) {
  const contentClasses = content({ className });

  return (
    // Rendered in <body>, so a parent's overflow or stacking can't clip it
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={contentClasses}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className={arrow()} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
