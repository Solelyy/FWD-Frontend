"use client";

import { Sidebar } from "@/components/layout/panel/sidebar";
import { useUser } from "@/components/providers/UserContext";
import { useSidebar } from "@/lib/hooks/useSidebar";
import { useStore } from "@/lib/hooks/useStore";
import { cn } from "@/lib/util/utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { user } = useUser();
  const router = useRouter();
  const sidebar = useStore(useSidebar, (x) => x);

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user, router])
  
  if (!user || !sidebar) return null;
  const { getOpenState, settings } = sidebar;
  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(100vh)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          !settings.disabled && (!getOpenState() ? "lg:ml-22.5" : "lg:ml-64")
        )}
      >
        {children}
      </main>
    </>
  );
}
