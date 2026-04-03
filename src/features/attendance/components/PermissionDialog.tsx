"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScanFace, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { getCamera, getLocation } from "../api/permissionsApi";
import { AttendanceType } from "../types/attendanceType";
import CaptureDialog from "./CaptureDialog";
import PreviewDialog from "./PreviewDialog";
import { stopStream } from "../utils/stream";

type PermissionDialogProps = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    attendanceType?: AttendanceType
}
export default function PermissionDialog({open, setOpen, attendanceType} : PermissionDialogProps) {
    const [loading, setLoading] = useState(false);
    const [openCaptureDialog, setOpenCaptureDialog] = useState(false);
    const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
    const [position, setPosition] = useState<GeolocationPosition | null >(null);
    const [stream, setStream] = useState<MediaStream | null >(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

    const typeToLowercase = attendanceType?.toLowerCase();

    const handlePhotoCapture = (photoUrl: string) => {
        setCapturedPhoto(photoUrl);
        setOpenCaptureDialog(false);
        setOpenPreviewDialog(true);
    };

    const handleRetry = () => {
        setCapturedPhoto(null);        // clear old photo
        setOpenPreviewDialog(false);   // close preview
        setOpenCaptureDialog(true);    // open capture
    };

    const handleContinue = async () => {
    try {
        setLoading(true);
        // Request location first
        try {
            const pos = await getLocation();
            setPosition(pos);
            const {longitude, latitude} = pos.coords;
            console.log(`Longitude: ${longitude} \n Latitude: ${latitude}`);
        } catch (error: any) {
            console.log(`error: ${error}`);
            const errorMsg = error.code === 1 ? `You must allow location to capture your ${typeToLowercase} photo.` 
            : "Location is unavailable right now." 
            toast.warning(errorMsg); 
            
            return;
        } 

        // If location succeeds, request camera
        try {
            const camStream = await getCamera();
            setStream(camStream);
            console.log("Tracks:", camStream.getTracks()); // returns any track ex: audio or video
            console.log("Video tracks:", camStream.getVideoTracks()); // return only video
        } catch (error: any) {
            console.log(`error: ${error}`);
            if (error.name === "NotAllowedError") {
                toast.warning(`You must allow camera to capture your ${typeToLowercase} photo.`);
            }
            return;
        }

        // Close permission dialog and open capture dialog
        setOpen(false);
        setOpenCaptureDialog(true);
    } catch (error: any) {
        console.log(`error: ${error}`);
        toast.warning("Something went wrong. Please try again later.")
    } finally {
        setLoading(false);
    }
    };
    return (
        <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="w-[90%] max-w-sm md:max-w-md space-y-4">
                <DialogHeader>
                    <DialogTitle>Allow Access</DialogTitle>
                </DialogHeader>

                <div className="flex gap-4 items-center justify-center">
                    <MapPin size={50} color="#696969"/>
                    <ScanFace size={50} color="#696969"/>
                </div>
                <DialogDescription className="text-md text-center">
                    We need access to your location and camera to proceed.
                </DialogDescription>

                <div className="flex flex-col md:flex-row gap-2 justify-between">
                    <Button onClick={handleContinue} className="w-full flex-1" disabled={loading}> 
                        {loading ? "Requesting..." : "Continue"}
                    </Button>

                    <Button
                        onClick={() => {
                            stopStream(stream);
                            setOpen(false);
                        }}
                        variant="secondary"
                        className="w-full flex-1"
                        >
                        Cancel
                    </Button>
                </div>   
            </DialogContent>
        </Dialog>

        {openCaptureDialog && stream && position && (
            <CaptureDialog 
                setOpen={setOpenCaptureDialog} 
                open={openCaptureDialog} 
                position={position}
                stream={stream}
                attendanceType={attendanceType}
                onPhotoCapture={handlePhotoCapture}
            />
        )}

        {openPreviewDialog && stream && position && (
            <PreviewDialog
                setOpen={setOpenPreviewDialog}
                open={openPreviewDialog}
                position={position}
                photo={capturedPhoto}
                stream={stream}
                attendanceType={attendanceType}
                onRetry={handleRetry}
            />
        )}
        </>
    );
}