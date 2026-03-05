"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/shared/layout/panel/menu"; // import your button
import LogoutModal from "@/components/shared/features/LogoutModal";

export function SidebarSignOut({ isExpanded }: { isExpanded: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SignOutButton isOpen={isExpanded} onClick={() => setOpen(true)} />
      <LogoutModal open={open} onOpenChange={setOpen} />
    </>
  );
}