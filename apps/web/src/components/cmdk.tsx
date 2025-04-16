// src/components/cmdk.tsx (or your path)

import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router"; // Import useNavigate for navigation
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"; // Adjust import path
import {
  LayoutDashboard,
  List,
  BarChart,
  BookOpen,
  User,
  Archive,
  FileText,
  Wand2,
  Settings,
  HelpCircle,
  Search,
} from "lucide-react";

// Define your searchable items/routes
const mainNavItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/lifecycle", label: "Lifecycle", icon: List },
  { href: "/analytics", label: "Analytics", icon: BarChart },
  { href: "/projects", label: "Projects", icon: BookOpen },
  { href: "/team", label: "Team", icon: User },
];
const documentsNavItems = [
  { href: "/data-library", label: "Data Library", icon: Archive },
  { href: "/reports", label: "Reports", icon: FileText },
  { href: "/word-assistant", label: "Word Assistant", icon: Wand2 },
];
const secondaryNavItems = [
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/help", label: "Get Help", icon: HelpCircle },
];

// Combine all navigable items
const searchablePages = [
  ...mainNavItems,
  ...documentsNavItems,
  ...secondaryNavItems,
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Hook from TanStack Router

  // Keyboard shortcut to open (Cmd+K or Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }
        e.preventDefault();
        setOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Function to run when an item is selected
  const runCommand = (command: () => unknown) => {
    setOpen(false); // Close the dialog
    command(); // Execute the command (e.g., navigation)
  };

  return (
    <>
      <Button
        variant="outline"
        className="h-8 w-8 p-0 sm:h-8 sm:w-auto sm:px-3 sm:py-1 sm:text-xs sm:font-normal"
        onClick={() => setOpen(true)}
        aria-label="Open command menu / search"
      >
        <Search className="h-4 w-4 sm:mr-1" />
        <span className="hidden sm:inline-block">Search...</span>
        <kbd className="pointer-events-none ml-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* The Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {searchablePages.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  runCommand(() => navigate({ to: item.href }));
                }}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Testing">
            {searchablePages.map((item) => (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => {
                  runCommand(() => navigate({ to: item.href }));
                }}
                className="cursor-pointer"
              >
                <item.icon className="mr-2 h-4 w-4" />
                <span>{item.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
