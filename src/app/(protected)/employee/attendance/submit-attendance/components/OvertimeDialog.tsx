import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type OvertimeDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onConfirmOvertime: () => void;
    onConfirmRegular: () => void;
}

export default function OvertimeDialog({open, setOpen, onConfirmOvertime, onConfirmRegular}: OvertimeDialogProps){
    const handleApplyOvertime = () => {
        onConfirmOvertime();
    }

    const handleRegularShift = () => {
        onConfirmRegular();
    }
    
    return (
    <Dialog open={open} onOpenChange={(val) => setOpen(val)}>
        <DialogContent className="w-[90%] max-w-sm md:max-w-md space-y-4"
            onInteractOutside={(e) => e.preventDefault()}
            onEscapeKeyDown={(e) => e.preventDefault()}
        >
            <DialogHeader>
                <DialogTitle>Overtime</DialogTitle>
            </DialogHeader>

            <DialogDescription>
                You are submitting your time out beyond your shift, would you like to apply it for overtime or just regular shift?
            </DialogDescription>
            
            {/* Action buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <Button variant="secondary" className="w-full flex-1" onClick={handleApplyOvertime}>
                    Apply Overtime
                </Button>
                <Button className="w-full flex-1" onClick={handleRegularShift}>
                    Apply Regular Shift
                </Button>
            </div>
        </DialogContent>
    </Dialog>
    );
}