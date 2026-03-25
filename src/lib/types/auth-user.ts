import { UserRole } from "@/lib/types/roles";

export type AuthUser = {
  id: string;
  role: UserRole;
  employeeId: string;
  firstname: string;
  lastname: string;
  email: string;
  isDataPolicyAccepted: boolean;
};

export type LoginCredentials = {
  employeeId: string,
  password: string
}