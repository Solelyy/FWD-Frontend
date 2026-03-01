"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis, LogOut } from "lucide-react";

import type { UserRole, Menu as MenuType, Group } from "../sidebar/types";
import { cn } from "@/lib/util/utils";
import { getMenuList, RoleRoutes } from "@/components/sidebar/index";
import { Button } from "@/components/ui/button";
import { CollapseMenuButton } from "@/components/admin-panel/collapse-menu-button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";

interface MenuProps {
  isOpen: boolean | undefined;
  role: UserRole;
}

interface SignOutProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen, role }: MenuProps) {
  const pathname = usePathname();

  // Default active route = role-based dashboard
  const dashboardRoute = RoleRoutes[role] ?? "/";
  const currentPath = pathname || dashboardRoute;

  // Active logic: root = exact, others = startsWith
  const isActive = (item: MenuType) => {
    if (!item) return false;
    if (item.isRoot) return currentPath === item.href;
    return currentPath.startsWith(item.href);
  };

  const menuList: Group[] = getMenuList(role);

  return (
    <nav className="w-full">
      <ul className="mt-1 flex flex-col items-start space-y-0 px-2 pb-2">
        {menuList.map(({ groupLabel, menus }, idx) => (
          <li className={cn("w-full", groupLabel ? "pt-2" : "")} key={idx}>
            {/* Group label */}
            {(isOpen && groupLabel) || isOpen === undefined ? (
              <p className="text-sm font-medium text-muted-foreground px-4 pb-2 max-w-62 truncate">
                {groupLabel}
              </p>
            ) : !isOpen && isOpen !== undefined && groupLabel ? (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger className="w-full">
                    <div className="w-full flex justify-center items-center">
                      <Ellipsis className="h-5 w-5" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{groupLabel}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <p className="pb-2"></p>
            )}

            {/* Menus */}
            {menus.map(({ href, label, icon: Icon, submenus, isRoot }, index) => {
              if (!submenus || submenus.length === 0) {
                // Normal menu item
                return (
                  <div className="w-full" key={index}>
                    <TooltipProvider disableHoverableContent>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Button
                            variant={isActive({ href, label, icon: Icon, submenus, isRoot }) ? "secondary" : "ghost"}
                            className="w-full justify-start h-10 mb-1"
                            asChild
                          >
                            <Link href={href} className="flex items-center w-full">
                              <span className={cn(isOpen === false ? "" : "mr-4")}>
                                <Icon size={18} />
                              </span>
                              <p
                                className={cn(
                                  "max-w-50 truncate",
                                  isOpen === false
                                    ? "-translate-x-96 opacity-0"
                                    : "translate-x-0 opacity-100"
                                )}
                              >
                                {label}
                              </p>
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        {isOpen === false && (
                          <TooltipContent side="right">{label}</TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                );
              } else {
                // Menu with submenus
                return (
                  <div className="w-full" key={index}>
                    <CollapseMenuButton
                      icon={Icon}
                      label={label}
                      active={isActive({ href, label, icon: Icon, submenus, isRoot: false })}
                      submenus={submenus}
                      isOpen={isOpen}
                    />
                  </div>
                );
              }
            })}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SignOutButton({ isOpen }: SignOutProps) {
  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            onClick={() => {}}
            variant="outline"
            className="w-full justify-center h-10"
          >
            <span className={cn(isOpen === false ? "" : "mr-3")}>
              <LogOut size={18} />
            </span>
            <p
              className={cn(
                "whitespace-nowrap",
                isOpen === false ? "opacity-0 hidden" : "opacity-100"
              )}
            >
              Sign out
            </p>
          </Button>
        </TooltipTrigger>
        {isOpen === false && <TooltipContent side="right">Sign out</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}