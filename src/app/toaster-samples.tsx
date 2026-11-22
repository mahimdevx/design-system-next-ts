"use client";

import { Button } from "@components/button";
import { Stack } from "@components/stack";
import { toast } from "@components/toaster";

// Resolves after a moment, like a slow save
function save() {
  return new Promise<void>((resolve) => setTimeout(resolve, 2000));
}

// Each button sends a toast to the Toaster in the root layout
export function ToasterSamples() {
  return (
    <Stack direction="row" gap="3" align="center" wrap>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast("Event created", { description: "Monday, March 3 at 6:00 PM" })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.success("Profile updated", {
            description: "Your changes have been saved."
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.info("Update available", {
            description: "Restart to install version 2.4."
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.warning("Storage almost full", {
            description: "You have used 90% of 10 GB."
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.error("Upload failed", { description: "The file is larger than 25 MB." })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast("Message archived", {
            action: { label: "Undo", onClick: () => toast("Message restored") }
          })
        }
      >
        With action
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast("Invitation sent", {
            description: "We emailed a link to the new member.",
            closeButton: true
          })
        }
      >
        With close button
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          toast.promise(save(), {
            loading: "Saving draft…",
            success: "Draft saved",
            error: "Could not save the draft"
          })
        }
      >
        Loading
      </Button>
    </Stack>
  );
}
