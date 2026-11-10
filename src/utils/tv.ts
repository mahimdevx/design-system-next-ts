import { extendTailwindMerge } from "tailwind-merge";
import { createTV } from "tailwind-variants/lite";

/*
 * Teach tailwind-merge about the custom tokens in globals.css. Without this, it reads
 * `text-h1` as a text color, and `cn("text-h1", "text-accent")` drops the font size.
 * Add new custom scales here when globals.css gains them.
 */
export const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["h1", "h2", "h3", "h4", "h5", "h6", "lead"],
      // Named spacing (px-gutter, py-section-md), so they replace other paddings
      spacing: ["gutter", "section-sm", "section-md", "section-lg"]
    }
  }
});

// Use this tv() everywhere instead of importing it from tailwind-variants
export const tv = createTV({ twMerge });

export type { VariantProps } from "tailwind-variants/lite";
