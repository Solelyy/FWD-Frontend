import {
  LayoutGrid,
  Users,
  FileBarChart,
  User,
  ChartNoAxesCombined,
} from "lucide-react";

import { Group } from "./types";

const defaultPath: string = "/super-admin";

export const SUPER_ADMIN_SIDEBAR: Group[] = [
  {
    groupLabel: "",
    menus: [
      { href: defaultPath, label: "Dashboard", icon: LayoutGrid, isRoot: true },
    ],
  },
  {
    groupLabel: "Management",
    menus: [
      { href: `${defaultPath}/admin-management`, label: "Admin", icon: Users },
      {
        href: `${defaultPath}/employee-management`,
        label: "Employees",
        icon: Users,
      },
    ],
  },
  {
    groupLabel: "Reports",
    menus: [
      {
        href: `${defaultPath}/reports`,
        label: "All Reports",
        icon: FileBarChart,
      },
      {
        href: `${defaultPath}/trend-analysis`,
        label: "Trend Analysis",
        icon: ChartNoAxesCombined,
      },
    ],
  },
  {
    groupLabel: "Personal",
    menus: [{ href: `${defaultPath}/account`, label: "Account", icon: User }],
  },
];
