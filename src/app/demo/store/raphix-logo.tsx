import type { SVGProps } from "react";

/*
 * The Raphix mark for the demo only, in one color (currentColor) like the design, so it
 * follows the text color and dark mode.
 */
export function RaphixLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 162.79 117.3"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <polygon points="160.72 24.5 153.69 28.56 92.49 63.9 89.08 65.86 80.98 70.54 82.33 62.86 82.77 60.36 93.13 1.59 93.41 0 160.72 24.5" />
      <polygon points="81.64 12.8 73.83 57.11 73.51 58.93 70.38 76.66 0 117.3 52.81 49.71 52.96 49.51 81.64 12.8" />
      <polygon points="162.79 98.68 157.24 96.21 99.79 70.63 104.11 68.13 134.89 50.36 156.07 87.04 160.33 94.42 162.79 98.68" />
    </svg>
  );
}
