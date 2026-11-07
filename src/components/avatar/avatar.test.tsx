import { render, screen } from "@testing-library/react";
import { User } from "lucide-react";
import { describe, expect, test, vi } from "vitest";

import { Icon } from "@components/icon";

import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

// jsdom never loads images: this one reports the given result as soon as it gets a src
function stubImage(result: "load" | "error") {
  vi.stubGlobal(
    "Image",
    class extends EventTarget {
      complete = false;
      naturalWidth = 0;
      referrerPolicy = "";
      crossOrigin: string | null = null;

      set src(_value: string) {
        queueMicrotask(() => {
          this.complete = result === "load";
          this.naturalWidth = result === "load" ? 40 : 0;
          this.dispatchEvent(new Event(result));
        });
      }
    }
  );
}

function setup() {
  return render(
    <Avatar>
      <AvatarImage src="/maya.png" alt="Maya Okafor" />
      <AvatarFallback>MO</AvatarFallback>
    </Avatar>
  );
}

describe("Avatar", () => {
  test("shows the image once it has loaded, instead of the fallback", async () => {
    stubImage("load");
    setup();

    expect(await screen.findByRole("img", { name: "Maya Okafor" })).toHaveAttribute(
      "src",
      "/maya.png"
    );
    expect(screen.queryByText("MO")).not.toBeInTheDocument();
  });

  test("keeps the fallback when the image fails", async () => {
    stubImage("error");
    setup();

    expect(await screen.findByText("MO")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  test("shows the fallback when there is no image", () => {
    render(
      <Avatar>
        <AvatarFallback>
          <Icon as={User} data-testid="icon" />
        </AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId("icon")).toHaveAttribute("aria-hidden", "true");
  });

  test.each(["sm", "md"] as const)("size=%s is exposed as data-size", (size) => {
    render(
      <Avatar size={size} data-testid="avatar">
        <AvatarFallback>MO</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId("avatar")).toHaveAttribute("data-size", size);
  });

  test("className overrides conflicting classes", () => {
    render(
      <Avatar className="rounded-md" data-testid="avatar">
        <AvatarFallback className="bg-accent">MO</AvatarFallback>
      </Avatar>
    );

    expect(screen.getByTestId("avatar")).toHaveClass("rounded-md");
    expect(screen.getByTestId("avatar")).not.toHaveClass("rounded-full");
    expect(screen.getByText("MO")).toHaveClass("bg-accent");
    expect(screen.getByText("MO")).not.toHaveClass("bg-muted");
  });
});
