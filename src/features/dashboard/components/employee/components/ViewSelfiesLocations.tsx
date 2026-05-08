import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AttendanceStatus, AttendanceType } from "@/app/(protected)/employee/attendance/submit-attendance/types/attendanceType";
import { Camera, MapPin } from "lucide-react";

type ViewSelfiesLocationsDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    timeInLocation: string | null | undefined;
    timeOutLocation: string | null | undefined;
    timeInImage?: string | null | undefined;
    timeOutImage?: string | null | undefined;
    status?: AttendanceStatus
}
export function ViewSelfiesLocationsDialog({
    open, setOpen,
    timeInLocation, timeOutLocation, 
    timeInImage ,timeOutImage, status
}: ViewSelfiesLocationsDialogProps) {
    const hasTimein = Boolean (timeInLocation || timeInImage);
    const hasTimeOut = Boolean (timeOutLocation || timeOutImage);

    return (
        <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[92%] max-w-sm md:max-w-lg space-y-4 p-4 md:p-6 max-h-[70%] overflow-auto">
                <DialogHeader>
                    <DialogTitle>
                        Attendance Location Details
                    </DialogTitle>
                </DialogHeader>

                {/* Time In */}
                <div className="flex flex-col space-y-6">
                    {/*
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-base font-semibold text-primary">
                        Time In
                    </span>
                    */}
                    
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        Time In Location
                    </p>

                    {!hasTimein ? (
                    <div className="rounded-lg border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                        No time in record yet.
                    </div>
                ) :
                <div className="grid gap-3">
                    <div className="rounded-lg border bg-card p-3 md:p-4">
                        <p className="wrap-break-word text-sm text-muted-foreground">
                            {timeInLocation || "No location data available."}
                        </p>
                    </div>

                    {/*
                    <div className="rounded-lg border bg-card p-3 md:p-4">
                        <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <Camera className="h-4 w-4 text-primary" />
                            Captured Photo
                        </p>

                        {timeInImage ? (
                            <div className="overflow-hidden rounded-md border bg-muted">
                                <img
                                    src={timeInImage}
                                    alt="Time in snapshot"
                                    className="h-56 w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-md border border-dashed bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                                No photo captured.
                            </div>
                        )}
                    </div>
                    */}
                    
                </div>
                }

                {/* Time Out */}

                <div className="flex flex-col space-y-6">
                    {/*
                    <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-base font-semibold text-primary">
                        Time Out
                    </span>
                    */}

                    <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        Time Out Location
                    </p>

                    {!hasTimeOut ? (
                    <div className="rounded-lg border border-dashed bg-muted/40 p-6 text-center text-sm text-muted-foreground">
                        No time out record yet.
                    </div>
                ) :
                <div className="grid gap-3">
                    <div className="rounded-lg border bg-card p-3 md:p-4">
                        <p className="wrap-break-word text-sm text-muted-foreground">
                            {timeOutLocation || "No location data available."}
                        </p>
                    </div>

                    {/*
                    <div className="rounded-lg border bg-card p-3 md:p-4">
                        <p className="mb-3 flex items-center gap-2 text-sm font-medium">
                            <Camera className="h-4 w-4 text-primary" />
                            Captured Photo
                        </p>

                        {timeOutImage ? (
                            <div className="overflow-hidden rounded-md border bg-muted">
                                <img
                                    src={timeOutImage}
                                    alt="Time out snapshot"
                                    className="h-56 w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="rounded-md border border-dashed bg-muted/50 p-8 text-center text-sm text-muted-foreground">
                                No photo captured.
                            </div>
                        )}
                    </div>
                    */}
                </div>
                }
                </div>
                </div>

            </DialogContent>
        </Dialog>
        </>
    )
}