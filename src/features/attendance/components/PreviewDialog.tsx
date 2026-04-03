"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { AttendanceType } from "../types/attendanceType";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CaptureDialog from "./CaptureDialog";
import { stopStream } from "../utils/stream";

type PreviewDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: GeolocationPosition;
  photo: string | null;
  attendanceType?: AttendanceType;
  stream: MediaStream;
  onRetry: () => void
};

export default function PreviewDialog({
  open,
  setOpen,
  position,
  photo,
  stream,
  attendanceType,
  onRetry
}: PreviewDialogProps) {
  const formatText = attendanceType === AttendanceType.TIME_IN ? "time in" : "time out";
  const [openCaptureDialog, setOpenCaptureDialog] = useState(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(photo);

  const handlePhotoCapture = (photoUrl: string) => {
    setCapturedPhoto(photoUrl);
  };

  const handleSubmit = () => {
    console.log("Submitting photo:", capturedPhoto);
    // Call the submit API later

    setOpen(false);
    stopStream(stream);

  };

  return (
    <>
      <Dialog open={open} onOpenChange={(val) => { 
        if (!val) stopStream(stream);
        setOpen(val);
        }}>
        <DialogContent className="w-[90%] max-w-sm md:max-w-md">
          <DialogHeader>
            {/* Progress indicator - showing both stages complete */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1 h-1 rounded-full bg-blue-500" />
              <div className="flex-1 h-1 rounded-full bg-blue-500" />
            </div>

            <DialogTitle>Preview</DialogTitle>
            <DialogDescription>This is the preview of your {formatText}</DialogDescription>

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

            {/* Action buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              <Button variant="secondary" className="w-full flex-1" onClick={() => onRetry()}>
                Retry
              </Button>
              <Button className="w-full flex-1" onClick={handleSubmit} disabled={!capturedPhoto}>
                Submit
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {openCaptureDialog && (
        <CaptureDialog
          setOpen={setOpenCaptureDialog}
          open={openCaptureDialog}
          position={position}
          stream={stream}
          attendanceType={attendanceType}
          onPhotoCapture={handlePhotoCapture}
        />
      )}
    </>
  );
}