export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import { requireRole } from "@/features/auth/server/auth"
import { UserRole } from "@/lib/types/roles";
import { Toaster } from "sonner";
import { testRequireRole } from "@/features/auth/server/testAuth";

export default async function AdminLayout({children}: {children: ReactNode}){
    console.log("📍Admin layout.tsx. Checking role...")

    await requireRole(UserRole.ADMIN);
    
      return (
        <>
            {children}
            <Toaster richColors position= "top-center" />
        </>   
    );
}