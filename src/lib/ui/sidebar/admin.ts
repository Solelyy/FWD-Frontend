import {
  LayoutGrid,
  Users,
  ClipboardCheck,
  FileBarChart,
  User,
  Calendar1,
  PhilippinePeso,
  Wallet,
  ChartNoAxesCombined,
} from "lucide-react";

const defaultPath: string = "/admin";

import { Group } from "./types";

export const ADMIN_SIDEBAR: Group[] = [
  {
    groupLabel: "",
    menus: [
      { href: defaultPath, label: "Dashboard", icon: LayoutGrid, isRoot: true },
    ],
  },
  {
    groupLabel: "Modules",
    menus: [
      {
        href: `${defaultPath}/attendance`,
        label: "Attendance",
        icon: ClipboardCheck,
      },
      { href: `${defaultPath}/employees`, label: "Employees", icon: Users },
      { href: `${defaultPath}/leave`, label: "Leave", icon: Calendar1 },
      {
        href: `${defaultPath}/cash-advance`,
        label: "Cash Advance",
        icon: PhilippinePeso,
      },
      {
        href: `${defaultPath}/reimbursement`,
        label: "Reimbursement",
        icon: Wallet,
      },
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
