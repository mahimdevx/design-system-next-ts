import type { ComponentProps } from "react";

import { Check, ChevronRight, Circle } from "lucide-react";
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { Icon } from "@components/icon";

import { dropdownMenuVariants } from "./dropdown-menu.styles";

const { content, item, indicator, label, separator, shortcut } = dropdownMenuVariants();

type Inset = { inset?: boolean };

/*
 * A menu of actions or options opened from a button (WAI-ARIA menu button pattern).
 * Radix handles roles, focus, arrow keys, typeahead, Esc and focus return.
 * Root and Sub render no element, so they are Radix's own.
 */
export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuSub = DropdownMenuPrimitive.Sub;

// Use asChild with a Button; an icon-only one needs an aria-label
export function DropdownMenuTrigger(
  props: ComponentProps<typeof DropdownMenuPrimitive.Trigger>
) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

export function DropdownMenuContent({
  sideOffset = 4,
  collisionPadding = 8,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    // Rendered in <body>, so a parent's overflow or stacking can't clip it.
    // collisionPadding keeps it off the viewport edges on small screens.
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        className={content({ className })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}

export function DropdownMenuGroup(
  props: ComponentProps<typeof DropdownMenuPrimitive.Group>
) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

export function DropdownMenuLabel({
  inset,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Label> & Inset) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      className={label({ inset, className })}
      {...props}
    />
  );
}

// onSelect runs the action; the menu then closes (call event.preventDefault() to keep it open)
export function DropdownMenuItem({
  variant,
  inset,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Item> &
  VariantProps<typeof dropdownMenuVariants>) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-variant={variant}
      className={item({ variant, inset, className })}
      {...props}
    />
  );
}

// An on/off option: controlled with checked + onCheckedChange
export function DropdownMenuCheckboxItem({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={item({ inset: true, className })}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className={indicator()}>
        <Icon as={Check} />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

// One choice out of several: controlled with value + onValueChange
export function DropdownMenuRadioGroup(
  props: ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>
) {
  return (
    <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  );
}

export function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={item({ inset: true, className })}
      {...props}
    >
      <DropdownMenuPrimitive.ItemIndicator className={indicator()}>
        <Icon as={Circle} className="size-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={separator({ className })}
      {...props}
    />
  );
}

// A keyboard hint at the end of an item. It only shows the keys; the app binds them.
export function DropdownMenuShortcut({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={shortcut({ className })}
      {...props}
    />
  );
}

export function DropdownMenuSubTrigger({
  inset,
  className,
  children,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & Inset) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      className={item({ inset, className: ["data-[state=open]:bg-muted", className] })}
      {...props}
    >
      {children}
      <Icon as={ChevronRight} className="ml-auto rtl:-scale-x-100" />
    </DropdownMenuPrimitive.SubTrigger>
  );
}

/*
 * In a portal too (Radix's anatomy), so the parent menu's scrolling can't clip it.
 * alignOffset -5 (padding + border) lines its first item up with the trigger.
 */
export function DropdownMenuSubContent({
  alignOffset = -5,
  collisionPadding = 8,
  className,
  ...props
}: ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        alignOffset={alignOffset}
        collisionPadding={collisionPadding}
        className={content({ className: ["shadow-lg", className] })}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
}
