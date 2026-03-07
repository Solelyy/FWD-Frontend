export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE"
}
export type AuthUser = {
  id: string;
  role: UserRole;
  employeeId: string;
  firstname: string;
  lastname: string;
  email: string;
};

export type LoginCredentials = {
  employeeId: string,
  password: string
}