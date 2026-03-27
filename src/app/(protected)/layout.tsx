export const dynamic = "force-dynamic";

import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  icons: {
    icon: '/assets/icons/favicon.ico',
    apple: '/assets/icons/apple-icon.png',
    shortcut: '/assets/icons/icon.svg'
  }
};

export default async function ProtectedRouteLayout({ children }: { children: ReactNode }) {
  console.log("📍Protected Layout");
  return (
    <>
    {children}
    </>
  );
}