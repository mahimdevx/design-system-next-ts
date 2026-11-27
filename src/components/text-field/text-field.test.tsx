import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";

import { TextField } from "./text-field";

describe("TextField", () => {
  test("the label names the input and the description describes it", () => {
    render(<TextField label="Email" type="email" description="We never share it." />);

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toHaveAccessibleDescription("We never share it.");
    expect(input).not.toBeInvalid();
  });

  test("an error marks the input invalid and is read after the description", () => {
    render(
      <TextField
        label="Email"
        type="email"
        description="We never share it."
        error="Enter an email address like name@example.com"
      />
    );

    const input = screen.getByRole("textbox", { name: "Email" });
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription(
      "We never share it. Enter an email address like name@example.com"
    );
  });

  test("keeps a given id and aria-describedby, and two fields get different ids", () => {
    render(
      <>
        <p id="rules">At least 12 characters.</p>
        <TextField
          label="Password"
          type="password"
          id="password"
          aria-describedby="rules"
        />
        <TextField label="City" />
        <TextField label="Country" />
      </>
    );

    // Password inputs have no role: query by label
    expect(screen.getByLabelText("Password")).toHaveAttribute("id", "password");
    expect(screen.getByLabelText("Password")).toHaveAccessibleDescription(
      "At least 12 characters."
    );
    expect(screen.getByRole("textbox", { name: "City" }).id).not.toBe(
      screen.getByRole("textbox", { name: "Country" }).id
    );
  });

  test("an error wins over aria-invalid=false; without an error aria-invalid passes through", () => {
    render(
      <>
        <TextField label="Email" aria-invalid="false" error="Enter an email address" />
        <TextField label="Phone" aria-invalid="true" />
      </>
    );

    expect(screen.getByRole("textbox", { name: "Email" })).toBeInvalid();
    expect(screen.getByRole("textbox", { name: "Phone" })).toBeInvalid();
  });

  test("a caller's aria-describedby is read after the description and the error", () => {
    render(
      <>
        <p id="rules">Use 12 or more characters.</p>
        <TextField
          label="Passphrase"
          aria-describedby="rules"
          description="Words work well."
          error="Too short"
        />
      </>
    );

    expect(
      screen.getByRole("textbox", { name: "Passphrase" })
    ).toHaveAccessibleDescription(
      "Words work well. Too short Use 12 or more characters."
    );
  });

  test("passes the other props to the input", () => {
    render(
      <TextField
        label="Name"
        name="name"
        defaultValue="Ada"
        disabled
        className="max-w-xs"
      />
    );

    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toHaveValue("Ada");
    expect(input).toBeDisabled();
    expect(input).toHaveAttribute("name", "name");
  });
});
