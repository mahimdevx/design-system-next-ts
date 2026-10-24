import {
  Accessibility,
  Gauge,
  Layers,
  MonitorSmartphone,
  type LucideIcon
} from "lucide-react";

import { Dribbble, GitHub, LinkedIn } from "./brand-icons";

// Dummy data: a fictional person, for the demo only

export const person = {
  name: "Alex Rivera",
  initials: "AR",
  role: "Frontend engineer & design systems",
  location: "Lisbon, Portugal",
  timezone: "Remote · UTC+0",
  email: "hello@example.com",
  availability: "Available for new projects from January"
};

export const sections = [
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" }
] as const;

export const socials = [
  { label: "GitHub", href: "https://github.com", icon: GitHub },
  { label: "LinkedIn", href: "https://www.linkedin.com", icon: LinkedIn },
  { label: "Dribbble", href: "https://dribbble.com", icon: Dribbble }
];

export const tools = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Radix UI",
  "Figma",
  "Storybook",
  "Playwright"
];

type Service = {
  title: string;
  text: string;
  icon: LucideIcon;
};

// The first service is the large bento tile
export const services: Service[] = [
  {
    title: "Design systems",
    text: "Token-driven component libraries that keep product, design and engineering in sync, from Figma to production.",
    icon: Layers
  },
  {
    title: "Fast by default",
    text: "Core Web Vitals in the green: server components, lean bundles, optimized images.",
    icon: Gauge
  },
  {
    title: "Accessible",
    text: "WCAG 2.2 AA, keyboard-first, tested with screen readers and axe.",
    icon: Accessibility
  },
  {
    title: "Responsive",
    text: "Fluid type and intrinsic layouts that adapt without breakpoint hacks.",
    icon: MonitorSmartphone
  }
];

export const stats = [
  { value: "8+", label: "Years building for the web" },
  { value: "48", label: "Projects shipped" }
];

// Thumbnails use the chart tokens, so every card gets a distinct but on-brand color
export const projects = [
  {
    title: "Northwind Analytics",
    year: "2026",
    description:
      "A real-time analytics dashboard with streaming charts, saved views and a 40% faster first load.",
    tags: ["Next.js", "Data viz", "Performance"],
    thumbnail: "bg-chart-1/25"
  },
  {
    title: "Acme Design System",
    year: "2025",
    description:
      "A themeable component library adopted by six product teams, with docs, tokens and visual tests.",
    tags: ["Design system", "Tokens", "Storybook"],
    thumbnail: "bg-chart-2/25"
  },
  {
    title: "Globex Storefront",
    year: "2025",
    description:
      "A headless commerce storefront with instant search, optimistic cart updates and a one-page checkout.",
    tags: ["Commerce", "React", "UX"],
    thumbnail: "bg-chart-4/25"
  },
  {
    title: "Initech Onboarding",
    year: "2024",
    description:
      "A guided onboarding flow that lifted activation by 23%, built with accessible, animated steps.",
    tags: ["Product", "Motion", "A11y"],
    thumbnail: "bg-chart-5/25"
  }
];

export const experience = [
  {
    period: "2024 — Now",
    role: "Senior Frontend Engineer",
    company: "Northwind Labs",
    text: "Lead the design system and the web performance program across four products."
  },
  {
    period: "2021 — 2024",
    role: "Frontend Engineer",
    company: "Acme Studio",
    text: "Built marketing sites and web apps for clients in fintech, health and retail."
  },
  {
    period: "2018 — 2021",
    role: "UI Developer",
    company: "Globex Digital",
    text: "Turned designs into accessible, responsive interfaces and a shared component kit."
  }
];

export const testimonial = {
  quote:
    "Alex turned a pile of inconsistent screens into a system our whole team loves to use. We ship faster, and it finally feels like one product.",
  name: "Jordan Lee",
  role: "Head of Product, Northwind Labs"
};
