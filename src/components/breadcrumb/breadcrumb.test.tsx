import { render, screen, within } from "@testing-library/react";
import { Slash } from "lucide-react";
import { describe, expect, test } from "vitest";

import { Icon } from "@components/icon";

import { Breadcrumb } from "./breadcrumb";

function renderTrail() {
  return render(
    <Breadcrumb
      items={[
        { label: "Home", href: "/" },
        { label: "Demos", href: "/demo" },
        { label: "Store" }
      ]}
    />
  );
}

describe("Breadcrumb", () => {
  test("is a navigation landmark named Breadcrumb, with an ordered list", () => {
    renderTrail();

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(nav).getAllByRole("listitem")).toHaveLength(3);
  });

  test("links the parent pages", () => {
    renderTrail();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Demos" })).toHaveAttribute("href", "/demo");
  });

  test("marks the last item as the current page, not as a link", () => {
    renderTrail();

    expect(screen.getByText("Store")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Store" })).not.toBeInTheDocument();
  });

  test("separators are not read out", () => {
    renderTrail();

    // Each list item's accessible text is only its label
    const items = screen.getAllByRole("listitem");
    expect(items.map((listItem) => listItem.textContent)).toEqual([
      "Home",
      "Demos",
      "Store"
    ]);
  });

  test("takes a custom separator", () => {
    render(
      <Breadcrumb
        separator={<Icon as={Slash} data-testid="slash" />}
        items={[{ label: "Home", href: "/" }, { label: "Store" }]}
      />
    );

    expect(screen.getByTestId("slash")).toBeInTheDocument();
  });
});
