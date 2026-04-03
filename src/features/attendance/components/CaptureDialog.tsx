"use client";
import React, { useEffect, useRef, useState } from "react";
import { AttendanceType } from "../types/attendanceType";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { stopStream } from "../utils/stream";

type CaptureDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: GeolocationPosition;
  stream: MediaStream;
  attendanceType?: AttendanceType;
  onPhotoCapture: (photoUrl: string) => void;
};

export default function CaptureDialog({
  open,
  setOpen,
  position,
  stream,
  attendanceType,
  onPhotoCapture,
}: CaptureDialogProps) {
  const attendanceFormatText = attendanceType === "TIME_IN" ? "Time In" : "Time Out";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMounted, setVideoMounted] = useState(false);

  console.log(`CaptureDialog rendered.
    open: ${open}
    stream: ${!!stream}
    stream tracks: ${stream?.getTracks().length}
  `);

  const handleVideoRef = (el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      console.log("Video element mounted!");
      setVideoMounted(true);
    }
  };

  useEffect(() => {
    console.log(`useEffect called. 
      open: ${open}
      stream: ${!!stream}
      videoMounted: ${videoMounted}`
    );

    if (!stream || !videoRef.current || !open || !videoMounted) {
      console.log(`useEffect early return.
        stream: ${!!stream}
        videoRef: ${!!videoRef.current}
        open: ${open}
        videoMounted: ${videoMounted}`
      );
      return;
    }

    const videoEl = videoRef.current;
    videoEl.muted = true;

    let retryTimeout: number;

    const attachStream = () => {
      console.log("Attaching stream to video element");

      // Ensure all tracks are enabled
      stream.getTracks().forEach((track) => {
        track.enabled = true;
      });

      console.log("Setting srcObject:", stream);
      videoEl.srcObject = stream;

      const tryPlay = () => {
        if (!videoEl || !open) return;

        console.log("Attempting to play video");
        videoEl.play()
          .then(() => {
            console.log("Video playing successfully");
            setIsPlaying(true);
          })
          .catch((err) => {
            console.error("Play failed:", err);
            retryTimeout = window.setTimeout(tryPlay, 200);
          });
      };

      tryPlay();
    };

    const initTimeout = window.setTimeout(attachStream, 100);
    console.log("initTimeout: ", initTimeout);

    return () => {
      if (videoEl) videoEl.srcObject = null;
      clearTimeout(retryTimeout);
      clearTimeout(initTimeout);
      setIsPlaying(false);
    };
  }, [stream, open, videoMounted]);

  /* Capture photo from video */
  const handleCapture = () => {
    if (!videoRef.current) return;

    const videoEl = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

    const dataUrl = canvas.toDataURL("image/png");
    console.log("Captured photo:", dataUrl);
    onPhotoCapture(dataUrl);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      if (!val) {
        stopStream(stream);
      } 
      setOpen(val);
    }}>
      <DialogContent className="w-[90%] max-w-sm md:max-w-md">
        <DialogHeader>
          {/* Progress indicator - showing capture stage active */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 h-1 rounded-full bg-blue-500" />
            <div className="flex-1 h-1 rounded-full bg-gray-300" />
          </div>

          <DialogTitle>Capture {attendanceFormatText}</DialogTitle>
          <DialogDescription>Please position yourself in the camera and bring out your best smile.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 mt-4">
          <video
            ref={handleVideoRef}
            autoPlay
            playsInline
            muted
            width={400}
            height={320}
            className="w-full h-80 rounded-lg border-4 border-gray-300 object-cover bg-transparent"
            onCanPlay={() => videoRef.current?.play().catch(() => {})}
            onLoadedMetadata={() =>
              console.log("onLoadedMetadata fired, videoWidth:", videoRef.current?.videoWidth)
            }
          />
          <Button onClick={handleCapture} disabled={!isPlaying} className="w-full">
            Capture Photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}