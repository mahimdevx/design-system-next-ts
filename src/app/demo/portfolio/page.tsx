import type { Metadata } from "next";

import { ArrowRight, Clock, Mail, MapPin, Quote } from "lucide-react";

import { cn } from "@utils/cn";

import { Button } from "@components/button";
import { Container } from "@components/container";
import { Grid } from "@components/grid";
import { Heading, headingVariants } from "@components/heading";
import { Icon } from "@components/icon";
import { Link } from "@components/link";
import { Main } from "@components/main";
import { Section } from "@components/section";
import { Stack } from "@components/stack";
import { Text } from "@components/text";
import { ThemeToggle } from "@components/theme-toggle";

import {
  experience,
  person,
  projects,
  sections,
  services,
  socials,
  stats,
  testimonial,
  tools
} from "./data";

export const metadata: Metadata = {
  title: "Portfolio demo",
  description:
    "A portfolio page built only from the design system's components and tokens."
};

const cardClasses = "rounded-xl border bg-card text-card-foreground";

// Offsets in-page anchors for the sticky header
const anchorClasses = "scroll-mt-24";

function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/75 backdrop-blur-md">
      <Container>
        <Stack direction="row" align="center" justify="between" gap="4" className="h-16">
          <a
            href="#top"
            className="flex items-center gap-3 rounded-md font-semibold outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <span className="flex size-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-accent-foreground">
              {person.initials}
            </span>
            {person.name}
          </a>

          <nav aria-label="Page sections" className="hidden md:block">
            <Stack asChild direction="row" gap="1">
              <ul>
                {sections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#${section.id}`}
                      variant="subtle"
                      className="block rounded-md px-3 py-2 text-sm font-medium"
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
            <Button asChild variant="accent" size="sm" rounded>
              <a href="#contact">Hire me</a>
            </Button>
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <Section spacing="lg" id="top" className={anchorClasses}>
      <Container>
        <Grid
          gap="12"
          align="center"
          className="lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
        >
          <Stack gap="6" align="start">
            <span className="flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-sm text-muted-foreground">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-success" />
              </span>
              {person.availability}
            </span>

            <Heading as="h1">
              Design-minded engineer building{" "}
              <span className="text-accent-text">interfaces people love</span>.
            </Heading>

            <Text variant="lead" className="max-w-xl">
              I&rsquo;m {person.name}, a {person.role.toLowerCase()} specialist. I turn
              complex products into fast, accessible and beautifully consistent web
              experiences.
            </Text>

            <Stack direction="row" gap="3" wrap>
              <Button asChild variant="accent" size="lg" rounded>
                <a href="#work">
                  View my work
                  <Icon as={ArrowRight} />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" rounded>
                <a href="#contact">Get in touch</a>
              </Button>
            </Stack>

            <Stack direction="row" gap="6" wrap className="text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Icon as={MapPin} />
                {person.location}
              </span>
              <span className="flex items-center gap-2">
                <Icon as={Clock} />
                {person.timezone}
              </span>
            </Stack>
          </Stack>

          <ProfileVisual />
        </Grid>
      </Container>
    </Section>
  );
}

// A portrait placeholder: initials on a token gradient, with floating stat chips
function ProfileVisual() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-xl border bg-linear-to-br from-accent/30 via-card to-card"
    >
      <span className="absolute inset-0 flex items-center justify-center text-[clamp(5rem,12vw,8rem)] font-extrabold tracking-tighter text-accent-text/80">
        {person.initials}
      </span>

      <span className="absolute top-5 left-5 rounded-lg border bg-background/80 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur">
        ★ 4.9 client rating
      </span>
      <span className="absolute right-5 bottom-5 rounded-lg border bg-background/80 px-3 py-2 text-sm font-medium shadow-sm backdrop-blur">
        48 projects shipped
      </span>
    </div>
  );
}

function Tools() {
  return (
    <Container>
      <Stack gap="4" align="center" className="border-y py-8">
        <Text variant="overline" className="text-muted-foreground">
          Tools I work with
        </Text>
        <Stack asChild direction="row" justify="center" gap="2" wrap>
          <ul aria-label="Tools">
            {tools.map((tool) => (
              <li key={tool} className="rounded-full border bg-card px-4 py-1.5 text-sm">
                {tool}
              </li>
            ))}
          </ul>
        </Stack>
      </Stack>
    </Container>
  );
}

function SectionHeader({ id, title, text }: { id: string; title: string; text: string }) {
  return (
    <Stack gap="3" className="max-w-2xl">
      <Heading as="h2" size="h3" id={id}>
        {title}
      </Heading>
      <Text className="text-muted-foreground">{text}</Text>
    </Stack>
  );
}

function Services() {
  const [featured, ...rest] = services;

  return (
    <Section aria-labelledby="services" className={anchorClasses}>
      <Container>
        <Stack gap="10">
          <SectionHeader
            id="services"
            title="What I do"
            text="From the first token to the last pixel: systems, performance and accessibility, built in from the start."
          />

          {/* Bento: a large featured tile, stats, and the other services */}
          <Grid asChild gap="4" className="md:grid-cols-6">
            <ul>
              {featured && (
                <Stack
                  asChild
                  gap="4"
                  justify="between"
                  className={cn(
                    cardClasses,
                    "bg-linear-to-br from-accent/15 to-card p-8 md:col-span-4 md:row-span-2"
                  )}
                >
                  <li>
                    <span className="flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                      <Icon as={featured.icon} size="lg" />
                    </span>
                    <Stack gap="3">
                      <Heading as="h3" size="h3">
                        {featured.title}
                      </Heading>
                      <Text className="max-w-md text-muted-foreground">
                        {featured.text}
                      </Text>
                    </Stack>
                  </li>
                </Stack>
              )}

              {stats.map((stat) => (
                <Stat key={stat.label} {...stat} />
              ))}

              {rest.map((service) => (
                <Stack
                  asChild
                  key={service.title}
                  gap="3"
                  className={cn(cardClasses, "p-6 md:col-span-2")}
                >
                  <li>
                    <Icon as={service.icon} size="lg" className="text-accent-text" />
                    <Heading as="h3" size="h6">
                      {service.title}
                    </Heading>
                    <Text variant="small" className="text-muted-foreground">
                      {service.text}
                    </Text>
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

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Stack
      asChild
      gap="1"
      justify="center"
      className={cn(cardClasses, "p-6 md:col-span-2")}
    >
      <li>
        <p className={cn(headingVariants({ size: "h2" }), "text-accent-text")}>{value}</p>
        <Text variant="small" className="text-muted-foreground">
          {label}
        </Text>
      </li>
    </Stack>
  );
}

function Work() {
  return (
    <Section aria-labelledby="work" className={anchorClasses}>
      <Container>
        <Stack gap="10">
          <SectionHeader
            id="work"
            title="Selected work"
            text="A few recent projects. Every one shipped to real users, measured, and improved."
          />

          <Grid asChild minItemWidth="26rem" gap="6">
            <ul>
              {projects.map((project) => (
                <Stack
                  asChild
                  key={project.title}
                  gap="5"
                  className={cn(cardClasses, "p-4 pb-6")}
                >
                  <li>
                    <div
                      aria-hidden="true"
                      className={cn(
                        "flex aspect-video items-center justify-center rounded-lg",
                        project.thumbnail
                      )}
                    >
                      <span
                        className={cn(
                          headingVariants({ size: "h4" }),
                          "rounded-lg bg-background/80 px-4 py-2 backdrop-blur"
                        )}
                      >
                        {project.title.split(" ")[0]}
                      </span>
                    </div>

                    <Stack gap="3" className="px-2">
                      <Stack direction="row" align="baseline" justify="between" gap="4">
                        <Heading as="h3" size="h5">
                          {project.title}
                        </Heading>
                        <Text
                          as="span"
                          variant="small"
                          className="font-mono text-muted-foreground"
                        >
                          {project.year}
                        </Text>
                      </Stack>
                      <Text variant="small" className="text-muted-foreground">
                        {project.description}
                      </Text>
                      <Stack asChild direction="row" gap="2" wrap>
                        <ul aria-label="Technologies">
                          {project.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </Stack>
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

function Experience() {
  return (
    <Section aria-labelledby="experience" className={anchorClasses}>
      <Container>
        <Grid gap="10" className="lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <SectionHeader
            id="experience"
            title="Experience"
            text="Eight years across product teams, studios and agencies."
          />

          <ol className="border-l">
            {experience.map((job) => (
              <li key={job.company} className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute top-1.5 -left-1.5 size-3 rounded-full border-2 border-background bg-accent"
                />
                <Stack gap="2">
                  <Text
                    as="span"
                    variant="small"
                    className="font-mono text-muted-foreground"
                  >
                    {job.period}
                  </Text>
                  <Heading as="h3" size="h5">
                    {job.role}{" "}
                    <span className="text-muted-foreground">· {job.company}</span>
                  </Heading>
                  <Text className="text-muted-foreground">{job.text}</Text>
                </Stack>
              </li>
            ))}
          </ol>
        </Grid>
      </Container>
    </Section>
  );
}

function Testimonial() {
  return (
    <Section spacing="sm">
      <Container size="md">
        <Stack asChild gap="6" align="center" className="text-center">
          <figure>
            <Icon as={Quote} size="xl" className="text-accent-text" />
            <blockquote className="border-none p-0 not-italic">
              <p className={headingVariants({ size: "h4", weight: "medium" })}>
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption>
              <Text as="span" weight="semibold">
                {testimonial.name}
              </Text>
              <Text variant="small" className="text-muted-foreground">
                {testimonial.role}
              </Text>
            </figcaption>
          </figure>
        </Stack>
      </Container>
    </Section>
  );
}

function Contact() {
  return (
    <Section aria-labelledby="contact" className={anchorClasses}>
      <Container>
        <Stack
          gap="8"
          align="center"
          className={cn(
            cardClasses,
            "bg-linear-to-br from-accent/20 via-card to-card px-6 py-16 text-center sm:px-12"
          )}
        >
          <Stack gap="4" align="center" className="max-w-2xl">
            <Heading as="h2" size="h2" id="contact">
              Let&rsquo;s build something great together
            </Heading>
            <Text variant="lead">
              Have a product that deserves a better interface? Tell me about it: I reply
              within two working days.
            </Text>
          </Stack>

          {/* An email address reads wrong in uppercase */}
          <Button asChild variant="accent" size="lg" rounded className="normal-case">
            <a href={`mailto:${person.email}`}>
              <Icon as={Mail} />
              {person.email}
            </a>
          </Button>

          <Stack asChild direction="row" gap="2">
            <ul aria-label="Social profiles">
              {socials.map((social) => (
                <li key={social.label}>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    iconOnly
                    rounded
                    aria-label={social.label}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <Icon as={social.icon} />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t py-8">
      <Container>
        <Stack
          direction="row"
          align="center"
          justify="between"
          gap="4"
          wrap
          className="text-sm text-muted-foreground"
        >
          <span>© 2026 {person.name}. All data on this page is fictional.</span>
          <span>
            Built only with the design system. <Link href="/demo">More demos</Link>
          </span>
        </Stack>
      </Container>
    </footer>
  );
}

export default function PortfolioDemoPage() {
  return (
    <>
      <SiteHeader />
      <Main>
        <Hero />
        <Tools />
        <Services />
        <Work />
        <Experience />
        <Testimonial />
        <Contact />
      </Main>
      <SiteFooter />
    </>
  );
}
