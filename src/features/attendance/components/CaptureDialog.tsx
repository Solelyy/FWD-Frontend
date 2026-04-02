"use client";
import React, { useEffect, useRef, useState } from "react";
import { AttendanceType } from "../types/attendanceType";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CaptureDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: GeolocationPosition;
  stream: MediaStream;
  attendanceType?: AttendanceType;
};

export default function CaptureDialog({ open, setOpen, position, stream, attendanceType, }: CaptureDialogProps) {
  const attendanceFormatText = attendanceType === "TIME_IN" ? "Time In" : "Time Out";
  const videoRef = useRef<HTMLVideoElement>(null);

  console.log(`videoRef: ${videoRef.current}`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMounted, setVideoMounted] = useState(false);

  console.log(`CaptureDialog rendered.
    open: ${open}
    stream: ${!!stream}
    stream tracks: ${stream?.getTracks().length}`
  );

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
    videoEl.muted = true; // set no sound from the video

    let retryTimeout: number;

    // Delay attaching srcObject slightly to ensure modal is mounted
    const attachStream = () => {
      console.log("Attaching stream to video element");
      
      // Ensure all tracks are enabled
      const videoTracks = stream.getVideoTracks();
      console.log(`Video tracks before enable: ${videoTracks}`);
      
      stream.getTracks().forEach((track) => {
        track.enabled = true;
      });
      
      console.log("Setting srcObject:", stream);
      videoEl.srcObject = stream;
      console.log("srcObject set, videoEl.srcObject:", videoEl.srcObject);

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

    // Wait a tick to ensure portal modal is in DOM
    const initTimeout = window.setTimeout(attachStream, 100);

    return () => {
      stream.getTracks().forEach((track) => track.stop());
      if (videoEl) videoEl.srcObject = null;
      clearTimeout(retryTimeout);
      clearTimeout(initTimeout);
      setIsPlaying(false);
    };
  }, [stream, open, videoMounted]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    const videoEl = videoRef.current;

    const canvas = document.createElement("canvas");
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    const photoDataUrl = canvas.toDataURL("image/png");

    console.log("Captured photo:", photoDataUrl);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[90%] max-w-sm md:max-w-md">
        <DialogHeader>
            <DialogTitle>Capture {attendanceFormatText}</DialogTitle>
            <DialogDescription>
                Please position yourself in the camera and bring out your best smile.
            </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <video
            ref={handleVideoRef}
            autoPlay
            playsInline
            muted
            width={400}
            height={320}
            className="w-full h-80 rounded-lg border-4 border-gray-300 object-cover bg-transparent"
            onCanPlay={() => {
              console.log("onCanPlay fired");
              videoRef.current?.play().catch(err => console.warn("Retry play:", err));
            }}
            onLoadedMetadata={() => {
              console.log("onLoadedMetadata fired, videoWidth:", videoRef.current?.videoWidth);
            }}
            onError={(e) => {
              console.error("Video error:", e);
            }}
          />
          <Button onClick={handleCapture} disabled={!isPlaying}>
            Capture Photo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}