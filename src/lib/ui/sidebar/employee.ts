import {
  LayoutGrid,
  ClipboardCheck,
  FileBarChart,
  User,
  Calendar1,
  PhilippinePeso,
  Wallet
} from "lucide-react";

import { Group } from "./types";

const defaultPath: string = "/employee";

export const EMPLOYEE_SIDEBAR: Group[] = [
  {
    groupLabel: "",
    menus: [
      { href: defaultPath, label: "Dashboard", icon: LayoutGrid, isRoot: true }
    ]
  },
  {
    groupLabel: "Modules",
    menus: [
      { href: `${defaultPath}/attendance`, label: "Attendance", icon: ClipboardCheck },
      { href: `${defaultPath}/leave`, label: "Leave", icon: Calendar1 },
      { href: `${defaultPath}/cash-advance`, label: "Cash Advance", icon: PhilippinePeso },
      { href: `${defaultPath}/reimbursement`, label: "Reimbursement", icon: Wallet },
      { href: `${defaultPath}/reports`, label: "Reports", icon: FileBarChart },
    ]
  },
  {
    groupLabel: "Personal",
    menus: [
      { href: `${defaultPath}/account`, label: "Profile", icon: User }
    ]
  }
];