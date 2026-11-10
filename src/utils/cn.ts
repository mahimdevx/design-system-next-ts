import { createCN } from "tailwind-variants/lite";

import { twMerge } from "@utils/tv";

/**
 * Join class names and resolve Tailwind conflicts (the last class wins).
 * Accepts strings, arrays and { "class": condition } objects, like clsx.
 *
 * cn("px-2 text-sm", isLarge && "px-4") // => "text-sm px-4"
 */
export const cn = createCN({ twMerge });
