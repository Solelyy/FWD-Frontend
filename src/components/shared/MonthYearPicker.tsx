"use client"

import { format } from "date-fns"
import { Calendar, ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

const months = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
]

const START_YEAR = 2026

type Props = {
  year: number
  month: number
  onYearChange: (year: number) => void
  onMonthChange: (month: number) => void
}

export function MonthYearPicker({year, month, onYearChange, onMonthChange,}: Props) {
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth()

  const safeMonth =
  year === currentYear
    ? Math.min(month, currentMonth)
    : month  
  const selectedDate = new Date(year, safeMonth)

  // generate years from START_YEAR to currentYear (descending)
  const years = Array.from(
    { length: currentYear - START_YEAR + 1 },
    (_, i) => START_YEAR + i
  ).reverse()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-60 justify-between font-normal"
        >
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {format(selectedDate, "MMMM yyyy")}
          </div>

          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-65 p-3" align="start">
        <div className="flex gap-2">
          {/* Year selector */}
          <Select
            value={String(year)}
            onValueChange={(val) => onYearChange(Number(val))}
          >
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Year" />
            </SelectTrigger>

            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={String(y)}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Month selector */}
          <Select
            value={String(month)}
            onValueChange={(val) => onMonthChange(Number(val))}
          >
            <SelectTrigger className="w-30">
              <SelectValue placeholder="Month" />
            </SelectTrigger>

            <SelectContent>
              {months.map((m, i) => {
                const isDisabled =
                  year === currentYear && i > currentMonth

                return (
                  <SelectItem
                    key={m}
                    value={String(i)}
                      className={isDisabled ? "opacity-40 cursor-not-allowed" : ""}
                  >
                    {m}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}