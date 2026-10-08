import { cnMerge } from "tailwind-variants";

import { twMergeConfig } from "@utils/tv";

/**
 * Join class names and resolve Tailwind conflicts (the last class wins).
 * Accepts strings, arrays and { "class": condition } objects, like clsx.
 *
 * cn("px-2 text-sm", isLarge && "px-4") // => "text-sm px-4"
 */
export function cn(...classes: Parameters<typeof cnMerge>) {
  return cnMerge(...classes)({ twMergeConfig });
}
