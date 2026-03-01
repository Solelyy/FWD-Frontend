"use client";

import Link from "next/link";
import { MenuIcon} from "lucide-react";
import { VisuallyHidden } from "@/components/shared/ui/visually-hidden";
import { Button } from "@/components/shared/ui/button";
import { Menu, SignOutButton } from "@/components/shared/layout/panel/menu";
import { useUser } from "@/components/shared/providers/UserContext";
import { ScrollArea } from "@/components/shared/ui/scroll-area";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/shared/ui/sheet";

export function SheetMenu() {
  const user = useUser();
  type Role = "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE";

  const roleRoutes: Record<Role, string> = {
    SUPER_ADMIN: "/super-admin",
    ADMIN: "/admin",
    EMPLOYEE: "/employee",
  };

  const logoLink = roleRoutes[user.role as Role];

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        {/* Logo + Role */}
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Menu</SheetTitle>
          </VisuallyHidden>
          <Link href={logoLink} className="flex w-full rounded-md px-4 py-3 flex-col items-start gap-4 text-left">
            <img src="/assets/logo/fwd-logo.svg" alt="FWD Logo" className="h-12 w-auto"></img>
            <span className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
              {user.role.replace("_", " ")}
            </span>
          </Link> 
        </SheetHeader>

        {/* Menu */}
        <div className="mt-0 flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-2">
            <Menu isOpen role={user.role}/>
          </ScrollArea>
        </div>

        {/* Sign out */}
        <div className="mt-4 pb-2 border-t border-border/50 pt-4 shrink-0">
          <SignOutButton isOpen />
        </div>
      </SheetContent>
</Sheet>
  );
}