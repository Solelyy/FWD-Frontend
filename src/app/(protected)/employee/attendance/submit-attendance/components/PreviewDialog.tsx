"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AttendanceType } from "../types/attendanceType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CaptureDialog from "./CaptureDialog";
import { stopStream } from "../utils/stream";
import { toast } from "sonner";
import OvertimeDialog from "./OvertimeDialog";
import { useAttendanceMutation } from "@/app/(protected)/employee/attendance/get-attendance/hooks/useAttendanceMutate";
import { isOvertimeApi } from "../api/isOvertimeApi";

type PreviewDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  location: string | null;
  photo: string | null;
  attendanceType?: AttendanceType;
  stream: MediaStream;
  onRetry: () => void
};

export default function PreviewDialog({ open, setOpen, location, photo, stream, attendanceType, onRetry
}: PreviewDialogProps) {
  const formatText = attendanceType === AttendanceType.TIME_IN ? "time in" : "time out";
  const successText = attendanceType === AttendanceType.TIME_IN ? "Time in" : "Time out";
  const [openCaptureDialog, setOpenCaptureDialog] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(photo);
  const [showOvertimeDialog, setShowOvertimeDialog] = useState(false);
  const today = new Date();

  const month = today.getMonth();
  const year = today.getFullYear();
  const day = today.getDate();

  const attendanceMutation = useAttendanceMutation(month, year,day);
  const handlePhotoCapture = (photoUrl: string) => {
    setCapturedPhoto(photoUrl);
  };

  
  const submitAttendance = async (isOt: boolean) => {

    try {
      await attendanceMutation.mutateAsync({
        location, imageUrl: capturedPhoto, attendanceType, isOvertime: isOt
      });
      toast.success(`${successText} successfully submitted.`);
      setOpen(false);
      stopStream(stream);
    } catch (error) {
      console.log(error);
      toast.error(`Unable to submit ${formatText}`);
    } 
  }
  
  const handleSubmit = async () => {
    if (!location || !capturedPhoto || !attendanceType) return;

    if (attendanceType === AttendanceType.TIME_OUT) {
      const isOt = await checkIsOvertime();

      if (isOt) return;
    }

    await submitAttendance(false);
  };

  async function checkIsOvertime() {
    try{
      const result = await isOvertimeApi();

      if (result.isOvertime) {
        setShowOvertimeDialog(true);
        return true;
      } else {
        setShowOvertimeDialog(false);
        return false;
      }
    } catch(error) {
        console.error(error);
        toast.error("Unable to check if meets overtime threshold.");
        return false;
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => { 
        if (!val) stopStream(stream);
        setOpen(val);
        }}>
        <DialogContent className="w-[90%] max-w-sm md:max-w-md space-y-4"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            {/* Progress indicator - showing both stages complete */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-1 rounded-full bg-blue-500" />
              <div className="flex-1 h-1 rounded-full bg-blue-500" />
            </div>

            <DialogTitle>Preview</DialogTitle>
            <DialogDescription>This is the preview of your {formatText}</DialogDescription>
          </DialogHeader>
          
            {/* Image preview */}
            {capturedPhoto ? (
              <div className="w-full aspect-4/3 rounded-lg border-2 border-gray-300 overflow-hidden">
                <img
                  src={capturedPhoto}
                  alt="Captured photo preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full aspect-4/3 rounded-lg border-2 border-gray-300 flex items-center justify-center text-gray-400">
                No photo captured
              </div>
            )}

            <div className="text-center text-sm">
              📍 {location}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col-reverse md:flex-row gap-4 justify-between">
              <Button variant="secondary" className="w-full flex-1" onClick={() => onRetry()}>
                Retry
              </Button>
              <Button className="w-full flex-1 order-1" onClick={handleSubmit} disabled={!capturedPhoto || attendanceMutation.isPending}>
                {attendanceMutation.isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          
        </DialogContent>
      </Dialog>

      {openCaptureDialog && (
        <CaptureDialog
          setOpen={setOpenCaptureDialog}
          open={openCaptureDialog}
          location={location}
          stream={stream}
          attendanceType={attendanceType}
          onPhotoCapture={handlePhotoCapture}
        />
      )}

        <OvertimeDialog 
        open={showOvertimeDialog} 
        setOpen={setShowOvertimeDialog} 
        onConfirmOvertime={() => {
          setShowOvertimeDialog(false);
          submitAttendance(true);
        }}
        onConfirmRegular={() => {
          setShowOvertimeDialog(false);
          submitAttendance(false);
        }}
        />
    </>
  );
}