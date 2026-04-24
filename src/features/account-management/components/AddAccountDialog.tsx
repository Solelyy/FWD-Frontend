"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"

import { AddAccountForm } from "./AddAccount";
import { UserRole } from "@/lib/types/roles";

type AddAccountDialogProps= {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    role: UserRole.ADMIN | UserRole.EMPLOYEE
}

export function AddAccountDialog({ open, setOpen, role }: AddAccountDialogProps) {
    const roleLabel = role === UserRole.ADMIN ? "Admin" : "Employee"
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-125">

        <DialogHeader>
          <DialogTitle>Add New {roleLabel}</DialogTitle>
        </DialogHeader>

        <AddAccountForm setOpen={setOpen} role={role} />

      </DialogContent>
    </Dialog>
  )
}