import { requireAuth } from "@/lib/auth";
import { ReactNode } from "react";
import { UserProvider} from "@/context/UserContext"
import {redirect} from "next/navigation"

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    const user = await requireAuth();
    if (user.role !== "SUPER ADMIN") redirect("/unauthorized");

    return(
        <UserProvider user={user}>
            {children}
        </UserProvider>
    );
}