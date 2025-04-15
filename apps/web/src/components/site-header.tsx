import { SidebarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { CommandMenu } from "./cmdk";
import { DynamicBreadcrumb } from "./dynamic-breadcrumb";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-background-sidebar sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-[var(--header-height)] w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8 md:hidden"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <SidebarIcon className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4 md:hidden" />
        <div className="hidden sm:block">
          <DynamicBreadcrumb />
        </div>
        <div className="ml-auto flex items-center gap-2">
          <CommandMenu />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
