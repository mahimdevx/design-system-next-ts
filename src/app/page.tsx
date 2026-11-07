import {
  ArrowRight,
  Bell,
  Check,
  CircleCheck,
  CircleX,
  Info,
  Plus,
  Search,
  TriangleAlert
} from "lucide-react";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@components/alert";
import { Badge } from "@components/badge";
import { Button } from "@components/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@components/card";
import { Container } from "@components/container";
import { Grid } from "@components/grid";
import { Heading, headingElements, headingVariants } from "@components/heading";
import { Icon } from "@components/icon";
import { Link } from "@components/link";
import { Section } from "@components/section";
import { Stack } from "@components/stack";
import { Text } from "@components/text";
import { ThemeToggle } from "@components/theme-toggle";
import { LogoMark } from "@assets/icons/logo-mark";

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

const badgeVariantNames = [
  "primary",
  "secondary",
  "accent",
  "soft",
  "outline",
  "muted",
  "success",
  "warning",
  "destructive"
] as const;

const alertSamples = [
  { variant: "primary", icon: Info },
  { variant: "secondary", icon: Info },
  { variant: "accent", icon: Info },
  { variant: "soft", icon: Info },
  { variant: "outline", icon: Info },
  { variant: "muted", icon: Info },
  { variant: "success", icon: CircleCheck },
  { variant: "warning", icon: TriangleAlert },
  { variant: "destructive", icon: CircleX }
] as const;

const sections = [
  "colors",
  "typography",
  "buttons",
  "badges",
  "alerts",
  "cards",
  "icons",
  "layout"
];

export default function FoundationsPage() {
  const sampleClasses =
    "flex h-16 items-center justify-center rounded-md border bg-muted text-sm font-medium text-muted-foreground";

  return (
    <Container size="md" asChild>
      <main>
        <Section spacing="sm" asChild>
          <header>
            <Stack direction="row" align="start" justify="between" gap="4">
              <Stack gap="2">
                <Heading as="h1">Foundations</Heading>
                <Text variant="lead">
                  Design tokens, type and core components, in light and dark mode.
                </Text>
              </Stack>

              <ThemeToggle />
            </Stack>
          </header>
        </Section>

        <Section spacing="sm" aria-labelledby="colors">
          <Stack>
            <Heading as="h2" size="h3" id="colors">
              Colors
            </Heading>

            <Grid asChild minItemWidth="9rem" gap="3">
              <ul>
                {colorTokens.map((token) => (
                  <li
                    key={token.name}
                    className={`${token.swatch} flex h-24 items-end rounded-lg border p-3 text-sm font-medium`}
                  >
                    {token.name}
                  </li>
                ))}
              </ul>
            </Grid>

            <Stack asChild direction="row" gap="3">
              <ul aria-label="Chart colors">
                {chartTokens.map((swatch, index) => (
                  <li key={swatch} className={`${swatch} size-12 rounded-md`}>
                    <span className="sr-only">chart-{index + 1}</span>
                  </li>
                ))}
              </ul>
            </Stack>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="typography">
          <Stack>
            <Heading as="h2" size="h3" id="typography">
              Typography
            </Heading>

            <Text className="text-muted-foreground">
              Headings are fluid: resize the window to see them scale between mobile and
              desktop sizes.
            </Text>

            <Stack asChild gap="0" className="divide-y">
              <ul>
                {headingElements.map((size) => (
                  <Stack asChild key={size} gap="1" className="py-4">
                    <li>
                      <Text variant="overline" className="text-muted-foreground">
                        {size}
                      </Text>
                      {/* Visual samples, not page sections: a <p> keeps them out of the outline */}
                      <p className={headingVariants({ size })}>
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </li>
                  </Stack>
                ))}

                {textVariantNames.map((variant) => (
                  <Stack asChild key={variant} gap="1" className="py-4">
                    <li>
                      <Text variant="overline" className="text-muted-foreground">
                        {variant}
                      </Text>
                      <Text variant={variant}>
                        The quick brown fox jumps over the lazy dog
                      </Text>
                    </li>
                  </Stack>
                ))}
              </ul>
            </Stack>

            <Heading as="h3" size="h5">
              Plain HTML
            </Heading>
            <Text>
              Inline elements need no component: <strong>strong</strong>,{" "}
              <em>emphasis</em>, <mark>highlighted</mark>, <code>pnpm dev</code> and{" "}
              <kbd>Ctrl</kbd> + <kbd>K</kbd>.
            </Text>
            <blockquote>
              Typography is the craft of endowing human language with a durable visual
              form.
            </blockquote>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="buttons">
          <Stack>
            <Heading as="h2" size="h3" id="buttons">
              Buttons
            </Heading>

            <Stack direction="row" align="center" gap="3" wrap>
              {buttonVariantNames.map((variant) => (
                <Button key={variant} variant={variant}>
                  {variant}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" align="center" gap="3" wrap>
              {buttonSizes.map((size) => (
                <Button key={size} size={size}>
                  {size}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" align="center" gap="3" wrap>
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
            </Stack>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="badges">
          <Stack>
            <Heading as="h2" size="h3" id="badges">
              Badges
            </Heading>

            <Stack direction="row" align="center" gap="3" wrap>
              {badgeVariantNames.map((variant) => (
                <Badge key={variant} variant={variant}>
                  {variant}
                </Badge>
              ))}
            </Stack>

            <Stack direction="row" align="center" gap="3" wrap>
              <Badge variant="success" rounded>
                <Icon as={Check} />
                Published
              </Badge>
              <Badge variant="muted" rounded>
                Design systems
              </Badge>
              <Badge variant="outline" rounded asChild>
                <a href="#badges">Link badge</a>
              </Badge>
            </Stack>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="alerts">
          <Stack>
            <Heading as="h2" size="h3" id="alerts">
              Alerts
            </Heading>

            <Stack gap="3">
              {alertSamples.map(({ variant, icon }) => (
                <Alert key={variant} variant={variant}>
                  <Icon as={icon} />
                  <AlertTitle>{variant} alert</AlertTitle>
                  <AlertDescription>
                    A short description of what happened and{" "}
                    <Link href="#alerts">what to do next</Link>.
                  </AlertDescription>
                </Alert>
              ))}

              <Alert variant="outline">
                <Icon as={Bell} />
                <AlertTitle>With an action</AlertTitle>
                <AlertDescription>
                  The action stays beside the text, however long the text is, and moves
                  below it on a phone.
                </AlertDescription>
                <AlertAction>
                  <Button variant="outline" size="xs">
                    Undo
                  </Button>
                </AlertAction>
              </Alert>

              <Alert variant="outline">
                <Icon as={Info} />
                <AlertTitle>
                  <h3>Heading in the title</h3>
                </AlertTitle>
                <AlertDescription>
                  In the page outline, with the same look as any other title.
                </AlertDescription>
              </Alert>

              <Alert variant="muted">
                <AlertDescription>
                  Just a description: no icon, no title, no action.
                </AlertDescription>
              </Alert>
            </Stack>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="cards">
          <Stack>
            <Heading as="h2" size="h3" id="cards">
              Cards
            </Heading>

            <Grid minItemWidth="18rem" gap="4">
              <Card>
                <CardHeader>
                  <CardTitle>Every part</CardTitle>
                  <CardDescription>Header, action, content and footer.</CardDescription>
                  <CardAction>
                    <Button variant="outline" size="xs">
                      Edit
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Text variant="small">
                    Every part is optional, so use only what you need.
                  </Text>
                </CardContent>
                <CardFooter>
                  <Button size="xs">Save</Button>
                  <Button variant="outline" size="xs">
                    Cancel
                  </Button>
                </CardFooter>
              </Card>

              <Card size="sm">
                <CardHeader>
                  <CardTitle>Small</CardTitle>
                  <CardDescription>Tighter padding on every part.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Text variant="small">One size prop on the card.</Text>
                </CardContent>
              </Card>

              <Card size="lg">
                <CardHeader>
                  <CardTitle>Large</CardTitle>
                  <CardDescription>More room for feature tiles.</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    <h3>Heading in a card title</h3>
                  </CardTitle>
                  <CardDescription>
                    In the page outline, with the same look.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card asChild>
                <a href="#cards">
                  <CardHeader>
                    <CardTitle>Link card</CardTitle>
                    <CardDescription>The whole card is clickable.</CardDescription>
                  </CardHeader>
                </a>
              </Card>
            </Grid>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="icons">
          <Stack>
            <Heading as="h2" size="h3" id="icons">
              Icons
            </Heading>

            <Stack asChild direction="row" align="end" gap="6" wrap>
              <ul aria-label="Icon sizes">
                {iconSizes.map((size) => (
                  <Stack asChild key={size} align="center" gap="2">
                    <li>
                      <Icon as={Search} size={size} />
                      <Text variant="caption" className="font-mono">
                        {size}
                      </Text>
                    </li>
                  </Stack>
                ))}
              </ul>
            </Stack>

            <Text variant="small" className="text-muted-foreground">
              Without a size, icons follow their container: each button sets its own icon
              size.
            </Text>
            <Stack direction="row" align="center" gap="3" wrap>
              {buttonSizes.map((size) => (
                <Button key={size} size={size} variant="outline">
                  <Icon as={Plus} />
                  {size}
                </Button>
              ))}
            </Stack>

            <Stack direction="row" align="center" gap="6" wrap>
              <Text variant="small" as="span" className="flex items-center gap-2">
                <Icon as={LogoMark} size="lg" />
                Custom SVG icon
              </Text>
              <Text variant="small" as="span" className="flex items-center gap-2">
                <Icon as={Check} aria-label="Completed" className="text-success-text" />
                Labelled icon (announced as &ldquo;Completed&rdquo;)
              </Text>
            </Stack>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="layout">
          <Stack>
            <Heading as="h2" size="h3" id="layout">
              Layout
            </Heading>

            <Text className="text-muted-foreground">
              Container sets the page width, Section the vertical rhythm, Stack and Grid
              the layout inside. Spacing is fluid, and the intrinsic grid picks its own
              column count: resize the window.
            </Text>

            <Heading as="h3" size="h5">
              Intrinsic grid
            </Heading>
            <Grid asChild minItemWidth="12rem" gap="3">
              <ul aria-label="Intrinsic grid">
                {["One", "Two", "Three", "Four", "Five", "Six"].map((item) => (
                  <li key={item} className={sampleClasses}>
                    {item}
                  </li>
                ))}
              </ul>
            </Grid>

            <Heading as="h3" size="h5">
              Fixed columns
            </Heading>
            <Grid columns="3" gap="3">
              <div className={sampleClasses}>1 / 3</div>
              <div className={sampleClasses}>2 / 3</div>
              <div className={sampleClasses}>3 / 3</div>
            </Grid>

            <Heading as="h3" size="h5">
              Stack
            </Heading>
            <Stack className="md:flex-row" gap="3">
              <div className={`${sampleClasses} md:flex-1`}>Column on mobile</div>
              <div className={`${sampleClasses} md:flex-1`}>Row from md</div>
            </Stack>
          </Stack>
        </Section>

        <Section spacing="sm" aria-labelledby="links">
          <Stack>
            <Heading as="h2" size="h3" id="links">
              Links
            </Heading>

            <Text>
              Inline links sit inside running text and stay underlined, so they are not
              identified by color alone: read about the{" "}
              <Link href="#typography">type scale</Link> or the{" "}
              <Link href="https://nextjs.org/docs">Next.js docs</Link>.
            </Text>

            <nav aria-label="Showcase sections">
              <Stack asChild direction="row" gap="6" wrap className="gap-y-2">
                <ul>
                  {sections.map((section) => (
                    <li key={section}>
                      <Link href={`#${section}`} variant="subtle" className="capitalize">
                        {section}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Stack>
            </nav>
          </Stack>
        </Section>
      </main>
    </Container>
  );
}
