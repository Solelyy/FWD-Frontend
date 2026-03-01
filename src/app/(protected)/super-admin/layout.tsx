import { requireAuth } from "@/lib/server/auth";
import { ReactNode } from "react";
import { UserProvider} from "@/components/shared/providers/UserContext"
import {redirect} from "next/navigation"

export default async function SuperAdminLayout({children}: {children: ReactNode}){
    const user = await requireAuth();
    if (user.role !== "SUPER_ADMIN") redirect("/unauthorized");

    return(
        <UserProvider user={user}>
            {children}
        </UserProvider>
    );
}