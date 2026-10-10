import type { ComponentProps, ComponentType, SVGProps } from "react";

import type { VariantProps } from "@utils/tv";

import { iconVariants } from "@styles/elements/icon";

// Any SVG component: lucide icons and the custom icons in @components/icons
type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

type IconProps = ComponentProps<"svg"> &
  VariantProps<typeof iconVariants> & {
    // The icon to render: <Icon as={Check} />
    as: IconComponent;
  };

export function Icon({ as: Component, size, className, ...props }: IconProps) {
  const iconClasses = iconVariants({ size, className });

  // aria-label / aria-labelledby make the icon meaningful;
  // without them it is decorative
  const isLabelled = Boolean(props["aria-label"] ?? props["aria-labelledby"]);

  return (
    <Component
      data-slot="icon"
      data-size={size}
      role={isLabelled ? "img" : undefined}
      aria-hidden={isLabelled ? undefined : true}
      className={iconClasses}
      {...props}
    />
  );
}
