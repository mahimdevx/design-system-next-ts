import {
  CircleCheck,
  Info,
  LoaderCircle,
  OctagonX,
  TriangleAlert,
  X
} from "lucide-react";
import { Toaster as Sonner, type ToastClassnames, type ToasterProps } from "sonner";

import { Icon } from "@components/icon";

import { toasterVariants } from "./toaster.styles";

const parts = toasterVariants();

// The slots are named after sonner's classNames keys, so they map straight across
const partClassNames: ToastClassnames = Object.fromEntries(
  Object.entries(parts).map(([name, slot]) => [name, slot()])
);

const icons = {
  success: <Icon as={CircleCheck} />,
  info: <Icon as={Info} />,
  warning: <Icon as={TriangleAlert} />,
  error: <Icon as={OctagonX} />,
  loading: <Icon as={LoaderCircle} className="animate-spin" />,
  close: <Icon as={X} />
};

/*
 * Renders the toasts sent with toast() from anywhere in the app: render it once, in the
 * root layout. sonner announces them in a polite live region and lets them be swiped away.
 * Hovering or Alt+T expands the stack and pauses them (Alt+T also focuses them), and so
 * does hiding the tab. A server component: sonner's Toaster is the client part.
 */
export function Toaster({ toastOptions, ...props }: ToasterProps) {
  return (
    <Sonner
      // Colors come from the tokens (they follow .dark), so sonner's theme is unused.
      // A fixed value skips the color-scheme listener it adds for "system"
      theme="light"
      icons={icons}
      {...props}
      toastOptions={{
        unstyled: true,
        ...toastOptions,
        classNames: { ...partClassNames, ...toastOptions?.classNames }
      }}
    />
  );
}
