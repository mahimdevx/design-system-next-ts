import { render, screen } from "@testing-library/react";
import { Check } from "lucide-react";
import { describe, expect, test } from "vitest";

import { LogoMark } from "@assets/icons/logo-mark";

import { Icon } from "./icon";

describe("Icon", () => {
  test("is decorative by default: hidden from assistive technology", () => {
    render(<Icon as={Check} data-testid="icon" />);
    const icon = screen.getByTestId("icon");

    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).not.toHaveAttribute("role");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("aria-label makes it a meaningful image", () => {
    render(<Icon as={Check} aria-label="Completed" />);
    const icon = screen.getByRole("img", { name: "Completed" });

    expect(icon).not.toHaveAttribute("aria-hidden");
  });

  test("aria-labelledby makes it a meaningful image", () => {
    render(
      <>
        <span id="status">Completed</span>
        <Icon as={Check} aria-labelledby="status" />
      </>
    );

    expect(screen.getByRole("img", { name: "Completed" })).toBeInTheDocument();
  });

  test("renders custom icons the same way", () => {
    render(<Icon as={LogoMark} aria-label="Design System" />);

    expect(screen.getByRole("img", { name: "Design System" })).toHaveAttribute(
      "data-slot",
      "icon"
    );
  });

  test("an explicit size wins over the container's --icon-size", () => {
    render(
      <>
        <Icon as={Check} data-testid="inherited" />
        <Icon as={Check} size="lg" data-testid="large" />
      </>
    );

    expect(screen.getByTestId("inherited")).toHaveClass("size-[var(--icon-size,1rem)]");
    expect(screen.getByTestId("inherited")).not.toHaveAttribute("data-size");
    expect(screen.getByTestId("large")).toHaveClass("size-6");
    expect(screen.getByTestId("large")).not.toHaveClass("size-[var(--icon-size,1rem)]");
    expect(screen.getByTestId("large")).toHaveAttribute("data-size", "lg");
  });
});
