import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { Button } from "@components/button";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "./card";

describe("Card", () => {
  test("renders a div at the default size", () => {
    render(<Card>Content</Card>);
    const card = screen.getByText("Content");

    expect(card.tagName).toBe("DIV");
    expect(card).toHaveAttribute("data-slot", "card");
    expect(card).toHaveAttribute("data-size", "md");
  });

  test.each(["sm", "md"] as const)("size=%s is exposed as data-size", (size) => {
    render(<Card size={size}>Content</Card>);

    expect(screen.getByText("Content")).toHaveAttribute("data-size", size);
  });

  test("renders every part, with a working action and footer", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Pro plan</CardTitle>
          <CardDescription>For growing teams</CardDescription>
          <CardAction>
            <Button>Edit</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <ul>
            <li>Unlimited projects</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button>Upgrade</Button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("Pro plan")).toHaveAttribute("data-slot", "card-title");
    expect(screen.getByText("For growing teams")).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveTextContent("Unlimited projects");
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upgrade" })).toBeInTheDocument();
  });

  test("the title stays out of the outline unless it holds a heading", () => {
    render(
      <>
        <Card>
          <CardTitle>Plain title</CardTitle>
        </Card>
        <Card>
          <CardTitle>
            <h3>Heading title</h3>
          </CardTitle>
        </Card>
      </>
    );

    expect(screen.getAllByRole("heading")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Heading title");
  });

  test("asChild styles a list item, which keeps its role", () => {
    render(
      <ul>
        <Card asChild>
          <li>Item</li>
        </Card>
      </ul>
    );

    expect(screen.getByRole("listitem")).toHaveAttribute("data-slot", "card");
    expect(screen.getByRole("listitem")).toHaveClass("rounded-xl");
  });

  test("asChild styles a link, which keeps its href and role", () => {
    render(
      <Card asChild>
        <a href="https://example.com/guide">Read the guide</a>
      </Card>
    );
    const link = screen.getByRole("link", { name: "Read the guide" });

    expect(link).toHaveAttribute("href", "https://example.com/guide");
    expect(link).toHaveAttribute("data-slot", "card");
  });

  test("className overrides conflicting classes on every part", () => {
    render(
      <Card className="rounded-none" data-testid="card">
        <CardHeader className="gap-y-4">Header</CardHeader>
        <CardTitle className="text-h3">Title</CardTitle>
        <CardDescription className="text-base">Description</CardDescription>
        <CardAction className="self-end">Action</CardAction>
        <CardContent className="px-0">Content</CardContent>
        <CardFooter className="gap-6">Footer</CardFooter>
      </Card>
    );

    expect(screen.getByTestId("card")).toHaveClass("rounded-none");
    expect(screen.getByTestId("card")).not.toHaveClass("rounded-xl");
    expect(screen.getByText("Header")).not.toHaveClass("gap-y-1");
    expect(screen.getByText("Title")).not.toHaveClass("text-h6");
    expect(screen.getByText("Description")).not.toHaveClass("text-sm");
    expect(screen.getByText("Action")).not.toHaveClass("self-start");
    expect(screen.getByText("Content")).not.toHaveClass("px-(--card-padding)");
    expect(screen.getByText("Footer")).not.toHaveClass("gap-3");
  });
});
