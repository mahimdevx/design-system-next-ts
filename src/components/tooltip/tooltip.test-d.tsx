import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export const shortcut = (
  <Tooltip content="Save" side="bottom">
    <button type="button">Save</button>
  </Tooltip>
);

export const parts = (
  <Tooltip>
    <TooltipTrigger>Save</TooltipTrigger>
    <TooltipContent side="bottom">Save</TooltipContent>
  </Tooltip>
);

export const sideWithoutContent = (
  // @ts-expect-error -- side only applies to the content shortcut; set it on TooltipContent
  <Tooltip side="bottom">
    <TooltipTrigger>Save</TooltipTrigger>
    <TooltipContent>Save</TooltipContent>
  </Tooltip>
);
