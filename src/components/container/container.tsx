import type { ComponentProps } from "react";

import { Slot } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { containerVariants } from "./container.styles";

type ContainerProps = ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & {
    /** Render the child element (e.g. <main>, <header>) with the container's styles. */
    asChild?: boolean;
  };

// Page width and side padding in one place. Nest it inside full-width backgrounds:
// <Section className="bg-muted"><Container>…</Container></Section>
export function Container({
  size = "lg",
  asChild = false,
  className,
  ...props
}: ContainerProps) {
  const Component = asChild ? Slot.Root : "div";

  const containerClasses = containerVariants({ size, className });

  return (
    <Component
      data-slot="container"
      data-size={size}
      className={containerClasses}
      {...props}
    />
  );
}
