import { ArrowRight, Check, Plus, Star } from "lucide-react";

import { Button } from "@components/elements/button";
import { Icon } from "@components/elements/icon";
import { LogoMark } from "@components/icons/logo-mark";
import { ThemeToggle } from "@components/layouts/theme-toggle";

const buttonVariantNames = [
  "primary",
  "secondary",
  "accent",
  "soft",
  "outline",
  "muted",
  "ghost",
  "destructive",
  "link"
] as const;

const buttonSizes = ["xxs", "xs", "sm", "base", "lg", "xl"] as const;

const iconSizes = ["xs", "sm", "base", "lg", "xl"] as const;

const colorTokens = [
  { name: "background", swatch: "bg-background text-foreground" },
  { name: "primary", swatch: "bg-primary text-primary-foreground" },
  { name: "secondary", swatch: "bg-secondary text-secondary-foreground" },
  { name: "muted", swatch: "bg-muted text-muted-foreground" },
  { name: "accent", swatch: "bg-accent text-accent-foreground" },
  { name: "destructive", swatch: "bg-destructive text-destructive-foreground" },
  { name: "success", swatch: "bg-success text-success-foreground" },
  { name: "warning", swatch: "bg-warning text-warning-foreground" },
  { name: "card", swatch: "bg-card text-card-foreground" },
  { name: "popover", swatch: "bg-popover text-popover-foreground" }
];

const chartTokens = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5"
];

const typeScale = [
  { name: "text-5xl / extrabold", sample: "text-5xl font-extrabold tracking-tight" },
  { name: "text-3xl / bold", sample: "text-3xl font-bold tracking-tight" },
  { name: "text-xl / semibold", sample: "text-xl font-semibold" },
  { name: "text-base / regular", sample: "text-base" },
  { name: "text-sm / medium", sample: "text-sm font-medium" },
  { name: "font-mono", sample: "font-mono text-sm" }
];

export default function FoundationsPage() {
  const sectionClasses = "flex flex-col gap-4";
  const headingClasses = "text-2xl font-bold tracking-tight";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-extrabold tracking-tight">Foundations</h1>
          <p className="text-muted-foreground">
            Design tokens, type and core components, in light and dark mode.
          </p>
        </div>

        <ThemeToggle />
      </header>

      <section className={sectionClasses} aria-labelledby="colors">
        <h2 id="colors" className={headingClasses}>
          Colors
        </h2>

        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {colorTokens.map((token) => (
            <li
              key={token.name}
              className={`${token.swatch} flex h-24 items-end rounded-lg border p-3 text-sm font-medium`}
            >
              {token.name}
            </li>
          ))}
        </ul>

        <ul className="flex gap-3" aria-label="Chart colors">
          {chartTokens.map((swatch, index) => (
            <li key={swatch} className={`${swatch} size-12 rounded-md`}>
              <span className="sr-only">chart-{index + 1}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionClasses} aria-labelledby="typography">
        <h2 id="typography" className={headingClasses}>
          Typography
        </h2>

        <ul className="flex flex-col divide-y">
          {typeScale.map((step) => (
            <li key={step.name} className="flex flex-col gap-1 py-4">
              <span className="font-mono text-xs text-muted-foreground">{step.name}</span>
              <span className={step.sample}>
                The quick brown fox jumps over the lazy dog
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className={sectionClasses} aria-labelledby="buttons">
        <h2 id="buttons" className={headingClasses}>
          Buttons
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          {buttonVariantNames.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {buttonSizes.map((size) => (
            <Button key={size} size={size}>
              {size}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>
            <Icon icon={Plus} />
            With icon
          </Button>
          <Button variant="outline" rounded>
            Rounded
            <Icon icon={ArrowRight} />
          </Button>
          <Button variant="accent" iconOnly rounded aria-label="Add item">
            <Icon icon={Plus} />
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="soft" asChild>
            <a href="#buttons">Link as button</a>
          </Button>
        </div>
      </section>

      <section className={sectionClasses} aria-labelledby="icons">
        <h2 id="icons" className={headingClasses}>
          Icons
        </h2>

        <ul className="flex flex-wrap items-end gap-6" aria-label="Icon sizes">
          {iconSizes.map((size) => (
            <li key={size} className="flex flex-col items-center gap-2">
              <Icon icon={Star} size={size} />
              <span className="font-mono text-xs text-muted-foreground">{size}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-muted-foreground">
          Without a size, icons follow their container: each button sets its own icon
          size.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          {buttonSizes.map((size) => (
            <Button key={size} size={size} variant="outline">
              <Icon icon={Plus} />
              {size}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <span className="flex items-center gap-2 text-sm">
            <Icon icon={LogoMark} size="lg" />
            Custom SVG icon
          </span>
          <span className="flex items-center gap-2 text-sm">
            <Icon icon={Check} label="Completed" className="text-success" />
            Labelled icon (announced as &ldquo;Completed&rdquo;)
          </span>
        </div>
      </section>
    </main>
  );
}
