import { redirect } from "next/navigation";
import { verifyToken } from "./auth-server";
import { UserRole } from "@/lib/types/roles";
import { AuthUser } from "@/lib/types/auth-user";
import { cache } from "react";

//caches the user data
export const getAuthUserCache = cache(async (): Promise<AuthUser> => {
  try {
    console.log("Im here in getAuthUser. Verifying the token first...");

    const user = await verifyToken();
    return user;  
  } catch (error) {
    console.error("getAuthUser ERROR:", error);
    throw error;
  }
  
});

//this is for react query
export async function getAuthUser(): Promise<AuthUser> {
  try {
    console.log("Im here in getAuthUser. Verifying the token first...");
    const res = await fetch('/api/auth/user');

    if(!res.ok) {
      throw new Error ("Failed to fetch user.");
    }
    return res.json();
  } catch (error) {
    console.error("getAuthUser ERROR:", error);
    throw error;
  }
} 

//guard
export async function requireAuth(): Promise<AuthUser | null> {
  // only need this for ui development (not running the backend)
  
  if (process.env.NODE_ENV === "development") {
    return {
      id: "1",
      role: UserRole.EMPLOYEE,
      employeeId: "FWD123",
      firstname: "Jessa",
      lastname: "Gozun",
      email: "dinavelbinongo@gmail.com",
      isDataPolicyAccepted: true
    };
  } 
  
  try {
    console.log("Im here in requireAuth...");
    return await getAuthUserCache();
  } catch (error) {
    console.error(error);
    return null;
  }
}

//checks for role
export async function requireRole(role: UserRole) {
  const user = await requireAuth();
  console.log("requireRole called. Checking role...")
  if (user?.role !== role) {
    console.log("Unauthorized.")
    redirect("/unauthorized");
  }
  return user;
}
