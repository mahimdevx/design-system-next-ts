import { render, screen } from "@testing-library/react";
import { Check } from "lucide-react";
import { describe, expect, test } from "vitest";

import { Icon } from "@components/icon";

import { Badge } from "./badge";

describe("Badge", () => {
  test("renders its label as static text, primary by default", () => {
    render(<Badge>New</Badge>);
    const badge = screen.getByText("New");

    expect(badge.tagName).toBe("SPAN");
    expect(badge).toHaveAttribute("data-slot", "badge");
    expect(badge).toHaveAttribute("data-variant", "primary");
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  test.each(["success", "warning", "destructive", "outline"] as const)(
    "variant=%s is exposed as data-variant",
    (variant) => {
      render(<Badge variant={variant}>Status</Badge>);

      expect(screen.getByText("Status")).toHaveAttribute("data-variant", variant);
    }
  );

  test("rounded makes a pill; corners come from the radius scale otherwise", () => {
    render(
      <>
        <Badge>Square</Badge>
        <Badge rounded>Pill</Badge>
      </>
    );

    expect(screen.getByText("Square")).toHaveClass("rounded-md");
    expect(screen.getByText("Pill")).toHaveClass("rounded-full");
    expect(screen.getByText("Pill")).not.toHaveClass("rounded-md");
  });

  test("icons inside follow the badge's icon size", () => {
    render(
      <Badge variant="success">
        <Icon as={Check} data-testid="icon" />
        Done
      </Badge>
    );
    const badge = screen.getByText("Done");

    // Icon reads --icon-size, so this one class sizes every icon in the badge
    expect(badge).toHaveClass("[--icon-size:0.75rem]");
    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  test("asChild styles a link, which keeps its href and role", () => {
    render(
      <Badge asChild variant="outline">
        <a href="https://example.com/tags/design-systems">Design systems</a>
      </Badge>
    );
    const link = screen.getByRole("link", { name: "Design systems" });

    expect(link).toHaveAttribute("href", "https://example.com/tags/design-systems");
    expect(link).toHaveAttribute("data-slot", "badge");
    expect(link).toHaveAttribute("data-variant", "outline");
  });

  test("className overrides conflicting classes", () => {
    render(<Badge className="h-8 px-4">Large</Badge>);
    const badge = screen.getByText("Large");

    expect(badge).toHaveClass("h-8", "px-4");
    expect(badge).not.toHaveClass("h-6");
    expect(badge).not.toHaveClass("px-2.5");
  });
});
