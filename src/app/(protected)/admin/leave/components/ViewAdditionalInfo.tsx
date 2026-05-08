import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    reason?: string;
    attachment?: string;
    isWithAttachment?: boolean
}

export default function ViewAdditionalInfo({open, setOpen, reason, attachment, isWithAttachment}: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm md:max-w-lg space-y-2 p-4 md:p-6">
                <DialogHeader>
                    <DialogTitle>Additional Information</DialogTitle>
                </DialogHeader>

                <div className="border min-h-40 max-h-70 rounded-md text-base overflow-auto text-justify p-2">
                    <DialogDescription className="mb-2">Reason of the request: </DialogDescription>

                    {!reason && (
                        <span className="text-muted-foreground">No reason provided</span>
                    )}

                    {reason}
                </div>

                {isWithAttachment && (
                    <div className="border min-h-20 max-h-70 rounded-md text-base overflow-auto text-justify p-2">
                        <DialogDescription className="mb-2">Attachment: </DialogDescription>

                        {attachment ? (
                            <a
                                href={attachment}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Attachment
                            </a>
                        ) : (
                            <span className="text-muted-foreground">
                                No attachment provided
                            </span>
                        )}
                    </div>
                )}
                
            </DialogContent>
        </Dialog>
    )
}