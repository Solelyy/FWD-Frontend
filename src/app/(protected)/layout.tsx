export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import type { Metadata } from "next";
import { requireAuth } from "@/features/auth/server/auth";
import AdminPanelLayout from "@/components/layout/panel/admin-panel-layout";
import QueryProvider from "@/components/providers/QueryProvider";
import { redirect } from "next/navigation"
import { testRequireAuth } from "@/features/auth/server/testAuth";

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Dashboard'
  },
  description: "This is the dashboard for the user of employee portal.",
  icons: {
    icon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-icon.png',
    shortcut: '/assets/icons/icon.svg'
  }
};

export default async function ProtectedRouteLayout({ children }: { children: ReactNode }) {
  console.log("📍Protected Layout. Calling requireAuth...");

  const user  = await testRequireAuth();

  if (!user) {
    console.log("Redirecting to unauthorized.")
    redirect("/unauthorized"); 
  }

  return (
    <QueryProvider>
        <AdminPanelLayout>
          {children}
        </AdminPanelLayout>
    </QueryProvider>
  );
}