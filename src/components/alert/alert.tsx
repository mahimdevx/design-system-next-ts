import type { ComponentProps } from "react";

import type { VariantProps } from "@utils/tv";

import { alertVariants } from "./alert.styles";

const { root, title, description, action } = alertVariants();

type AlertProps = ComponentProps<"div"> & VariantProps<typeof alertVariants>;

/*
 * A message that stands out from the page. Static by default: nothing is announced. When
 * one appears while the page is open, pass role="status", or role="alert" if it is urgent
 * enough to interrupt a screen reader.
 */
export function Alert({ variant = "primary", className, ...props }: AlertProps) {
  const alertClasses = root({ variant, className });

  return (
    <div data-slot="alert" data-variant={variant} className={alertClasses} {...props} />
  );
}

/*
 * Plain text, so alerts stay out of the page outline. If one belongs there, put a heading
 * of the right level inside: <AlertTitle><h2>Payment failed</h2></AlertTitle>.
 */
export function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  const titleClasses = title({ className });

  return <div data-slot="alert-title" className={titleClasses} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  const descriptionClasses = description({ className });

  return <div data-slot="alert-description" className={descriptionClasses} {...props} />;
}

export function AlertAction({ className, ...props }: ComponentProps<"div">) {
  const actionClasses = action({ className });

  return <div data-slot="alert-action" className={actionClasses} {...props} />;
}
