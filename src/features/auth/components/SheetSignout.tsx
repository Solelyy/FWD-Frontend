"use client";

import { useState } from "react";
import { SignOutButton } from "@/components/layout/panel/menu";
import LogoutModal from "./LogoutModal";

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