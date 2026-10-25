import type { Metadata } from "next";

import { Container } from "@components/container";
import { Heading } from "@components/heading";
import { Link } from "@components/link";
import { Main } from "@components/main";
import { Section } from "@components/section";
import { Stack } from "@components/stack";
import { Text } from "@components/text";

export const metadata: Metadata = {
  title: "Page not found"
};

// Unmatched URLs and notFound(). Replaces Next's default page, which has no <main> for
// the skip link and does not follow the app's theme.
export default function NotFound() {
  return (
    <Container size="sm" asChild>
      <Main>
        <Section spacing="lg">
          <Stack gap="4" align="start">
            <Text variant="overline" className="text-muted-foreground">
              404
            </Text>
            <Heading as="h1" size="h2">
              Page not found
            </Heading>
            <Text className="text-muted-foreground">
              The page you are looking for does not exist or has moved.
            </Text>
            <Link href="/">Back to the showcase</Link>
          </Stack>
        </Section>
      </Main>
    </Container>
  );
}
