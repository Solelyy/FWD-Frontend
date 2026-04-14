"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  year: number
  month: number // 0-11
  day: number
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
  onDayChange: (day: number) => void
}

export default function DatePicker({
  year,
  month,
  day,
  onYearChange,
  onMonthChange,
  onDayChange,
}: DatePickerProps) {
  
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()
  const currentDay = today.getDate()

  // prevent future dates
  const safeDay =
    year === currentYear && month === currentMonth
      ? Math.min(day, currentDay)
      : day

  const selectedDate = new Date(year, month, safeDay)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-70 justify-between font-normal"
        >
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} />
            {format(selectedDate, "PPP")}
          </div>
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return
            onYearChange(date.getFullYear())
            onMonthChange(date.getMonth())
            onDayChange(date.getDate())
          }}
          disabled={(date) => date > new Date()} //disable future dates.
        />
      </PopoverContent>
    </Popover>
  )
}