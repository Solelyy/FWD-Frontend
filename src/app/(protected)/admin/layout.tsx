export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { UserProvider} from "@/components/providers/UserContext"
import { UserRole } from "@/lib/types/roles";
import { requireRole } from "@/features/auth/server/auth";
import { Toaster } from "sonner"

export default async function AdminLayout({children}: {children: ReactNode}){
   const  user = await requireRole(UserRole.ADMIN);

    return(
        <UserProvider initialUser={user}>
            {children}
            <Toaster richColors position="top-center"/>
        </UserProvider>
    );
}