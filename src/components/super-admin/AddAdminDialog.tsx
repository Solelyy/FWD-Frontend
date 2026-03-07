"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/shared/ui/dialog"

import { AddAdminForm } from "@/components/super-admin/AddAdminForm";

type AddAdminDialogProps= {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function AddAdminDialog({ open, setOpen }: AddAdminDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-125">

        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>

        <AddAdminForm setOpen={setOpen} />

      </DialogContent>
    </Dialog>
  )
}