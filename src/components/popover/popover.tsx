import type { ComponentProps } from "react";

import { Popover as PopoverPrimitive } from "radix-ui";

import { popoverVariants } from "./popover.styles";

const { content, header, title, description } = popoverVariants();

/*
 * Rich content in a floating panel opened from a button: a short form, filters, details.
 * For a list of actions use DropdownMenu (menu semantics, arrow keys); for a short label,
 * Tooltip. Non-modal by default: Tab can leave it, and a click outside closes it.
 * Root renders no element and Close is a plain button, so both are Radix's own.
 */
export const Popover = PopoverPrimitive.Root;
export const PopoverClose = PopoverPrimitive.Close;

// Use asChild with a Button; an icon-only one needs an aria-label
export function PopoverTrigger(props: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

// Positions the content against another element than the trigger
export function PopoverAnchor(props: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

/*
 * A dialog for assistive tech: name it with a PopoverTitle (or aria-label). On open, focus
 * goes to the first focusable element inside, else the panel; Esc returns it to the trigger.
 */
export function PopoverContent({
  sideOffset = 4,
  collisionPadding = 8,
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    // Rendered in <body>, so a parent's overflow or stacking can't clip it.
    // collisionPadding keeps it off the viewport edges on small screens.
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={content({ className })}
        {...props}
      />
    </PopoverPrimitive.Portal>
  );
}

export function PopoverHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="popover-header" className={header({ className })} {...props} />;
}

// Radix wires it to the content's aria-labelledby. An <h2>; asChild for another element.
export function PopoverTitle({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Title>) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={title({ className })}
      {...props}
    />
  );
}

// Radix wires it to the content's aria-describedby
export function PopoverDescription({
  className,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Description>) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={description({ className })}
      {...props}
    />
  );
}
