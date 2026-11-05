import type { Metadata } from "next";

import { ArrowRight } from "lucide-react";

import { Container } from "@components/container";
import { Grid } from "@components/grid";
import { Heading } from "@components/heading";
import { Icon } from "@components/icon";
import { Link } from "@components/link";
import { Section } from "@components/section";
import { Stack } from "@components/stack";
import { Text } from "@components/text";
import { ThemeToggle } from "@components/theme-toggle";

export const metadata: Metadata = {
  title: "Demos",
  description: "Full pages built only from the design system's components and tokens."
};

const demos = [
  {
    href: "/demo/portfolio",
    title: "Portfolio",
    description:
      "A personal portfolio: sticky header, hero, bento services, project cards, timeline and contact, in the system's own theme."
  },
  {
    href: "/demo/store",
    title: "Store",
    description:
      "An esports apparel store home page: announcement bar, product hero, order paths, product grid, team pricing and a full footer."
  }
] as const;

export default function DemosPage() {
  return (
    <Container size="md" asChild>
      <main>
        <Section spacing="sm">
          <Stack gap="10">
            <Stack direction="row" align="start" justify="between" gap="4">
              <Stack gap="2">
                <Heading as="h1">Demos</Heading>
                <Text variant="lead">
                  Full pages built only from the design system&rsquo;s components and
                  tokens. Nothing in the system is changed for them.
                </Text>
              </Stack>
              <ThemeToggle />
            </Stack>

            <Grid asChild minItemWidth="18rem" gap="4">
              <ul>
                {demos.map((demo) => (
                  <Stack
                    asChild
                    key={demo.href}
                    gap="3"
                    className="rounded-xl border p-6"
                  >
                    <li>
                      <Heading as="h2" size="h4">
                        {demo.title}
                      </Heading>
                      <Text variant="small" className="text-muted-foreground">
                        {demo.description}
                      </Text>
                      <Link href={demo.href} className="flex items-center gap-1">
                        Open the {demo.title.toLowerCase()} demo
                        <Icon as={ArrowRight} />
                      </Link>
                    </li>
                  </Stack>
                ))}
              </ul>
            </Grid>

            <Text variant="small" className="text-muted-foreground">
              <Link href="/">Back to the component showcase</Link>
            </Text>
          </Stack>
        </Section>
      </main>
    </Container>
  );
}
