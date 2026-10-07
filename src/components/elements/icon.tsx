import type { ComponentProps, ComponentType, SVGProps } from "react";

import type { VariantProps } from "tailwind-variants";

import { iconVariants } from "@styles/elements/icon";

// Any SVG component: lucide icons and the custom icons in @components/icons
export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconProps = ComponentProps<"svg"> &
  VariantProps<typeof iconVariants> & {
    icon: IconComponent;
    // Makes the icon meaningful to screen readers. Omit it for decorative icons.
    label?: string;
  };

export function Icon({ icon: Component, size, label, className, ...props }: IconProps) {
  const iconClasses = iconVariants({ size, className });

  const accessibleName = label ?? props["aria-label"];
  const isLabelled = Boolean(accessibleName ?? props["aria-labelledby"]);

  return (
    <Component
      data-slot="icon"
      data-size={size}
      // Meaningful icons are announced as images; decorative ones are hidden
      role={isLabelled ? "img" : undefined}
      aria-hidden={isLabelled ? undefined : true}
      className={iconClasses}
      {...props}
      aria-label={accessibleName}
    />
  );
}
