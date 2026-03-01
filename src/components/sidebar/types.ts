import { LucideIcon } from "lucide-react";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "EMPLOYEE";

export type Submenu = {
  href: string;
  label: string;
};

export type Menu = {
  href: string;
  label: string;
  icon: LucideIcon;
  submenus?: Submenu[];
  isRoot?: boolean
};

export type Group = {
  groupLabel: string;
  menus: Menu[];
};