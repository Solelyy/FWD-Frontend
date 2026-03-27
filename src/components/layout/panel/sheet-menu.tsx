"use client";

import Link from "next/link";
import { MenuIcon} from "lucide-react";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/layout/panel/menu";
import { useUser } from "@/components/providers/UserContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";
import { RoleRoutes } from "@/lib/ui/sidebar/index";
import { SheetSignOut } from "@/components/shared/SheetSignout";

export function SheetMenu() {
  const { user } = useUser();
  if (!user) return null;

  const logoLink = user ? RoleRoutes[user.role] : "/";

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-60 sm:w-68 px-3 h-full flex flex-col" side="left">
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
          <SheetSignOut />
        </div>
      </SheetContent>
</Sheet>
  );
}