'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

interface DateTimePickerProps {
  field: {
    value: string
    onChange: (value: string) => void
  }
}

export function DateTimePicker({ field }: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date>(
    field.value ? new Date(field.value) : new Date()
  )
  const [isOpen, setIsOpen] = React.useState(false)

  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = [0, 15, 30, 45] // Only allowing 15-min intervals

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate) // Use the selected date directly
      newDate.setHours(date.getHours(), date.getMinutes()) // Preserve selected time
      setDate(newDate)
      field.onChange(newDate.toISOString())
      setIsOpen(false) // Close popover after selecting
    }
  }

  const handleTimeChange = (
    type: 'hour' | 'minute' | 'ampm',
    value: string
  ) => {
    const newDate = new Date(date)
    if (type === 'hour') {
      newDate.setHours(
        (parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0)
      )
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value))
    } else if (type === 'ampm') {
      const currentHours = newDate.getHours()
      const isPM = value === 'PM'
      if (isPM && currentHours < 12) {
        newDate.setHours(currentHours + 12)
      } else if (!isPM && currentHours >= 12) {
        newDate.setHours(currentHours - 12)
      }
    }
    setDate(newDate)
    field.onChange(newDate.toISOString())
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal bg-white text-black border-gray-300',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-black" />
          {date ? (
            format(date, 'MM/dd/yyyy hh:mm aa')
          ) : (
            <span>MM/DD/YYYY hh:mm aa</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 bg-white border border-gray-300 text-black shadow-md rounded-lg">
        <div className="flex flex-col sm:flex-row">
          {/* Calendar Selection */}
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            initialFocus
            className="bg-white text-black p-2 border-r border-gray-300"
          />

          {/* Time Selection */}
          <div className="flex flex-col sm:flex-row sm:h-[280px] divide-y sm:divide-y-0 sm:divide-x bg-white">
            {/* Hour Selector */}
            <ScrollArea className="w-24 sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-2">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    variant={
                      date && date.getHours() % 12 === hour % 12
                        ? 'default'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square bg-white text-black border border-gray-300"
                    onClick={() => handleTimeChange('hour', hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* Minute Selector */}
            <ScrollArea className="w-24 sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-2">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    variant={
                      date && date.getMinutes() === minute ? 'default' : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square bg-white text-black border border-gray-300"
                    onClick={() => handleTimeChange('minute', minute.toString())}
                  >
                    {minute.toString().padStart(2, '0')}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* AM/PM Selector */}
            <ScrollArea className="w-24 sm:w-auto">
              <div className="flex sm:flex-col p-2 gap-2">
                {['AM', 'PM'].map((ampm) => (
                  <Button
                    key={ampm}
                    size="icon"
                    variant={
                      date &&
                      ((ampm === 'AM' && date.getHours() < 12) ||
                        (ampm === 'PM' && date.getHours() >= 12))
                        ? 'default'
                        : 'ghost'
                    }
                    className="sm:w-full shrink-0 aspect-square bg-white text-black border border-gray-300"
                    onClick={() => handleTimeChange('ampm', ampm)}
                  >
                    {ampm}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
