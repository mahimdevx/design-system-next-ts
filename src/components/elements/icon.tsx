import type { LucideIcon, LucideProps } from "lucide-react";
import type { VariantProps } from "tailwind-variants";

import { iconVariants } from "@styles/elements/icon";

type IconProps = Omit<LucideProps, "size"> &
  VariantProps<typeof iconVariants> & {
    icon: LucideIcon;
  };

// Decorative by default: lucide sets aria-hidden unless an aria-label/title is passed
export function Icon({ icon: Component, size = "sm", className, ...props }: IconProps) {
  const iconClasses = iconVariants({ size, className });

  return (
    <Component data-slot="icon" data-size={size} className={iconClasses} {...props} />
  );
}
