"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/shared/layout/panel/menu";
import LogoutModal from "@/components/shared/features/LogoutModal";

export function SheetSignOut() {
  const [open, setOpen] = useState(false);

  return (
    <>
        {/* Sign Out button triggers modal */}
        <SignOutButton onClick={() => setOpen(true)} isOpen={true} />
        
        {/* Logout confirmation modal */}
        <LogoutModal open={open} onOpenChange={setOpen} />
    </>
  );
}