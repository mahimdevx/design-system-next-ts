// Type tests: never run, only compiled by `pnpm typecheck`. Each @ts-expect-error fails
// the typecheck if the line below it stops being a type error.
import { Avatar, AvatarImage } from "./avatar";

export const small = <Avatar size="sm" />;
export const decorative = <AvatarImage src="/maya.png" alt="" />;

export const unknownSize = (
  // @ts-expect-error -- only the sizes in avatar.styles.ts
  <Avatar size="lg" />
);

export const missingAlt = (
  // @ts-expect-error -- alt is required: "" when the name is already beside the image
  <AvatarImage src="/maya.png" />
);
