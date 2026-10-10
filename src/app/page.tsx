import { ArrowRight, Check, Plus, Search } from "lucide-react";

import { Button } from "@components/button";
import { Heading, headingElements, headingVariants } from "@components/heading";
import { Icon } from "@components/icon";
import { LogoMark } from "@components/icons/logo-mark";
import { Text } from "@components/text";
import { ThemeToggle } from "@components/theme-toggle";

const buttonVariantNames = [
  "primary",
  "secondary",
  "accent",
  "soft",
  "outline",
  "muted",
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

const textVariantNames = ["lead", "p", "small", "caption", "overline", "label"] as const;

export default function FoundationsPage() {
  const sectionClasses = "flex flex-col gap-4";

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Heading as="h1">Foundations</Heading>
          <Text variant="lead">
            Design tokens, type and core components, in light and dark mode.
          </Text>
        </div>

        <ThemeToggle />
      </header>

      <section className={sectionClasses} aria-labelledby="colors">
        <Heading as="h2" size="h3" id="colors">
          Colors
        </Heading>

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
        <Heading as="h2" size="h3" id="typography">
          Typography
        </Heading>

        <Text className="text-muted-foreground">
          Headings are fluid: resize the window to see them scale between mobile and
          desktop sizes.
        </Text>

        <ul className="flex flex-col divide-y">
          {headingElements.map((size) => (
            <li key={size} className="flex flex-col gap-1 py-4">
              <Text variant="overline" className="text-muted-foreground">
                {size}
              </Text>
              {/* Visual samples, not page sections: a <p> keeps them out of the outline */}
              <p className={headingVariants({ size })}>
                The quick brown fox jumps over the lazy dog
              </p>
            </li>
          ))}

          {textVariantNames.map((variant) => (
            <li key={variant} className="flex flex-col gap-1 py-4">
              <Text variant="overline" className="text-muted-foreground">
                {variant}
              </Text>
              <Text variant={variant}>The quick brown fox jumps over the lazy dog</Text>
            </li>
          ))}
        </ul>

        <Heading as="h3" size="h5">
          Plain HTML
        </Heading>
        <Text>
          Inline elements need no component: <strong>strong</strong>, <em>emphasis</em>,{" "}
          <mark>highlighted</mark>, <code>pnpm dev</code> and <kbd>Ctrl</kbd> +{" "}
          <kbd>K</kbd>.
        </Text>
        <blockquote>
          Typography is the craft of endowing human language with a durable visual form.
        </blockquote>
      </section>

      <section className={sectionClasses} aria-labelledby="buttons">
        <Heading as="h2" size="h3" id="buttons">
          Buttons
        </Heading>

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
            <Icon as={Plus} />
            With icon
          </Button>
          <Button variant="outline" rounded>
            Rounded
            <Icon as={ArrowRight} />
          </Button>
          <Button variant="accent" iconOnly rounded aria-label="Add item">
            <Icon as={Plus} />
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="soft" asChild>
            <a href="#buttons">Link as button</a>
          </Button>
        </div>
      </section>

      <section className={sectionClasses} aria-labelledby="icons">
        <Heading as="h2" size="h3" id="icons">
          Icons
        </Heading>

        <ul className="flex flex-wrap items-end gap-6" aria-label="Icon sizes">
          {iconSizes.map((size) => (
            <li key={size} className="flex flex-col items-center gap-2">
              <Icon as={Search} size={size} />
              <Text variant="caption" className="font-mono">
                {size}
              </Text>
            </li>
          ))}
        </ul>

        <Text variant="small" className="text-muted-foreground">
          Without a size, icons follow their container: each button sets its own icon
          size.
        </Text>
        <div className="flex flex-wrap items-center gap-3">
          {buttonSizes.map((size) => (
            <Button key={size} size={size} variant="outline">
              <Icon as={Plus} />
              {size}
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Text variant="small" as="span" className="flex items-center gap-2">
            <Icon as={LogoMark} size="lg" />
            Custom SVG icon
          </Text>
          <Text variant="small" as="span" className="flex items-center gap-2">
            <Icon as={Check} aria-label="Completed" className="text-success-text" />
            Labelled icon (announced as &ldquo;Completed&rdquo;)
          </Text>
        </div>
      </section>
    </main>
  );
}
