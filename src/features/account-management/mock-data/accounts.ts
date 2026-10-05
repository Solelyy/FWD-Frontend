import { UserRole } from "@/lib/types/roles";
import { AccountInfo, Status } from "../types/account";

export const mockEmployeeAccounts: AccountInfo[] = [
  {
    employeeId: "EMP-1001",
    firstname: "Mia",
    lastname: "Santos",
    email: "mia.santos@example.com",
    status: Status.ACTIVE,
    invitationDate: "2026-01-15T08:00:00.000Z",
    role: UserRole.EMPLOYEE,
  },
  {
    employeeId: "EMP-1002",
    firstname: "Noah",
    lastname: "Rivera",
    email: "noah.rivera@example.com",
    status: Status.ACTIVE,
    invitationDate: "2026-01-20T08:00:00.000Z",
    role: UserRole.EMPLOYEE,
  },
  {
    employeeId: "EMP-1003",
    firstname: "Ava",
    lastname: "Delos Reyes",
    email: "ava.delosreyes@example.com",
    status: Status.PENDING,
    invitationDate: "2026-02-03T08:00:00.000Z",
    role: UserRole.EMPLOYEE,
  },
  {
    employeeId: "EMP-1004",
    firstname: "Liam",
    lastname: "Cruz",
    email: "liam.cruz@example.com",
    status: Status.INACTIVE,
    invitationDate: "2026-02-10T08:00:00.000Z",
    role: UserRole.EMPLOYEE,
  },
  {
    employeeId: "EMP-1005",
    firstname: "Sophia",
    lastname: "Garcia",
    email: "sophia.garcia@example.com",
    status: Status.SUSPENDED,
    invitationDate: "2026-02-18T08:00:00.000Z",
    role: UserRole.EMPLOYEE,
  },
];

export const mockAdminAccounts: AccountInfo[] = [
  {
    employeeId: "ADM-1001",
    firstname: "Jessa",
    lastname: "Gozun",
    email: "jessa.gozun@example.com",
    status: Status.ACTIVE,
    invitationDate: "2025-11-15T08:00:00.000Z",
    role: UserRole.ADMIN,
  },
  {
    employeeId: "ADM-1002",
    firstname: "Daniel",
    lastname: "Santos",
    email: "daniel.santos@example.com",
    status: Status.ACTIVE,
    invitationDate: "2025-12-01T08:00:00.000Z",
    role: UserRole.ADMIN,
  },
  {
    employeeId: "ADM-1003",
    firstname: "Trisha",
    lastname: "Reyes",
    email: "trisha.reyes@example.com",
    status: Status.PENDING,
    invitationDate: "2026-01-10T08:00:00.000Z",
    role: UserRole.ADMIN,
  },
  {
    employeeId: "ADM-1004",
    firstname: "Marco",
    lastname: "Cruz",
    email: "marco.cruz@example.com",
    status: Status.INACTIVE,
    invitationDate: "2025-10-20T08:00:00.000Z",
    role: UserRole.ADMIN,
  },
];
