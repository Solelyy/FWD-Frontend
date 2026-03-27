export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireAuth, requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";
import { UserProvider } from "@/components/providers/UserContext";
import AdminPanelLayout from "@/components/layout/panel/admin-panel-layout";
import QueryProvider from "@/components/providers/QueryProvider";

export default async function AdminLayout({children}: {children: ReactNode}){
    console.log("📍Admin layout.tsx. Calling requireAuth first.")

    const user = await requireAuth()
    await requireRole(UserRole.ADMIN);
    
      return (
        <QueryProvider>
          <UserProvider initialUser={user}>
            <AdminPanelLayout>
                {children}
                <Toaster richColors position= "top-center" />
            </AdminPanelLayout>
          </UserProvider>
        </QueryProvider>
    );
}