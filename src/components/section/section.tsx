import type { ComponentProps } from "react";

import { Slot } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { sectionVariants } from "./section.styles";

type SectionProps = ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    /** Render the child element (e.g. <header>, <footer>) with the section's spacing. */
    asChild?: boolean;
  };

/*
 * A page section with consistent vertical spacing. A <section> is announced as a region
 * landmark only when it has a name: give it aria-labelledby pointing at its heading.
 */
export function Section({
  spacing = "md",
  asChild = false,
  className,
  ...props
}: SectionProps) {
  const Component = asChild ? Slot.Root : "section";

  const sectionClasses = sectionVariants({ spacing, className });

  return (
    <Component
      data-slot="section"
      data-spacing={spacing}
      className={sectionClasses}
      {...props}
    />
  );
}
