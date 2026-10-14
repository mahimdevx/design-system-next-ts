import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";

import ErrorPage from "./error";

describe("ErrorPage", () => {
  test("shows a page-level heading and a way to recover", async () => {
    const user = userEvent.setup();
    const retry = vi.fn();
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ErrorPage error={new Error("Boom")} retry={retry} />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Something went wrong" })
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));
    expect(retry).toHaveBeenCalledOnce();
  });

  test("reports the error", () => {
    const error = new Error("Boom");
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    render(<ErrorPage error={error} retry={vi.fn()} />);

    expect(consoleError).toHaveBeenCalledExactlyOnceWith(error);
  });
});
