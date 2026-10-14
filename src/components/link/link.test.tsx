import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Link } from "./link";

describe("Link", () => {
  test("renders a link to href", () => {
    render(<Link href="/">Docs</Link>);

    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("href", "/");
  });

  test("is inline by default, subtle on request", () => {
    render(
      <>
        <Link href="/">Inline</Link>
        <Link href="/" variant="subtle">
          Subtle
        </Link>
      </>
    );

    expect(screen.getByRole("link", { name: "Inline" })).toHaveAttribute(
      "data-variant",
      "inline"
    );
    expect(screen.getByRole("link", { name: "Subtle" })).toHaveAttribute(
      "data-variant",
      "subtle"
    );
  });

  test("an inline link is underlined, so it is not identified by color alone", () => {
    render(<Link href="/">Docs</Link>);

    expect(screen.getByRole("link", { name: "Docs" })).toHaveClass("underline");
  });

  test("passes anchor attributes through", () => {
    render(
      <Link href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
        Next.js
      </Link>
    );
    const link = screen.getByRole("link", { name: "Next.js" });

    expect(link).toHaveAttribute("href", "https://nextjs.org");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("without href, renders a placeholder anchor that is not announced as a link", () => {
    // @ts-expect-error -- simulates untyped callers (JS, CMS data) that omit href
    render(<Link>Coming soon</Link>);
    const placeholder = screen.getByText("Coming soon");

    expect(placeholder.tagName).toBe("A");
    expect(placeholder).not.toHaveAttribute("href");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
