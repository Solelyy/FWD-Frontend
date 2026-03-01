import {
  LayoutGrid,
  ClipboardCheck,
  FileBarChart,
  User
} from "lucide-react";

import { Group } from "./types";

export const EMPLOYEE_SIDEBAR: Group[] = [
  {
    groupLabel: "",
    menus: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, isRoot: true }
    ]
  },
  {
    groupLabel: "Attendance",
    menus: [
      { href: "/my-attendance", label: "My Attendance", icon: ClipboardCheck }
    ]
  },
  {
    groupLabel: "Reports",
    menus: [
      { href: "/my-reports", label: "My Reports", icon: FileBarChart }
    ]
  },
  {
    groupLabel: "Account",
    menus: [
      { href: "/account", label: "Profile", icon: User }
    ]
  }
];