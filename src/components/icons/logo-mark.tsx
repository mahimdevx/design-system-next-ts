import type { SVGProps } from "react";

/*
 * Custom icons follow lucide's conventions so they match visually and work with <Icon>:
 * 24×24 viewBox, 2px round strokes, currentColor, all SVG props passed through.
 */
export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="4" />
      <rect x="3" y="13" width="8" height="8" rx="4" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}
