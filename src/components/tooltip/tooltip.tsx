import type { ComponentProps, ReactElement, ReactNode } from "react";

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

/*
 * The parts, for anything the shortcut doesn't cover (align, offsets, className, controlled
 * open): <TooltipRoot><TooltipTrigger asChild>…</TooltipTrigger>
 * <TooltipContent>…</TooltipContent></TooltipRoot>
 * (Radix's Root renders no element of its own, so it needs no wrapper.)
 */
export const TooltipRoot = TooltipPrimitive.Root;

type TooltipProps = Omit<ComponentProps<typeof TooltipPrimitive.Root>, "children"> & {
  /** The tooltip's text: a string, or a short node such as `<>Bold <kbd>Ctrl B</kbd></>` */
  content: ReactNode;
  side?: ComponentProps<typeof TooltipPrimitive.Content>["side"];
  /** The trigger: one focusable element, such as a Button */
  children: ReactElement;
};

/*
 * A short label for the element it points at, shown on hover and keyboard focus. Escape
 * closes it, and the pointer can move onto it without it closing (WCAG 1.4.13).
 * Text only: a tooltip never takes focus, so links or buttons inside can't be reached.
 *
 * <Tooltip content="Save"><Button>…</Button></Tooltip>: the child becomes the trigger.
 * One element only, so passing the parts here is a type error (use TooltipRoot for those).
 */
export function Tooltip({ content, side, children, ...props }: TooltipProps) {
  return (
    <TooltipRoot {...props}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side}>{content}</TooltipContent>
    </TooltipRoot>
  );
}
