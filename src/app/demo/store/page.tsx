import type { CSSProperties, ReactNode } from "react";

import type { Metadata } from "next";

import { ArrowRight, ShoppingBag } from "lucide-react";

import { cn } from "@utils/cn";

import { Badge } from "@components/badge";
import { Button } from "@components/button";
import { Container } from "@components/container";
import { Grid } from "@components/grid";
import { Heading, headingVariants } from "@components/heading";
import { Icon } from "@components/icon";
import { Link } from "@components/link";
import { Section } from "@components/section";
import { Stack } from "@components/stack";
import { Text } from "@components/text";
import { ThemeToggle } from "@components/theme-toggle";

import {
  footerColumns,
  formatPrice,
  heroKits,
  heroStats,
  orderWays,
  paymentMethods,
  priceTiers,
  process,
  products,
  sections,
  store
} from "./data";
import { RaphixLogo } from "./raphix-logo";

export const metadata: Metadata = {
  title: "Store demo",
  description:
    "An esports apparel store home page built only from the design system's components and tokens."
};

const cardClasses = "rounded-xl border bg-card text-card-foreground";

// Offsets in-page anchors for the sticky header
const anchorClasses = "scroll-mt-24";

// The design's display type: the system's heading scale, heavier and in capitals
const displayClasses = "font-extrabold tracking-tight uppercase";

const jerseyShape =
  "[clip-path:polygon(32%_0,50%_13%,68%_0,100%_16%,90%_40%,78%_35%,78%_100%,22%_100%,22%_35%,10%_40%,0_16%)]";

// A jersey silhouette filled with the kit's artwork
function Kit({
  style,
  className,
  children
}: {
  style: CSSProperties;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div aria-hidden="true" className={cn("relative aspect-[1/1.05]", className)}>
      <div className={cn("absolute inset-0", jerseyShape)} style={style} />
      {children}
    </div>
  );
}

function Overline({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <Text variant="overline" className={cn("font-mono text-muted-foreground", className)}>
      {children}
    </Text>
  );
}

function SiteHeader() {
  return (
    <>
      <aside
        aria-label="Announcement"
        className="bg-accent px-4 py-2 text-center font-mono text-xs tracking-wide text-accent-foreground uppercase"
      >
        {store.announcement}
      </aside>
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-md">
        <Container>
          <Stack
            direction="row"
            align="center"
            justify="between"
            gap="4"
            className="h-16"
          >
            <a
              href="#top"
              className="flex items-center gap-2 rounded-md outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <RaphixLogo className="h-6 w-auto text-accent-text" />
              <span className={cn(headingVariants({ size: "h5" }), displayClasses)}>
                {store.name}
              </span>
            </a>

            <nav aria-label="Store sections" className="hidden md:block">
              <Stack asChild direction="row" gap="1">
                <ul>
                  {sections.map((section) => (
                    <li key={section.id}>
                      <Link
                        href={`#${section.id}`}
                        variant="subtle"
                        className="block rounded-md px-3 py-2 text-sm font-semibold tracking-wide uppercase"
                      >
                        {section.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Stack>
            </nav>

            <Stack direction="row" align="center" gap="2">
              <ThemeToggle />
              <Button asChild variant="outline" size="sm" className="max-sm:px-3">
                <a href="#latest">
                  <Icon as={ShoppingBag} />
                  {/* Icon and count only on phones; the name stays for screen readers */}
                  <span className="max-sm:sr-only">Cart</span>
                  <Badge variant="accent" className="h-5 px-1.5">
                    2<span className="sr-only"> items</span>
                  </Badge>
                </a>
              </Button>
            </Stack>
          </Stack>
        </Container>
      </header>
    </>
  );
}

function Hero() {
  return (
    <Section spacing="md" id="top" className={anchorClasses}>
      <Container>
        <Grid gap="10" align="center" className="lg:grid-cols-2">
          <Stack gap="6" align="start">
            <Overline className="text-accent-text">
              {"// Custom esports apparel · Made to order"}
            </Overline>

            <Heading as="h1" className={cn(displayClasses, "leading-[0.95]")}>
              Kits built for the main stage.
            </Heading>

            <Text variant="lead" className="max-w-xl">
              Pick a design from our albums, customize a template, or send your own
              artwork. We print, stitch and ship to players, teams and brands worldwide.
            </Text>

            <Stack direction="row" gap="3" wrap>
              <Button asChild variant="accent" size="lg">
                <a href="#order">
                  Start customizing
                  <Icon as={ArrowRight} />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#teams">Order for a team</a>
              </Button>
            </Stack>

            <Stack asChild direction="row" gap="8" wrap className="w-full border-t pt-6">
              <dl>
                {heroStats.map((stat) => (
                  <Stack key={stat.label} gap="1" className="flex-col-reverse">
                    <dt className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </dt>
                    <dd className={cn(headingVariants({ size: "h3" }), "font-extrabold")}>
                      {stat.value}
                    </dd>
                  </Stack>
                ))}
              </dl>
            </Stack>
          </Stack>

          <HeroVisual />
        </Grid>
      </Container>
    </Section>
  );
}

// Three kits on a grid backdrop, like a product shot
function HeroVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative aspect-square w-full overflow-hidden rounded-xl border bg-radial-[at_55%_45%] from-card to-background to-70% sm:aspect-[4/3.6]"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_39px,var(--border)_39px_40px),repeating-linear-gradient(90deg,transparent_0_39px,var(--border)_39px_40px)] opacity-60" />
      {heroKits.map((kit) => (
        <Kit
          key={kit.number}
          style={kit.style}
          className={cn("absolute drop-shadow-2xl", kit.position)}
        >
          <span
            className="absolute inset-x-0 top-[40%] text-center text-[clamp(2rem,6vw,4rem)] leading-none font-extrabold"
            style={{ color: kit.numberColor }}
          >
            {kit.number}
          </span>
        </Kit>
      ))}
      <span className="absolute bottom-4 left-5 font-mono text-xs tracking-wide text-muted-foreground uppercase">
        Drop 26.4 · Pro Series
      </span>
    </div>
  );
}

function OrderWays() {
  return (
    <Section spacing="sm" aria-labelledby="order" className={anchorClasses}>
      <Container>
        <Stack gap="5">
          <Heading
            as="h2"
            size="h6"
            id="order"
            className="font-mono text-muted-foreground uppercase"
          >
            Three ways to order
          </Heading>

          {/* 1px gaps over a border-colored background draw the dividers */}
          <Grid
            asChild
            columns="1"
            className="gap-px overflow-hidden rounded-xl border bg-border md:grid-cols-3"
          >
            <ol>
              {orderWays.map((way, index) => (
                <li key={way.title} className="flex">
                  <a
                    href={way.href}
                    className="group flex w-full flex-col gap-4 bg-background p-8 outline-hidden transition-colors hover:bg-card focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-inset"
                  >
                    <span className="font-mono text-sm font-bold text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Heading as="h3" size="h3" className={displayClasses}>
                      {way.title}
                    </Heading>
                    <Text className="flex-1 text-muted-foreground">{way.text}</Text>
                    <span className="flex items-center gap-2 text-sm font-semibold tracking-wide uppercase">
                      {way.cta}
                      <Icon
                        as={ArrowRight}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

function LatestDrop() {
  return (
    <Section spacing="sm" aria-labelledby="latest" className={anchorClasses}>
      <Container>
        <Stack gap="6">
          <Stack direction="row" align="end" justify="between" gap="4" wrap>
            <Heading as="h2" id="latest" className={displayClasses}>
              Latest drop
            </Heading>
            <Text as="span" variant="small" className="text-muted-foreground">
              Every product is customizable
            </Text>
          </Stack>

          <Grid asChild columns="2" gap="4" className="sm:gap-6 lg:grid-cols-4">
            <ul>
              {products.map((product) => (
                <Stack asChild key={product.name} gap="3">
                  <li>
                    <div className="relative flex aspect-4/5 items-center justify-center rounded-xl border bg-radial-[at_50%_42%] from-card to-muted to-70%">
                      <Kit style={product.style} className="w-2/3" />
                      {product.tag && (
                        <Badge variant="accent" className="absolute top-3 left-3">
                          {product.tag}
                        </Badge>
                      )}
                    </div>
                    <Stack
                      direction="row"
                      justify="between"
                      gap="1"
                      className="max-sm:flex-col sm:gap-3"
                    >
                      <div>
                        <Heading as="h3" size="h6">
                          {product.name}
                        </Heading>
                        <Text variant="small" className="text-muted-foreground">
                          {product.category}
                        </Text>
                      </div>
                      <Text as="span" weight="bold" className="font-mono">
                        {formatPrice(product.price)}
                      </Text>
                    </Stack>
                  </li>
                </Stack>
              ))}
            </ul>
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

function Teams() {
  return (
    <Section spacing="sm" aria-labelledby="teams" className={anchorClasses}>
      <Container>
        <Grid className={cn(cardClasses, "overflow-hidden md:grid-cols-2")} gap="0">
          <Stack gap="6" align="start" className="p-8 md:p-12">
            <Overline className="text-accent-text">
              Teams · Orgs · Schools · Brands
            </Overline>
            <Heading as="h2" id="teams" className={displayClasses}>
              Outfitting a whole roster?
            </Heading>
            <Text className="max-w-md text-muted-foreground">
              Upload your roster once: names, numbers and sizes per player. The price
              drops automatically as your order grows.
            </Text>

            <Grid asChild columns="2" gap="2" className="w-full sm:grid-cols-4">
              <ul aria-label="Price per jersey">
                {priceTiers.map((tier) => (
                  <Stack
                    asChild
                    key={tier.range}
                    gap="1"
                    className="rounded-lg border bg-background p-3"
                  >
                    <li>
                      <Text as="span" variant="caption" className="font-mono">
                        {tier.range} pcs
                      </Text>
                      <span
                        className={cn(headingVariants({ size: "h5" }), "font-extrabold")}
                      >
                        {formatPrice(tier.price)}
                      </span>
                      <Text as="span" variant="caption">
                        per jersey
                      </Text>
                    </li>
                  </Stack>
                ))}
              </ul>
            </Grid>

            <Stack direction="row" gap="3" wrap>
              <Button asChild variant="accent">
                <a href="#process">Start a team order</a>
              </Button>
              <Button asChild variant="outline">
                <a href="#process">Open a team store</a>
              </Button>
            </Stack>
          </Stack>

          {/* A photo placeholder, as in the design */}
          <div className="flex min-h-72 items-end border-t bg-[repeating-linear-gradient(135deg,var(--muted)_0_12px,transparent_12px_24px)] p-5 md:border-t-0 md:border-l">
            <span className="rounded-md bg-card px-2 py-1 font-mono text-xs tracking-wide text-muted-foreground uppercase">
              Photo: team lined up in matching kits
            </span>
          </div>
        </Grid>
      </Container>
    </Section>
  );
}

function Process() {
  return (
    <Section
      spacing="sm"
      aria-labelledby="process"
      className={cn(anchorClasses, "pb-section-md")}
    >
      <Container>
        <Stack gap="6">
          <Heading
            as="h2"
            size="h6"
            id="process"
            className="font-mono text-muted-foreground uppercase"
          >
            How it works
          </Heading>
          <Grid asChild columns="1" gap="6" className="sm:grid-cols-2 lg:grid-cols-4">
            <ol>
              {process.map((step, index) => (
                <Stack
                  asChild
                  key={step.title}
                  gap="2"
                  className="border-t-2 border-accent pt-4"
                >
                  <li>
                    <span className="font-mono text-sm font-bold text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Heading as="h3" size="h4" className={displayClasses}>
                      {step.title}
                    </Heading>
                    <Text variant="small" className="text-muted-foreground">
                      {step.text}
                    </Text>
                  </li>
                </Stack>
              ))}
            </ol>
          </Grid>
        </Stack>
      </Container>
    </Section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t">
      <Container>
        <Grid gap="8" align="center" className="border-b py-12 md:grid-cols-3">
          <a
            href="#top"
            className="flex items-center gap-4 justify-self-start rounded-md outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <RaphixLogo className="h-6 w-auto" />
            </span>
            <span>
              <span
                className={cn(headingVariants({ size: "h5" }), displayClasses, "block")}
              >
                {store.fullName}
              </span>
              <Text as="span" variant="small" className="text-muted-foreground">
                {store.tagline}
              </Text>
            </span>
          </a>

          <Text className="max-w-sm text-muted-foreground md:justify-self-center">
            Custom sublimated kits for players, teams and brands. Printed in-house,
            shipped to 60+ countries.
          </Text>

          <Stack direction="row" align="center" gap="4" className="md:justify-self-end">
            <div className="md:text-right">
              <Overline>Hotline, free 24/7</Overline>
              <p className="mt-1 font-mono text-xl font-bold sm:text-2xl">
                {store.hotline}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-md border font-mono text-xs font-bold text-accent-text"
            >
              24/7
            </span>
          </Stack>
        </Grid>

        <Grid columns="2" gap="10" className="py-12 md:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <Stack gap="4">
                <Heading as="h2" size="h6" className={displayClasses}>
                  {column.title}
                </Heading>
                <Stack asChild gap="3">
                  <ul>
                    {column.links.map((label) => (
                      <li key={label}>
                        {/* The other store screens are not built: links return to the top */}
                        <Link
                          href="#top"
                          variant="subtle"
                          className="text-sm font-medium tracking-wide uppercase hover:text-accent-text"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Stack>
              </Stack>
            </nav>
          ))}

          <Newsletter />
        </Grid>

        <Grid gap="4" align="center" className="border-t py-6 md:grid-cols-3">
          <Text as="span" variant="caption" className="font-mono tracking-wide uppercase">
            Copyright © 2026, {store.fullName} Ltd.
          </Text>
          <Link
            href="/"
            variant="subtle"
            className={cn(
              headingVariants({ size: "h6" }),
              displayClasses,
              "justify-self-start text-foreground hover:text-accent-text md:justify-self-center"
            )}
          >
            &lt;Know the developer /&gt;
          </Link>
          <Stack asChild direction="row" gap="2" wrap className="md:justify-end">
            <ul aria-label="Payment methods">
              {paymentMethods.map((method) => (
                <li key={method}>
                  <Badge
                    variant="muted"
                    className="h-7 border-border bg-card font-mono text-card-foreground"
                  >
                    {method}
                  </Badge>
                </li>
              ))}
            </ul>
          </Stack>
        </Grid>
      </Container>
    </footer>
  );
}

// Demo only: the system has no Input component yet, and nothing receives the form
function Newsletter() {
  return (
    <Stack
      gap="4"
      className="col-span-2 md:col-span-3 lg:col-span-2 lg:items-end lg:text-right"
    >
      <Heading as="h2" size="h6" className={displayClasses}>
        Receive offers &amp; discounts
      </Heading>
      <Text variant="small" className="text-muted-foreground">
        New drops, restocks and team discount codes, straight to your inbox.
      </Text>
      <form className="flex w-full max-w-md gap-2 rounded-md border bg-card p-1.5 focus-within:ring-3 focus-within:ring-ring/50">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="Email address"
          className="min-w-0 flex-1 bg-transparent px-3 text-base outline-hidden placeholder:text-muted-foreground"
        />
        <Button type="submit" variant="accent" size="sm">
          Subscribe
        </Button>
      </form>
      <Text variant="caption">We will never share your email with third parties.</Text>
    </Stack>
  );
}

export default function StoreDemoPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <OrderWays />
        <LatestDrop />
        <Teams />
        <Process />
      </main>
      <SiteFooter />
    </>
  );
}
