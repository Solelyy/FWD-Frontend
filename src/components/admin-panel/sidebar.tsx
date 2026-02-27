"use client";

import { Menu, SignOutButton } from "@/components/admin-panel/menu";
import { SidebarToggle } from "@/components/admin-panel/sidebar-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useSidebar } from "@/hooks/use-sidebar";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/util/utils";
import { useUser } from "@/context/UserContext";

export function Sidebar() {
  const user = useUser();
  const sidebar = useStore(useSidebar, (x) => x);
  if (!sidebar) return null;
  const { isOpen, toggleOpen, getOpenState, setIsHover, settings } = sidebar;
  const isExpanded = getOpenState();

  
  type Role = "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE";

  const roleRoutes: Record<Role, string> = {
    SUPER_ADMIN: "/super-admin",
    ADMIN: "/admin",
    EMPLOYEE: "/employee",
  };

  const logoLink = roleRoutes[user.role as Role];

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
        !isExpanded ? "w-22.5" : "w-64",
        settings.disabled && "hidden"
      )}
    >
      {/* Sidebar Toggle */}
      <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} />

      {/* Sidebar Content */}
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800"
      >
        {/* Logo + Role */}
        <Link
          href={logoLink}
          className={cn(
            "flex w-full rounded-md px-4 py-3 transition-all duration-300",
            isExpanded ? "flex-col items-start gap-4 text-left" : "items-center justify-center"
          )}
        >
          <img
            src="/assets/logo/fwd-logo.svg"
            alt="FWD Logo"
            className={cn(
              "w-auto transition-all duration-300",
              isExpanded ? "h-12" : "h-10"
            )}
          />
          {/* Role Label */}
          {isExpanded && (
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {user.role.replace("_", " ")}
            </span>
          )}
        </Link>

        {/* Menu */}
        <div className="mt-2 flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <Menu isOpen={isExpanded} />
          </ScrollArea>
        </div>

        {/* Sign out */}
        <div className="mt-4 border-t border-border/50 pt-4 shrink-0">
          <SignOutButton isOpen={isExpanded} />
        </div>
      </div>
    </aside>
  );
}