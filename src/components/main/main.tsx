import type { ComponentProps } from "react";

// The skip link's target. One <Main> per page, so the id is unique.
export const mainContentId = "main-content";

type MainProps = ComponentProps<"main">;

/*
 * The page's main landmark and the target of <SkipLink>. Use it instead of <main> on
 * every page, so "Skip to content" always has somewhere to go.
 *
 * No tabIndex={-1}: current browsers move the Tab starting point to the link target on
 * their own (e2e/skip-link.spec.ts checks it), and a focusable <main> would show a focus
 * ring when clicked.
 */
export function Main({ id = mainContentId, ...props }: MainProps) {
  return <main id={id} data-slot="main" {...props} />;
}
