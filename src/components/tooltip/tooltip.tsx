import type { ComponentProps, ReactNode } from "react";

import { Tooltip as TooltipPrimitive } from "radix-ui";

import { tooltipVariants } from "./tooltip.styles";

const { content: contentStyles, arrow: arrowStyles } = tooltipVariants();

/*
 * Wrap the app once (src/app/layout.tsx). Tooltips open after `delayDuration` (300ms here,
 * 700ms in Radix), and moving to another one within `skipDelayDuration` (300ms) opens it
 * at once, so a toolbar doesn't wait at every button.
 */
export function TooltipProvider({
  delayDuration = 300,
  ...props
}: ComponentProps<typeof TooltipPrimitive.Provider>) {
  return <TooltipPrimitive.Provider delayDuration={delayDuration} {...props} />;
}

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
  const contentClasses = contentStyles({ className });

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
        <TooltipPrimitive.Arrow className={arrowStyles()} />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

// `side` only applies to the shortcut; with the parts, set it on TooltipContent
type TooltipProps = ComponentProps<typeof TooltipPrimitive.Root> &
  (
    | {
        content: ReactNode;
        side?: ComponentProps<typeof TooltipPrimitive.Content>["side"];
      }
    | { content?: never; side?: never }
  );

/*
 * A short label for the element it points at, shown on hover and keyboard focus. Escape
 * closes it, and the pointer can move onto it without it closing (WCAG 1.4.13).
 * Text only: a tooltip never takes focus, so links or buttons inside can't be reached.
 *
 * Shortcut: <Tooltip content="Save"><Button>…</Button></Tooltip> (the child is the trigger).
 * Parts, for full control: <Tooltip><TooltipTrigger asChild>…</TooltipTrigger>
 * <TooltipContent>…</TooltipContent></Tooltip>
 */
export function Tooltip({ content, side, children, ...props }: TooltipProps) {
  if (content === undefined) {
    return <TooltipPrimitive.Root {...props}>{children}</TooltipPrimitive.Root>;
  }

  return (
    <TooltipPrimitive.Root {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipPrimitive.Root>
  );
}
