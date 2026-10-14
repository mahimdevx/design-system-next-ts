// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Plus } from "lucide-react";

import { Icon } from "@components/icon";

import { Button } from "./button";

// An icon-only button has no visible text, so it needs an accessible name
export const iconOnlyLabelled = (
  <Button iconOnly aria-label="Add item">
    <Icon as={Plus} />
  </Button>
);
export const iconOnlyLabelledBy = (
  <Button iconOnly aria-labelledby="add-label">
    <Icon as={Plus} />
  </Button>
);
export const iconOnlyUnlabelled = (
  // @ts-expect-error -- iconOnly without aria-label or aria-labelledby
  <Button iconOnly>
    <Icon as={Plus} />
  </Button>
);

// A link cannot be disabled, so asChild rules out `disabled`
export const disabledButton = <Button disabled>Save</Button>;
export const disabledAsChild = (
  // @ts-expect-error -- disabled is only allowed on a real <button>
  <Button asChild disabled>
    <a href="/docs">Docs</a>
  </Button>
);

export const unknownVariant = (
  // @ts-expect-error -- only the variants in button.styles.ts
  <Button variant="ghost">Save</Button>
);
