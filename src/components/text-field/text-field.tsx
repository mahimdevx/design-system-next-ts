import { useId, type ComponentProps, type ReactNode } from "react";

import { Input } from "@components/input";
import { Label } from "@components/label";

import { textFieldVariants } from "./text-field.styles";

const slots = textFieldVariants();

type TextFieldProps = ComponentProps<typeof Input> & {
  // Required: a field without a visible label is a guessing game
  label: ReactNode;
  // Help text under the input, read after the label
  description?: ReactNode;
  // Shown under the input; marks it invalid. Move focus to the first invalid field (or an
  // error summary) on submit, so screen reader users hear about it
  error?: ReactNode;
};

/*
 * A labelled text input with help text and an error, wired for assistive tech: the label
 * names the input, the description and error describe it (aria-describedby), and an error
 * sets aria-invalid. A server component: useId works without "use client".
 * className styles the wrapper (width, placement); the other props go to the input.
 *
 * Pass an id for a field in a layout: server useId ids restart at each client-side
 * navigation, so a layout field and one on the next page could get the same id.
 */
export function TextField({
  label,
  description,
  error,
  id,
  className,
  "aria-describedby": describedBy,
  "aria-invalid": ariaInvalid,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedByIds =
    [descriptionId, errorId, describedBy].filter(Boolean).join(" ") || undefined;

  return (
    <div data-slot="text-field" className={slots.root({ className })}>
      <Label htmlFor={inputId} className={slots.label()}>
        {label}
      </Label>
      <Input
        id={inputId}
        aria-describedby={describedByIds}
        aria-invalid={error ? true : ariaInvalid}
        {...props}
      />
      {description && (
        <p
          id={descriptionId}
          data-slot="text-field-description"
          className={slots.description()}
        >
          {description}
        </p>
      )}
      {error && (
        <p id={errorId} data-slot="text-field-error" className={slots.error()}>
          {error}
        </p>
      )}
    </div>
  );
}
