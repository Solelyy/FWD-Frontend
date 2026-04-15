import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AttendanceType } from "@/features/attendance/types/attendanceType";
import { Camera, MapPin } from "lucide-react";

type ViewDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    attendanceType: AttendanceType | undefined;
    timeInLocation: string | null | undefined;
    timeOutLocation: string | null | undefined;
    timeInImage: string | null | undefined;
    timeOutImage: string | null | undefined;
}
export function ViewDialog({
    open, setOpen, attendanceType, 
    timeInLocation, timeOutLocation, 
    timeInImage ,timeOutImage
}: ViewDialogProps) {
    const isTimeIn = attendanceType === AttendanceType.TIME_IN;
    const formatText = isTimeIn ? "time in" : "time out";
    const attendanceLabel = isTimeIn ? "Time In" : "Time Out";

    const selectedLocation = isTimeIn ? timeInLocation : timeOutLocation;
    const selectedImage = isTimeIn ? timeInImage : timeOutImage;
    const hasRecord = Boolean(selectedLocation || selectedImage);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[92%] max-w-sm md:max-w-lg space-y-4 p-4 md:p-6">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <span>Attendance Info</span>
                        <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {attendanceLabel}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                {!hasRecord && (
                    <div className="rounded-lg border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                        No {formatText} record yet for today.
                    </div>
                )}

                <div className="grid gap-3">
                    <div className="rounded-lg border bg-card p-3 md:p-4">
                        <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                            <MapPin className="h-4 w-4 text-primary" />
                            Captured Location
                        </p>
                        <p className="wrap-break-word text-sm text-muted-foreground">
                            {selectedLocation || "No location data available."}
                        </p>
                    </div>

                    <div className="rounded-lg border bg-card p-3 md:p-4">
                        <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <Camera className="h-4 w-4 text-primary" />
                            Captured Photo
                        </p>

                        {selectedImage ? (
                            <div className="overflow-hidden rounded-md border bg-muted">
                                <img
                                    src={selectedImage}
                                    alt={`${attendanceLabel} snapshot`}
                                    className="h-56 w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-md border border-dashed bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                                No photo captured.
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}