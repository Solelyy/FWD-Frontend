import { UserRole, Group } from "./types";
import { SUPER_ADMIN_SIDEBAR } from "./super-admin";
import { ADMIN_SIDEBAR } from "./admin";
import { EMPLOYEE_SIDEBAR } from "./employee";

export const RoleRoutes: Record <UserRole, string> = {
    SUPER_ADMIN: "/super-admin",
    ADMIN: "/admin",
    EMPLOYEE: "/employee",
};

export function getMenuList(role: UserRole): Group[] {
  switch (role) {
    case "SUPER_ADMIN":
      return SUPER_ADMIN_SIDEBAR;
    case "ADMIN":
      return ADMIN_SIDEBAR;
    case "EMPLOYEE":
      return EMPLOYEE_SIDEBAR;
    default:
      return [];
  }
}