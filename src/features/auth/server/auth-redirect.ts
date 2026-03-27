"use server";

import { AuthUser } from "@/lib/types/auth-user";
import { UserRole } from "@/lib/types/roles";
import { redirect } from "next/navigation";

export async function authRedirect( user  : AuthUser){
  console.log("📍 authRedirect. User role: ", user.role)

    switch (user.role) {
      case UserRole.ADMIN:
        redirect("/admin");
            
      case UserRole.SUPER_ADMIN:
        redirect("/super-admin");
            
      case UserRole.EMPLOYEE:
        redirect("/employee");

      default:
        console.warn("Unknown user role.");
        throw new Error(`Unknown user role: ${user.role}`);
  }
}