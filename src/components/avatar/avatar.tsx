import type { ComponentProps } from "react";

import { Avatar as AvatarPrimitive } from "radix-ui";

import type { VariantProps } from "@utils/tv";

import { avatarVariants } from "./avatar.styles";

const { root, image, fallback } = avatarVariants();

type AvatarProps = ComponentProps<typeof AvatarPrimitive.Root> &
  VariantProps<typeof avatarVariants>;

/*
 * A person or brand's image, with a fallback while it loads or if it fails. Radix tracks
 * the image's loading state in the browser, so the image only appears after hydration.
 */
export function Avatar({ size = "md", className, ...props }: AvatarProps) {
  const avatarClasses = root({ size, className });

  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={avatarClasses}
      {...props}
    />
  );
}

type AvatarImageProps = ComponentProps<typeof AvatarPrimitive.Image> & {
  /** Who or what the image shows. Use "" when the name is already in the text beside it. */
  alt: string;
};

export function AvatarImage({ className, ...props }: AvatarImageProps) {
  const imageClasses = image({ className });

  return (
    <AvatarPrimitive.Image data-slot="avatar-image" className={imageClasses} {...props} />
  );
}

export function AvatarFallback({
  className,
  ...props
}: ComponentProps<typeof AvatarPrimitive.Fallback>) {
  const fallbackClasses = fallback({ className });

  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={fallbackClasses}
      {...props}
    />
  );
}
