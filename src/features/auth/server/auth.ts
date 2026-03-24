import { redirect } from "next/navigation";
import { verifyToken } from "./auth-server";
import { UserRole } from "@/lib/types/roles";
import { AuthUser } from "@/lib/types/auth-user";
import { cache } from "react";

//caches the user data
export const getAuthUser = cache(async (): Promise<AuthUser> => {
  const user = await verifyToken();
  return user;
});

//guard
export async function requireAuth(): Promise<AuthUser> {
  /* only need this for ui development (not running the backend)
  if (process.env.NODE_ENV === "development") {
    return {
      id: "1",
      role: UserRole.SUPER_ADMIN,
      employeeId: "FWD123",
      firstname: "Jessa",
      lastname: "Gozun",
      email: "dinavelbinongo@gmail.com",
    };
  }*/
  
  try {
    return await getAuthUser();
  } catch (error) {
    console.error(error);
    redirect("/unauthorized");
  }
}

//checks for role
export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  if (user.role !== role) {
    redirect("/unauthorized");
  }
  return user;
}
