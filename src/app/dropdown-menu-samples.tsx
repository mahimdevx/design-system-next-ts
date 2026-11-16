"use client";

import { useState } from "react";

import {
  ChevronDown,
  Copy,
  EllipsisVertical,
  LogOut,
  Mail,
  MessageSquare,
  Pencil,
  Settings,
  Trash2,
  User,
  UserPlus
} from "lucide-react";

import { Button } from "@components/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@components/dropdown-menu";
import { Icon } from "@components/icon";
import { Stack } from "@components/stack";

// Actions with icons, shortcuts, a submenu, a disabled and a destructive item
function AccountMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Account
          <Icon as={ChevronDown} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon as={User} />
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon as={Settings} />
            Settings
            <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Icon as={UserPlus} />
            Invite people
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>
              <Icon as={Mail} />
              Email
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon as={MessageSquare} />
              Message
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem disabled>API keys (soon)</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon as={LogOut} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// On/off options and one choice out of several; the menu stays open while choosing
function ViewMenu() {
  const [toolbar, setToolbar] = useState(true);
  const [statusBar, setStatusBar] = useState(false);
  const [density, setDensity] = useState("comfortable");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          View
          <Icon as={ChevronDown} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-52">
        <DropdownMenuLabel inset>Show</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={toolbar}
          onCheckedChange={setToolbar}
          onSelect={(event) => event.preventDefault()}
        >
          Toolbar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={statusBar}
          onCheckedChange={setStatusBar}
          onSelect={(event) => event.preventDefault()}
        >
          Status bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel inset>Density</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
          {["compact", "comfortable", "spacious"].map((value) => (
            <DropdownMenuRadioItem key={value} value={value} className="capitalize">
              {value}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// An icon-only trigger, aligned to its end edge
function RowActions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="muted" size="sm" iconOnly aria-label="More actions">
          <Icon as={EllipsisVertical} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Icon as={Pencil} />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon as={Copy} />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Icon as={Trash2} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DropdownMenuSamples() {
  return (
    <Stack direction="row" gap="3" align="center" wrap>
      <AccountMenu />
      <ViewMenu />
      <RowActions />
    </Stack>
  );
}
