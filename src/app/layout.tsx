import type { Metadata, Viewport } from "next";

import { cn } from "@utils/cn";

import { firaCode, poppins } from "@styles/fonts";

import { ThemeProvider } from "@components/theme-provider";

import "@styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Design System",
    template: "%s · Design System"
  },
  description:
    "A design system for React and Next.js: accessible components, design tokens and dark mode."
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" }
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const htmlClasses = cn(poppins.variable, firaCode.variable);

  return (
    // next-themes sets the theme class on <html> before React hydrates
    <html lang="en" className={htmlClasses} suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
