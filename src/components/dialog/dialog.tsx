import type { ComponentProps } from "react";

import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

import { Button } from "@components/button";
import { Icon } from "@components/icon";

import { dialogVariants } from "./dialog.styles";

const { overlay, content, close, header, footer, title, description } = dialogVariants();

/*
 * A modal window over the page (WAI-ARIA dialog pattern). Radix traps focus inside, hides
 * the page from screen readers, locks scrolling, closes on Esc or a click on the backdrop,
 * and returns focus to the trigger. Every dialog needs a DialogTitle: it names the dialog.
 * Root renders no element and Close is a plain button, so both are Radix's own.
 */
export const Dialog = DialogPrimitive.Root;
export const DialogClose = DialogPrimitive.Close;

// Use asChild with a Button
export function DialogTrigger(props: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

/*
 * The content sits inside the overlay, so a long dialog scrolls with the backdrop.
 * On open, focus goes to the first focusable element inside (the close button comes last).
 * showCloseButton={false} when the footer already has a way out.
 */
export function DialogContent({
  showCloseButton = true,
  className,
  children,
  ...props
}: ComponentProps<typeof DialogPrimitive.Content> & { showCloseButton?: boolean }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay data-slot="dialog-overlay" className={overlay()}>
        <DialogPrimitive.Content
          data-slot="dialog-content"
          className={content({ className })}
          {...props}
        >
          {children}
          {showCloseButton && (
            <DialogPrimitive.Close asChild>
              <Button
                data-slot="dialog-close"
                variant="muted"
                size="xs"
                iconOnly
                rounded
                aria-label="Close"
                className={close()}
              >
                <Icon as={X} />
              </Button>
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Overlay>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={header({ className })} {...props} />;
}

export function DialogFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={footer({ className })} {...props} />;
}

// Names the dialog (aria-labelledby). An <h2>; asChild for another element.
export function DialogTitle({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={title({ className })}
      {...props}
    />
  );
}

// Optional; Radix adds aria-describedby only when it is there
export function DialogDescription({
  className,
  ...props
}: ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={description({ className })}
      {...props}
    />
  );
}
