"use client";
 
import * as React from "react";
import { TimePickerInput } from "@/components/ui/TimePicker/timer-picker-input";
import { TimePeriodSelect } from "@/components/ui/TimePicker/period-select";
import { Period } from "@/components/ui/TimePicker/time-picker-utils";
 
interface TimePickerDemoProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}
 
export function TimePicker({ date, setDate }: TimePickerDemoProps) {
  const [period, setPeriod] = React.useState<Period>("PM");
 
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const periodRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!date) return;
    setPeriod(date.getHours() >= 12 ? "PM" : "AM");
  }, [date]);
 
  return (
    <div className="inline-flex w-full items-end gap-2 rounded-lg border border-border/60 bg-muted/20 p-3">
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="12hours"
          id="hours"
          period={period}
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <span className="pb-2 text-lg font-semibold text-muted-foreground" aria-hidden="true">
        :
      </span>
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          id="minutes12"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => periodRef.current?.focus()}
        />
      </div>

      <div className="grid gap-1 text-center">
        <TimePeriodSelect
          period={period}
          setPeriod={setPeriod}
          date={date}
          setDate={setDate}
          ref={periodRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div>
    </div>
  );
}