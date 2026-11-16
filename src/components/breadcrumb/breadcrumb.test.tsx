import { render, screen, within } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage
} from "./breadcrumb";

function renderTrail() {
  return render(
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink href="/demo">Demos</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbPage>Store</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

describe("Breadcrumb", () => {
  test("is a navigation landmark named Breadcrumb, with the pages as list items", () => {
    renderTrail();

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    // One list item per page; separators are CSS, so nothing else is in the tree
    expect(within(nav).getAllByRole("listitem")).toHaveLength(3);
  });

  test("links the parent pages", () => {
    renderTrail();

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Demos" })).toHaveAttribute("href", "/demo");
  });

  test("marks the current page, and it is not a link", () => {
    renderTrail();

    expect(screen.getByText("Store")).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Store" })).not.toBeInTheDocument();
  });

  test("the separator is CSS only: no text between the pages", () => {
    renderTrail();

    expect(screen.getByRole("navigation")).toHaveTextContent(/^HomeDemosStore$/);
  });

  test("the ellipsis is announced as More", () => {
    render(
      <ol>
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
      </ol>
    );

    expect(screen.getByRole("listitem")).toHaveTextContent("More");
  });
});
