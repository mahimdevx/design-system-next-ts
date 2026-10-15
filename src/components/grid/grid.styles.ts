import { tv } from "@utils/tv";

export const gridVariants = tv({
  base: "grid",
  variants: {
    // Fixed number of equal columns
    columns: {
      "1": "grid-cols-1",
      "2": "grid-cols-2",
      "3": "grid-cols-3",
      "4": "grid-cols-4",
      "5": "grid-cols-5",
      "6": "grid-cols-6",
      "7": "grid-cols-7",
      "8": "grid-cols-8",
      "9": "grid-cols-9",
      "10": "grid-cols-10",
      "11": "grid-cols-11",
      "12": "grid-cols-12"
    },
    // As many columns as fit, each at least --grid-min-item-width wide (set by the
    // minItemWidth prop). min(…, 100%) keeps one item from overflowing a narrow parent.
    autoFill: {
      true: "grid-cols-[repeat(auto-fill,minmax(min(var(--grid-min-item-width),100%),1fr))]"
    },
    // Spacing scale (Tailwind steps). Same scale as Stack, duplicated on purpose: no coupling
    gap: {
      "0": "gap-0",
      "1": "gap-1",
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "8": "gap-8",
      "10": "gap-10",
      "12": "gap-12",
      "16": "gap-16"
    },
    // Block axis alignment of items in their cells
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch"
    }
  },
  defaultVariants: {
    gap: "4"
  }
});
