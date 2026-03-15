"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/layout/panel/menu";
import LogoutModal from "./LogoutModal";

export function SidebarSignOut({ isExpanded }: { isExpanded: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <SignOutButton isOpen={isExpanded} onClick={() => setOpen(true)} />
      <LogoutModal open={open} onOpenChange={setOpen} />
    </>
  );
}