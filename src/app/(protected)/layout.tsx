export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/features/auth/server/auth";
import { UserProvider } from "@/components/providers/UserContext";
import AdminPanelLayout from "@/components/layout/panel/admin-panel-layout";
import QueryProvider from "@/components/providers/QueryProvider";
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Dashboard",
  icons: {
    icon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-icon.png',
    shortcut: '/assets/icons/icon.svg'
  }
};

export default async function ProtectedRouteLayout({ children }: { children: ReactNode }) {
  console.log("📍Protected Layout. Calling requireAuth...");
  const user  = await requireAuth();

  if (!user) {
    console.log("Redirecting to unauthorized.")
    redirect("/unauthorized"); 
  }

  return (
    <QueryProvider>
      <UserProvider initialUser={user ?? null}>
        <AdminPanelLayout>
          {children}
        </AdminPanelLayout>
      </UserProvider>
    </QueryProvider>
  );
}