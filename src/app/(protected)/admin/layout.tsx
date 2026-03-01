import { requireAuth } from "@/lib/server/auth";
import { ReactNode } from "react";
import { UserProvider} from "@/components/shared/providers/UserContext"
import {redirect} from "next/navigation"

export default async function AdminLayout({children}: {children: ReactNode}){
    const user = await requireAuth();
    if (user.role !== "ADMIN") redirect("/unauthorized");

    return(
        <UserProvider user={user}>
            {children}
        </UserProvider>
    );
}