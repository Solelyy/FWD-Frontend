"use client";

import { useState } from "react";
import { TimePicker } from "@/components/shared/TimePicker";
import { Label } from "@/components/ui/label";

type AddAttendanceProps = {
    initialTimeIn?: Date;
    initialTimeOut?: Date;
    onTimesChange?: (times: { timeIn?: Date; timeOut?: Date }) => void;
};

export default function AddAttendance({ initialTimeIn, initialTimeOut, onTimesChange }: AddAttendanceProps) {
    const [timeIn, setTimeIn] = useState<Date | undefined>(initialTimeIn ?? new Date());
    const [timeOut, setTimeOut] = useState<Date | undefined>(initialTimeOut ?? new Date());

    const handleTimeInChange = (nextDate: Date | undefined) => {
        setTimeIn(nextDate);
        onTimesChange?.({ timeIn: nextDate, timeOut });
    };

    const handleTimeOutChange = (nextDate: Date | undefined) => {
        setTimeOut(nextDate);
        onTimesChange?.({ timeIn, timeOut: nextDate });
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor="time-in" className="text-sm font-medium">
                    Time In
                </Label>
                <div id="time-in">
                    <TimePicker date={timeIn} setDate={handleTimeInChange} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="time-out" className="text-sm font-medium">
                    Time Out
                </Label>
                <div id="time-out">
                    <TimePicker date={timeOut} setDate={handleTimeOutChange} />
                </div>
            </div>
        </div>
    );
}