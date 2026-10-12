"use client";

import { useEffect } from "react";

import { Button } from "@components/button";
import { Heading } from "@components/heading";
import { Text } from "@components/text";

type ErrorProps = {
  error: Error & { digest?: string };
  retry: () => void;
};

// Shown instead of the page when something inside it throws, so one broken component
// never leaves a blank screen
export default function ErrorPage({ error, retry }: ErrorProps) {
  useEffect(() => {
    // Replace with an error reporting service (Sentry, etc.) when the app has one
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex max-w-xl flex-col items-start gap-4 px-4 py-24">
      <Heading as="h1" size="h3">
        Something went wrong
      </Heading>
      <Text className="text-muted-foreground">
        This page could not be displayed. Try again, and if the problem continues, reload
        the page.
      </Text>
      <Button onClick={() => retry()}>Try again</Button>
    </main>
  );
}
