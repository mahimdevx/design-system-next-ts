import type { ComponentProps } from "react";

import { mainContentId } from "@components/main";

import { skipLinkVariants } from "./skip-link.styles";

type SkipLinkProps = ComponentProps<"a">;

/*
 * "Skip to content" (WCAG 2.4.1 Bypass Blocks): the first focusable element on the page,
 * hidden until a keyboard user reaches it. Render it once in the root layout; it jumps to
 * <Main>. A plain <a>, not next/link: an in-page jump needs no client navigation.
 */
export function SkipLink({
  href = `#${mainContentId}`,
  children = "Skip to content",
  className,
  ...props
}: SkipLinkProps) {
  const skipLinkClasses = skipLinkVariants({ className });

  return (
    <a data-slot="skip-link" href={href} className={skipLinkClasses} {...props}>
      {children}
    </a>
  );
}
