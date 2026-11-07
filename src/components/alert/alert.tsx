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

type AlertTitleProps = ComponentProps<"p"> & {
  /** Plain text by default. Use a heading only if the alert belongs in the page outline. */
  as?: "p" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export function AlertTitle({
  as: Component = "p",
  className,
  ...props
}: AlertTitleProps) {
  const titleClasses = title({ className });

  return <Component data-slot="alert-title" className={titleClasses} {...props} />;
}

export function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  const descriptionClasses = description({ className });

  return <div data-slot="alert-description" className={descriptionClasses} {...props} />;
}

export function AlertAction({ className, ...props }: ComponentProps<"div">) {
  const actionClasses = action({ className });

  return <div data-slot="alert-action" className={actionClasses} {...props} />;
}
