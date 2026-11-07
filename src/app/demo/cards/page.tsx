import type { ReactNode } from "react";

import type { Metadata } from "next";

import { Check, EllipsisVertical, Heart, Share2, Star, X } from "lucide-react";

import { cn } from "@utils/cn";

import { Badge } from "@components/badge";
import { Button } from "@components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@components/card";
import { Container } from "@components/container";
import { Grid } from "@components/grid";
import { Heading } from "@components/heading";
import { Icon } from "@components/icon";
import { Link } from "@components/link";
import { Section } from "@components/section";
import { Stack } from "@components/stack";
import { Text } from "@components/text";
import { ThemeToggle } from "@components/theme-toggle";

import { artwork, podcasts, showtimes } from "./data";

export const metadata: Metadata = {
  title: "Card examples demo",
  description:
    "The Card component arranged like the examples in the Material Design 3 card guidelines."
};

// Material's elevated and filled looks. The Card's own border is the outlined look.
const elevatedClasses = "border-transparent shadow-md";
const filledClasses = "border-transparent bg-muted";

// Material's specs: 8dp at most between cards
const collectionGap = "2";

function Example({
  id,
  title,
  text,
  children
}: {
  id: string;
  title: string;
  text: string;
  children: ReactNode;
}) {
  return (
    <Section spacing="sm" aria-labelledby={id}>
      <Stack gap="6">
        <Stack gap="2" className="max-w-2xl">
          <Heading as="h2" size="h3" id={id}>
            {title}
          </Heading>
          <Text className="text-muted-foreground">{text}</Text>
        </Stack>
        {children}
      </Stack>
    </Section>
  );
}

// An image placeholder, flush with the card's edges when the card has pt-0
function Media({ tone = 0, className }: { tone?: number; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("aspect-video w-full", artwork[tone % artwork.length], className)}
    />
  );
}

function Variants() {
  return (
    <Example
      id="variants"
      title="Variants"
      text="Elevated, filled and outlined. Each is equally legible and functional, so the choice comes down to style."
    >
      <Grid columns="1" gap={collectionGap} className="md:grid-cols-3">
        <Card size="sm" className={elevatedClasses}>
          <CardHeader>
            <CardTitle>Elevated</CardTitle>
            <CardDescription>
              A drop shadow separates it from the background.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm" className={filledClasses}>
          <CardHeader>
            <CardTitle>Filled</CardTitle>
            <CardDescription>Subtle separation and the least emphasis.</CardDescription>
          </CardHeader>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Outlined</CardTitle>
            <CardDescription>A visual boundary around the container.</CardDescription>
          </CardHeader>
        </Card>
      </Grid>
    </Example>
  );
}

function Anatomy() {
  const podcast = podcasts[0]!;

  return (
    <Example
      id="anatomy"
      title="Anatomy"
      text="Only the container is required. A common configuration has an image, headline, subhead, supporting text and buttons."
    >
      <Grid columns="1" gap={collectionGap} className="md:grid-cols-2">
        <Card size="sm" className="pt-0">
          <Media />
          <CardHeader>
            <CardTitle>{podcast.title}</CardTitle>
            <CardDescription>{podcast.host}</CardDescription>
          </CardHeader>
          <CardContent>
            <Text variant="small">{podcast.text}</Text>
          </CardContent>
          <CardContent className="flex justify-end gap-2">
            <Button variant="outline" size="xs">
              Save
            </Button>
            <Button size="xs">Listen</Button>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardContent className="flex items-center gap-3">
            <Thumbnail initials="MO" />
            <div className="min-w-0 flex-1">
              <CardTitle>Thumbnail</CardTitle>
              <CardDescription>For an avatar or logo</CardDescription>
            </div>
            <OverflowButton />
          </CardContent>
          <hr />
          <CardContent>
            <Text variant="small">
              A full-width divider separates regions of the card.
            </Text>
          </CardContent>
          <hr className="mx-(--card-padding)" />
          <CardContent>
            <Text variant="small">An inset divider separates related content.</Text>
          </CardContent>
        </Card>
      </Grid>
    </Example>
  );
}

function Thumbnail({ initials }: { initials: string }) {
  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
      {initials}
    </span>
  );
}

// Placed in a card's top or bottom corner. The menu itself isn't a component yet.
function OverflowButton() {
  return (
    <Button
      variant="soft"
      size="sm"
      iconOnly
      rounded
      aria-label="More options"
      className="shrink-0"
    >
      <Icon as={EllipsisVertical} />
    </Button>
  );
}

function TextOnImage() {
  return (
    <Example
      id="text-on-image"
      title="Text on images"
      text="Best avoided. If it's necessary, a bounding shape under the text keeps its contrast, whatever the image."
    >
      <Card className="relative max-w-xl border-transparent py-0">
        <Media tone={2} className="aspect-21/9" />
        <div className="absolute inset-x-3 bottom-3 rounded-lg bg-background/90 px-3 py-2 text-foreground">
          <CardTitle>Coastal weekend</CardTitle>
          <Text as="span" variant="small">
            Three days, two nights
          </Text>
        </div>
      </Card>
    </Example>
  );
}

function Actions() {
  return (
    <Example
      id="actions"
      title="Actions"
      text="One large primary action, or several action areas: buttons, icon buttons, selection controls and linked text. These samples are static."
    >
      <Grid columns="1" gap={collectionGap} className="md:grid-cols-2 lg:grid-cols-3">
        <Card asChild size="sm" className="pt-0">
          <a href="#actions">
            <Media tone={1} />
            <CardHeader>
              <CardTitle>Primary action area</CardTitle>
              <CardDescription>
                The whole card is one target that opens more detail.
              </CardDescription>
            </CardHeader>
          </a>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>For actions like Learn more or Add to cart.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button size="xs">Add to cart</Button>
            <Button variant="outline" size="xs">
              Learn more
            </Button>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Icon buttons</CardTitle>
            <CardDescription>For actions like Save, Share or Rate.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="soft" size="sm" iconOnly rounded aria-label="Save">
              <Icon as={Heart} />
            </Button>
            <Button variant="soft" size="sm" iconOnly rounded aria-label="Share">
              <Icon as={Share2} />
            </Button>
            <Button variant="soft" size="sm" iconOnly rounded aria-label="Rate">
              <Icon as={Star} />
            </Button>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Selection chips</CardTitle>
            <CardDescription>Tonight&rsquo;s showings</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack asChild direction="row" gap="2" wrap>
              <ul aria-label="Showtimes">
                {showtimes.map((time) => (
                  <li key={time}>
                    <Badge asChild variant="outline" rounded className="normal-case">
                      <a href="#actions">{time}</a>
                    </Badge>
                  </li>
                ))}
              </ul>
            </Stack>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Linked text</CardTitle>
          </CardHeader>
          <CardContent>
            <Text variant="small">
              Supporting text can hold a link, like the{" "}
              <Link href="#actions">full episode notes</Link>.
            </Text>
          </CardContent>
        </Card>

        <Card size="sm">
          <CardHeader>
            <CardTitle>Overflow menu</CardTitle>
            <CardDescription>
              Related actions, in the top or bottom corner of the card.
            </CardDescription>
            <CardAction>
              <OverflowButton />
            </CardAction>
          </CardHeader>
        </Card>
      </Grid>
    </Example>
  );
}

function Collections() {
  return (
    <Example
      id="collections"
      title="Collections"
      text="Grids, vertical lists and carousels. Cards in a collection share one elevation, and filter or sort options sit outside the collection."
    >
      <Stack gap="8">
        <Stack gap="3">
          <Stack direction="row" align="center" justify="between" gap="3" wrap>
            <Heading as="h3" size="h5">
              Grid
            </Heading>
            <Text as="span" variant="small" className="text-muted-foreground">
              Sorted by newest
            </Text>
          </Stack>
          <Grid
            asChild
            columns="1"
            gap={collectionGap}
            className="sm:grid-cols-2 lg:grid-cols-4"
          >
            <ul>
              {podcasts.map((podcast, index) => (
                <Card asChild key={podcast.title} size="sm" className="pt-0">
                  <li>
                    <Media tone={index} />
                    <CardHeader>
                      <CardTitle>{podcast.title}</CardTitle>
                      <CardDescription>{podcast.host}</CardDescription>
                    </CardHeader>
                  </li>
                </Card>
              ))}
            </ul>
          </Grid>
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="h5">
            Staggered grid
          </Heading>
          <ul className="columns-2 gap-2 md:columns-4">
            {podcasts.map((podcast, index) => (
              <Card
                asChild
                key={podcast.title}
                size="sm"
                className="mb-2 break-inside-avoid pt-0"
              >
                <li>
                  <Media
                    tone={index}
                    className={index % 2 ? "aspect-square" : "aspect-3/4"}
                  />
                  <CardHeader>
                    <CardTitle>{podcast.title}</CardTitle>
                  </CardHeader>
                </li>
              </Card>
            ))}
          </ul>
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="h5">
            Vertical list
          </Heading>
          <Stack asChild gap={collectionGap}>
            <ul>
              {podcasts.slice(0, 3).map((podcast, index) => (
                <Card
                  asChild
                  key={podcast.title}
                  size="sm"
                  className={cn(filledClasses, "flex-row items-center py-0")}
                >
                  <li>
                    <Media tone={index} className="aspect-square w-20 shrink-0" />
                    <div className="min-w-0 flex-1 pr-(--card-padding)">
                      <CardTitle>{podcast.title}</CardTitle>
                      <CardDescription>{podcast.text}</CardDescription>
                    </div>
                  </li>
                </Card>
              ))}
            </ul>
          </Stack>
        </Stack>

        <Stack gap="3">
          <Heading as="h3" size="h5">
            Carousel
          </Heading>
          {/* tabIndex: keyboard users can scroll a region with nothing focusable inside */}
          <div
            role="region"
            aria-label="Podcasts carousel"
            tabIndex={0}
            className="snap-x overflow-x-auto rounded-xl pb-2 outline-hidden focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <ul className="flex w-max gap-2">
              {podcasts.map((podcast, index) => (
                <Card
                  asChild
                  key={podcast.title}
                  size="sm"
                  className="w-60 snap-start pt-0"
                >
                  <li>
                    <Media tone={index} />
                    <CardHeader>
                      <CardTitle>{podcast.title}</CardTitle>
                      <CardDescription>{podcast.host}</CardDescription>
                    </CardHeader>
                  </li>
                </Card>
              ))}
            </ul>
          </div>
        </Stack>
      </Stack>
    </Example>
  );
}

function Adaptive() {
  return (
    <Example
      id="adaptive"
      title="Adaptive layout"
      text="A horizontal card on a phone can become a larger vertical card on a big screen, with more room for the image and text."
    >
      <Grid gap={collectionGap} className="md:grid-cols-3">
        {podcasts.slice(1, 4).map((podcast, index) => (
          <Card
            key={podcast.title}
            size="sm"
            className="flex-row items-center py-0 md:flex-col md:items-stretch md:pb-(--card-padding)"
          >
            <Media tone={index + 1} className="w-24 shrink-0 self-stretch md:w-full" />
            <CardHeader className="min-w-0 flex-1 py-(--card-padding) pl-0 md:py-0 md:pl-(--card-padding)">
              <CardTitle>{podcast.title}</CardTitle>
              <CardDescription>{podcast.text}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </Grid>
    </Example>
  );
}

function DoAndDont() {
  return (
    <Example
      id="do-and-dont"
      title="Do and don't"
      text="Cards work well shown together, but not everything needs one: spacing, headlines or dividers can make a simpler hierarchy."
    >
      <Grid gap="6" className="md:grid-cols-2">
        <Stack gap="3">
          <Badge variant="success" rounded className="self-start">
            <Icon as={Check} />
            Do
          </Badge>
          <ul className="divide-y rounded-xl border">
            {podcasts.slice(0, 3).map((podcast) => (
              <li key={podcast.title} className="p-4 text-sm">
                {podcast.title}
              </li>
            ))}
          </ul>
        </Stack>

        <Stack gap="3">
          <Badge variant="destructive" rounded className="self-start">
            <Icon as={X} />
            Don&rsquo;t
          </Badge>
          <Stack asChild gap="2">
            <ul>
              {podcasts.slice(0, 3).map((podcast) => (
                <Card asChild key={podcast.title} size="sm" className={elevatedClasses}>
                  <li>
                    <CardContent className="text-sm">{podcast.title}</CardContent>
                  </li>
                </Card>
              ))}
            </ul>
          </Stack>
        </Stack>
      </Grid>
    </Example>
  );
}

export default function CardsDemoPage() {
  return (
    <Container asChild>
      <main>
        <Section spacing="sm">
          <Stack direction="row" align="start" justify="between" gap="4">
            <Stack gap="2" className="max-w-2xl">
              <Heading as="h1" size="h2">
                Card examples
              </Heading>
              <Text variant="lead">
                The Card component, arranged like the examples in the Material Design 3
                card guidelines. It keeps this system&rsquo;s own theme, and all the data
                is fictional.
              </Text>
              <Text variant="small" className="text-muted-foreground">
                <Link href="/demo">More demos</Link>
              </Text>
            </Stack>
            <ThemeToggle />
          </Stack>
        </Section>

        <Variants />
        <Anatomy />
        <TextOnImage />
        <Actions />
        <Collections />
        <Adaptive />
        <DoAndDont />
      </main>
    </Container>
  );
}
