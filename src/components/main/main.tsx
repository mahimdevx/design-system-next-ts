import type { ComponentProps } from "react";

// The skip link's target. One <Main> per page, so the id is unique.
export const mainContentId = "main-content";

// No id prop: the root layout's <SkipLink> always points to #main-content, so a custom
// id would leave it without a target
type MainProps = Omit<ComponentProps<"main">, "id">;

/*
 * The page's main landmark and the target of <SkipLink>. Use it instead of <main> on
 * every page, so "Skip to content" always has somewhere to go.
 *
 * No tabIndex={-1}: current browsers move the Tab starting point to the link target on
 * their own (e2e/skip-link.spec.ts checks it), and a focusable <main> would show a focus
 * ring when clicked.
 */
export function Main(props: MainProps) {
  // id after the spread: untyped callers cannot override it either
  return <main data-slot="main" {...props} id={mainContentId} />;
}
