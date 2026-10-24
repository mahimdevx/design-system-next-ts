import type { Metadata } from "next";
import Image from "next/image";

import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import { cn } from "@utils/cn";

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
import { Dribbble } from "@assets/icons/dribbble";
import { Facebook } from "@assets/icons/facebook";
import { Instagram } from "@assets/icons/instagram";
import { Twitter } from "@assets/icons/twitter";
import profile from "@assets/images/profile.png";

import "./portfolio.css";

export const metadata: Metadata = {
  title: "Portfolio demo",
  description:
    "A portfolio page built only from the design system's components and tokens."
};

// Placeholder contact details: this repository is public
const contacts = [
  {
    label: "Email",
    value: "hello@example.com",
    href: "mailto:hello@example.com",
    icon: Mail
  },
  { label: "Phone", value: "+1 555 0100", href: "tel:+15550100", icon: Phone },
  { label: "Birthday", value: "January 1, 2000", icon: Calendar },
  { label: "Location", value: "Chattogram, BD", icon: MapPin }
] as const;

const socials = [
  { label: "Facebook", href: "https://facebook.com/mahimfarhad", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com/mahimfarhad", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/mahimfarhad", icon: Instagram },
  { label: "Dribbble", href: "https://dribbble.com/mahimfarhad", icon: Dribbble }
];

const pageSections = ["about", "projects", "skills", "contact"] as const;

const highlights = [
  { value: "18+", text: "Projects completed with modern frontend workflows." },
  {
    value: "4+ years",
    text: "Designing and developing responsive experiences for startups and teams."
  },
  {
    value: "Accessible",
    text: "Focused on clean markup, readable styling, and inclusive interactions."
  }
];

const projects = [
  {
    title: "Studio Landing Page",
    description:
      "A polished landing page with animated sections, modern interactions, and refined branding.",
    tags: ["Next.js", "Tailwind", "Motion"]
  },
  {
    title: "Dashboard Experience",
    description:
      "A responsive project management dashboard with clear data visualisations and smooth navigation.",
    tags: ["React", "UX", "Data"]
  },
  {
    title: "E-commerce Refresh",
    description:
      "A high-conversion storefront with product storytelling, modern checkout flows, and polished UI.",
    tags: ["Commerce", "Design", "Performance"]
  }
];

const skills = [
  "Responsive interfaces",
  "Design systems",
  "Component-driven UI",
  "CSS theming",
  "Animations",
  "Accessible layouts"
];

const cardClasses = "rounded-xl border bg-card p-6 text-card-foreground sm:p-8";

function Profile() {
  return (
    <Stack asChild gap="6" className={cn(cardClasses, "xl:sticky xl:top-8")}>
      <aside id="contact" aria-label="Profile" className="scroll-mt-8">
        <Stack
          gap="6"
          className="sm:flex-row sm:items-center xl:flex-col xl:items-stretch"
        >
          <Image
            src={profile}
            alt="Portrait of Farhad Al Rashid"
            placeholder="blur"
            sizes="(min-width: 1280px) 18rem, 6rem"
            className="size-24 shrink-0 rounded-lg object-cover xl:aspect-4/3 xl:h-auto xl:w-full"
          />

          <Stack gap="3">
            <p className={headingVariants({ size: "h5", weight: "regular" })}>
              Farhad Al Rashid
            </p>
            <span className="w-fit rounded-md bg-muted px-2.5 py-0.5 font-mono text-xs font-medium text-accent-text uppercase">
              {"<Programmer />"}
            </span>
          </Stack>
        </Stack>

        <hr />

        <Grid asChild minItemWidth="14rem" gap="6" className="xl:grid-cols-1">
          <ul aria-label="Contact details">
            {contacts.map((contact) => (
              <Stack asChild key={contact.label} direction="row" align="center" gap="4">
                <li>
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-muted text-accent-text">
                    <Icon as={contact.icon} size="base" />
                  </span>

                  <Stack gap="1" className="min-w-0">
                    <Text as="span" variant="caption" className="uppercase">
                      {contact.label}
                    </Text>
                    <Text as="span" variant="small" className="truncate">
                      {"href" in contact ? (
                        <Link
                          href={contact.href}
                          variant="subtle"
                          className="text-foreground"
                        >
                          {contact.value}
                        </Link>
                      ) : (
                        contact.value
                      )}
                    </Text>
                  </Stack>
                </li>
              </Stack>
            ))}
          </ul>
        </Grid>

        <hr />

        <Stack asChild direction="row" justify="center" gap="2">
          <ul aria-label="Social profiles">
            {socials.map((social) => (
              <li key={social.label}>
                <Button
                  asChild
                  variant="soft"
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
      </aside>
    </Stack>
  );
}

function PageNav() {
  return (
    // Pinned to the card's top-right corner, like a tab
    <nav
      aria-label="Page sections"
      className="-mx-6 -mt-6 flex justify-end sm:-mx-8 sm:-mt-8"
    >
      <Stack
        direction="row"
        align="center"
        gap="2"
        className="w-full min-w-0 overflow-x-auto border-b bg-muted px-4 py-2 sm:w-auto sm:rounded-bl-xl sm:border-l sm:px-6"
      >
        <Stack asChild direction="row" gap="1">
          <ul>
            {pageSections.map((section) => (
              <li key={section}>
                <Link
                  href={`#${section}`}
                  variant="subtle"
                  className="block px-3 py-2 text-sm font-medium text-foreground uppercase hover:text-accent-text"
                >
                  {section}
                </Link>
              </li>
            ))}
          </ul>
        </Stack>

        <ThemeToggle />
      </Stack>
    </nav>
  );
}

function Highlights() {
  return (
    <Grid asChild minItemWidth="16rem" gap="4">
      <ul aria-label="Highlights">
        {highlights.map((highlight) => (
          <Stack asChild key={highlight.value} gap="2" className="rounded-xl border p-6">
            <li>
              <p
                className={cn(
                  headingVariants({ size: "h4", weight: "regular" }),
                  "uppercase"
                )}
              >
                {highlight.value}
              </p>
              <Text variant="small" className="text-muted-foreground">
                {highlight.text}
              </Text>
            </li>
          </Stack>
        ))}
      </ul>
    </Grid>
  );
}

function Projects() {
  return (
    <Stack asChild gap="6">
      <section aria-labelledby="projects" className="scroll-mt-8">
        <Stack direction="row" align="baseline" justify="between" gap="4" wrap>
          <Heading as="h2" size="h4" id="projects">
            Featured projects
          </Heading>
          <Text variant="small" className="text-muted-foreground">
            Latest work and case studies
          </Text>
        </Stack>

        <Grid asChild minItemWidth="16rem" gap="4">
          <ul>
            {projects.map((project) => (
              <Stack
                asChild
                key={project.title}
                gap="4"
                className="rounded-xl border p-6"
              >
                <li>
                  <Heading as="h3" size="h5">
                    {project.title}
                  </Heading>
                  <Text variant="small" className="text-muted-foreground">
                    {project.description}
                  </Text>
                  <Stack asChild direction="row" gap="2" wrap>
                    <ul aria-label="Technologies">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border px-3 py-1 text-xs tracking-widest text-muted-foreground uppercase"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </Stack>
                </li>
              </Stack>
            ))}
          </ul>
        </Grid>
      </section>
    </Stack>
  );
}

function Skills() {
  return (
    <Stack asChild gap="6">
      <section aria-labelledby="skills" className="scroll-mt-8">
        <Heading as="h2" size="h4" id="skills">
          Core skills
        </Heading>

        <Grid asChild minItemWidth="14rem" gap="3">
          <ul>
            {skills.map((skill) => (
              <li key={skill} className="rounded-xl border bg-muted/40 p-5 text-sm">
                {skill}
              </li>
            ))}
          </ul>
        </Grid>
      </section>
    </Stack>
  );
}

export default function PortfolioDemoPage() {
  return (
    <div className="portfolio-theme min-h-dvh bg-background text-foreground">
      <Container size="full" asChild className="max-w-(--breakpoint-2xl)">
        <main>
          <Section spacing="md">
            <Grid
              gap="8"
              className="grid-cols-[minmax(0,1fr)] items-start xl:grid-cols-[22rem_minmax(0,1fr)]"
            >
              <Profile />

              <Stack gap="12" className={cardClasses}>
                <PageNav />

                <Stack gap="6" id="about" className="scroll-mt-8">
                  <Heading
                    as="h1"
                    className="max-w-5xl wrap-break-word hyphens-auto uppercase"
                  >
                    I build memorable frontend experiences for brands and products.
                  </Heading>
                  <Text variant="lead" className="max-w-2xl">
                    I create polished websites, interactive portfolio showcases, and
                    usable design systems with clean component architecture, fast
                    performance, and a strong visual language.
                  </Text>
                  <Stack direction="row" gap="4" wrap>
                    <Button asChild size="lg" variant="secondary">
                      <a href="#projects">View portfolio</a>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-accent-text text-accent-text hover:bg-accent hover:text-accent-foreground"
                    >
                      <a href="#contact">Get in touch</a>
                    </Button>
                  </Stack>
                </Stack>

                <Highlights />
                <Projects />
                <Skills />
              </Stack>
            </Grid>
          </Section>

          <Text
            variant="small"
            className="pb-section-sm text-center text-muted-foreground"
          >
            Built only from the design system&rsquo;s components and tokens.{" "}
            <Link href="/">Back to the showcase</Link>
          </Text>
        </main>
      </Container>
    </div>
  );
}
