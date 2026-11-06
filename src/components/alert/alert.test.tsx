import { render, screen } from "@testing-library/react";
import { Info } from "lucide-react";
import { describe, expect, test } from "vitest";

import { Button } from "@components/button";
import { Icon } from "@components/icon";

import { Alert, AlertAction, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  test("is a static message by default, so nothing is announced", () => {
    render(<Alert>Saved</Alert>);

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText("Saved")).toHaveAttribute("data-variant", "primary");
  });

  test.each(["alert", "status"] as const)("role=%s makes it a live region", (role) => {
    render(<Alert role={role}>Saved</Alert>);

    expect(screen.getByRole(role)).toHaveTextContent("Saved");
  });

  test.each(["success", "warning", "destructive", "outline"] as const)(
    "variant=%s is exposed as data-variant",
    (variant) => {
      render(<Alert variant={variant}>Message</Alert>);

      expect(screen.getByText("Message")).toHaveAttribute("data-variant", variant);
    }
  );

  test("the title stays out of the outline unless it is asked to be a heading", () => {
    render(
      <>
        <Alert>
          <AlertTitle>Plain title</AlertTitle>
        </Alert>
        <Alert>
          <AlertTitle as="h3">Heading title</AlertTitle>
        </Alert>
      </>
    );

    expect(screen.getByText("Plain title").tagName).toBe("P");
    expect(screen.getAllByRole("heading")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("Heading title");
  });

  test("renders an icon, description with any content, and a working action", () => {
    render(
      <Alert variant="warning">
        <Icon as={Info} data-testid="icon" />
        <AlertTitle>Storage almost full</AlertTitle>
        <AlertDescription>
          See <a href="https://example.com/plans">your plan</a>
        </AlertDescription>
        <AlertAction>
          <Button>Upgrade</Button>
        </AlertAction>
      </Alert>
    );

    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: "your plan" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Upgrade" })).toBeInTheDocument();
  });

  test("className overrides conflicting classes on every part", () => {
    render(
      <Alert className="p-8" data-testid="alert">
        <AlertTitle className="text-lg">Title</AlertTitle>
        <AlertDescription className="text-base">Description</AlertDescription>
        <AlertAction className="mt-6">Action</AlertAction>
      </Alert>
    );

    expect(screen.getByTestId("alert")).toHaveClass("p-8");
    expect(screen.getByTestId("alert")).not.toHaveClass("p-4");
    expect(screen.getByText("Title")).not.toHaveClass("text-base");
    expect(screen.getByText("Description")).not.toHaveClass("text-sm");
    expect(screen.getByText("Action")).not.toHaveClass("mt-3");
  });
});
