import type { FormEvent } from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Plus } from "lucide-react";
import { describe, expect, test, vi } from "vitest";

import { Icon } from "@components/icon";

import { Button } from "./button";

describe("Button", () => {
  test("renders a button named by its content", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  });

  test("does not submit a form unless type is submit", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: FormEvent) => event.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button>Cancel</Button>
        <Button type="submit">Send</Button>
      </form>
    );

    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onSubmit).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: "Send" }));
    expect(onSubmit).toHaveBeenCalledOnce();
  });

  test("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Save</Button>);
    await user.click(screen.getByRole("button", { name: "Save" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  test("ignores clicks when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>
    );
    const button = screen.getByRole("button", { name: "Save" });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(onClick).not.toHaveBeenCalled();
  });

  test("an icon-only button is named by aria-label", () => {
    render(
      <Button iconOnly aria-label="Add item">
        <Icon as={Plus} />
      </Button>
    );

    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument();
  });

  test("exposes its variant and size as data attributes, with defaults", () => {
    render(
      <>
        <Button>Default</Button>
        <Button variant="destructive" size="xl">
          Delete
        </Button>
      </>
    );

    expect(screen.getByRole("button", { name: "Default" })).toHaveAttribute(
      "data-variant",
      "primary"
    );
    expect(screen.getByRole("button", { name: "Default" })).toHaveAttribute(
      "data-size",
      "base"
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute(
      "data-variant",
      "destructive"
    );
    expect(screen.getByRole("button", { name: "Delete" })).toHaveAttribute(
      "data-size",
      "xl"
    );
  });

  test("className overrides conflicting variant classes", () => {
    render(<Button className="rounded-none">Square</Button>);
    const button = screen.getByRole("button", { name: "Square" });

    expect(button).toHaveClass("rounded-none");
    expect(button).not.toHaveClass("rounded-md");
  });

  describe("asChild", () => {
    test("renders the child element with the button's styles", () => {
      render(
        <Button asChild variant="soft">
          <a href="/docs">Read the docs</a>
        </Button>
      );
      const link = screen.getByRole("link", { name: "Read the docs" });

      expect(link).toHaveAttribute("href", "/docs");
      expect(link).toHaveAttribute("data-slot", "button");
      expect(link).toHaveAttribute("data-variant", "soft");
      expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    test("does not add a type attribute to the child", () => {
      render(
        <Button asChild>
          <a href="/docs">Read the docs</a>
        </Button>
      );

      expect(screen.getByRole("link", { name: "Read the docs" })).not.toHaveAttribute(
        "type"
      );
    });
  });
});
