"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ellipsis, LogOut } from "lucide-react";

import type { Menu as MenuType, Group } from "@/lib/ui/sidebar/types";
import { cn } from "@/lib/util/utils";
import { getMenuList, RoleRoutes } from "@/lib/ui/sidebar/index";
import { Button } from "@/components/ui/button";
import { CollapseMenuButton } from "@/components/layout/panel/collapse-menu-button";
import type { UserRole } from "@/lib/types/roles";
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
  onClick?: () => void;
  disableTooltip?: boolean; 
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
              const active = isActive({ href, label, icon: Icon, submenus, isRoot });
              if (!submenus || submenus.length === 0) {
                // Normal menu item
                return (
                  <div className="w-full" key={index}>
                    <Button
                      variant="ghost"
                      className={cn("w-full justify-start h-10 mb-1 hover:bg-[#FFEB94]/40",active && "bg-[#FFEB94]/40",
                       )}
                      asChild
                    >
                      <Link href={href} className="flex items-center w-full">
                        {isOpen === false ? (
                          <TooltipProvider disableHoverableContent>
                            <Tooltip delayDuration={100}>
                              <TooltipTrigger asChild>
                                <span className="flex items-center">
                                  <Icon size={18} />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent side="right" sideOffset={0}>{label}</TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ) : (
                          <span className="mr-4">
                            <Icon size={18} />
                          </span>
                        )}
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

export function SignOutButton({ isOpen, onClick, disableTooltip }: SignOutProps) {
  if (disableTooltip) {
    return (
      <Button onClick={onClick} variant="outline" className="w-full justify-center h-10">
        <span className="mr-3">
          <LogOut size={18} />
        </span>
        <p className="whitespace-nowrap opacity-100">Sign out</p>
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="w-full justify-center h-10"
    >
      {isOpen === false ? (
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <span className="flex items-center">
                <LogOut size={18} />
              </span>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={0}>Sign out</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <span className="mr-3">
          <LogOut size={18} />
        </span>
      )}
      <p
        className={cn(
          "whitespace-nowrap",
          isOpen === false ? "opacity-0 hidden" : "opacity-100"
        )}
      >
        Sign out
      </p>
    </Button>
  );
}