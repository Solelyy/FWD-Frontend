import {
  LayoutGrid,
  Users,
  ClipboardCheck,
  FileBarChart,
  User
} from "lucide-react";

import { Group } from "./types";

export const ADMIN_SIDEBAR: Group[] = [
  {
    groupLabel: "",
    menus: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutGrid, isRoot: true}
    ]
  },
  {
    groupLabel: "Management",
    menus: [
      { href: "/employees", label: "Employee Management", icon: Users }
    ]
  },
  {
    groupLabel: "Attendance",
    menus: [
      { href: "/attendance", label: "All Attendance", icon: ClipboardCheck }
    ]
  },
  {
    groupLabel: "Reports",
    menus: [
      { href: "/reports", label: "All Reports", icon: FileBarChart }
    ]
  },
  {
    groupLabel: "Account",
    menus: [
      { href: "/account", label: "Profile", icon: User }
    ]
  }
];