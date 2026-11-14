import { Tooltip, TooltipContent, TooltipRoot, TooltipTrigger } from "./tooltip";

export const shortcut = (
  <Tooltip content="Save" side="bottom">
    <button type="button">Save</button>
  </Tooltip>
);

export const parts = (
  <TooltipRoot>
    <TooltipTrigger>Save</TooltipTrigger>
    <TooltipContent side="bottom">Save</TooltipContent>
  </TooltipRoot>
);

export const partsInsideTheShortcut = (
  // @ts-expect-error -- the shortcut takes one trigger element; the parts go in TooltipRoot
  <Tooltip content="Save">
    <TooltipTrigger>Save</TooltipTrigger>
    <TooltipContent>Save</TooltipContent>
  </Tooltip>
);

export const shortcutWithoutContent = (
  // @ts-expect-error -- content is required: without it there is nothing to show
  <Tooltip>
    <button type="button">Save</button>
  </Tooltip>
);

export const contentOnTheParts = (
  // @ts-expect-error -- TooltipRoot has no content prop; its text goes in TooltipContent
  <TooltipRoot content="Save">
    <TooltipTrigger>Save</TooltipTrigger>
    <TooltipContent>Save</TooltipContent>
  </TooltipRoot>
);
