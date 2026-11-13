import { Calendar } from "./calendar";

// @ts-expect-error -- navLayout is fixed: the styles only place the "around" buttons
export const otherNavLayout = <Calendar navLayout="after" />;
