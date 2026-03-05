"use client";

import { useLogout } from "@/lib/api/authApi.ts/logout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/shared/ui/dialog";
import { Button } from "@/components/shared/ui/button";

type LogoutModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function LogoutModal({ open, onOpenChange }: LogoutModalProps) {
  const logout = useLogout();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full px-4 sm:px-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg 
                   fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
      >
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-center md:text-left text-muted-foreground mt-2">
          Are you sure you want to logout?
        </p>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={logout}>Yes, Logout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}