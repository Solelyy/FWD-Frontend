import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { AccountInfo } from "@/features/account-management/types/account";
import { acceptDataPolicyApi } from "../api/acceptDataPolicyApi";
import { toast } from "sonner";

type DataPolicyDialogProp = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    employeeId: AccountInfo["employeeId"] | undefined;
}

export default function DataPolicyDialog({open, setOpen, employeeId}: DataPolicyDialogProp) {
    const [agreed, setAgreed] = useState(false);

    const handleAccept = async () => {
        try {
            await acceptDataPolicyApi(employeeId);
            setOpen(false);
        } catch(error) {
            console.log("Error", error)
            toast.error("Something went wrong. Please try again.")
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent 
                className="w-[80%] max-w-xl md:max-w-lg [&>button]:hidden"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader className="flex flex-col items-start justify-start gap-4">
                    <div className="flex flex-col gap-2">
                        <DialogTitle className="text-xl font-bold">Data Privacy Policy</DialogTitle>
                    </div>
                    
                    <DialogDescription className="text-justify text-md leading-relaxed text-gray-700 dark:text-gray-300 pt-2">
                        Your personal data is collected and processed in accordance with the <span className="font-semibold">Data Privacy Act of 2012 (RA 10173)</span>. By using this system, you consent to the secure storage and lawful processing of your information for operational and transaction purposes.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-3 bg-blue-50 dark:bg-blue-950 rounded p-4 my-4">
                    <Checkbox 
                        id="agree-policy"
                        checked={agreed}
                        onCheckedChange={(checked: any) => setAgreed(checked as boolean)}
                        className="h-5 w-5"
                    />
                    <label 
                        htmlFor="agree-policy" 
                        className="text-sm font-medium cursor-pointer leading-relaxed flex-1"
                    >
                        I acknowledge and accept the Data Privacy Policy
                    </label>
                </div>

                <div className="flex gap-3 pt-2">
                    <Button 
                        onClick={handleAccept}
                        disabled={!agreed}
                        className="flex-1"
                    >
                        Accept
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}