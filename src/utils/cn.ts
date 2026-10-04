/**
 * Join class names and resolve Tailwind conflicts (the last class wins).
 * Accepts strings, arrays and { "class": condition } objects, like clsx.
 *
 * cn("px-2 text-sm", isLarge && "px-4") // => "text-sm px-4"
 */
export { cn } from "tailwind-variants";
