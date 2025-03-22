import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCalendarContext } from '../calendar-context'
import { format } from 'date-fns'
import { DateTimePicker } from '@/components/form/date-time-picker'
import { ColorPicker } from '@/components/form/color-picker'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const formSchema = z
  .object({
    title: z.string().min(1, 'Title is required'),
    start: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid start date',
    }),
    end: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid end date',
    }),
    color: z.string(),
  })
  .refine(
    (data) => {
      try {
        const start = new Date(data.start)
        const end = new Date(data.end)
        return end >= start
      } catch {
        return false
      }
    },
    {
      message: 'End time must be after start time',
      path: ['end'],
    }
  )

export default function CalendarManageEventDialog() {
  const {
    manageEventDialogOpen,
    setManageEventDialogOpen,
    selectedEvent,
    setSelectedEvent,
    events,
    setEvents,
  } = useCalendarContext()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      start: '',
      end: '',
      color: 'blue',
    },
  })

  useEffect(() => {
    if (selectedEvent) {
      form.reset({
        title: selectedEvent.title,
        start: format(selectedEvent.start, "yyyy-MM-dd'T'HH:mm"),
        end: format(selectedEvent.end, "yyyy-MM-dd'T'HH:mm"),
        color: selectedEvent.color,
      })
    }
  }, [selectedEvent, form])

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedEvent) return

    const updatedEvent = {
      ...selectedEvent,
      title: values.title,
      start: new Date(values.start),
      end: new Date(values.end),
      color: values.color,
    }

    setEvents(
      events.map((event) =>
        event.id === selectedEvent.id ? updatedEvent : event
      )
    )
    handleClose()
  }

  function handleDelete() {
    if (!selectedEvent) return
    setEvents(events.filter((event) => event.id !== selectedEvent.id))
    handleClose()
  }

  function handleClose() {
    setManageEventDialogOpen(false)
    setSelectedEvent(null)
    form.reset()
  }

  return (
    <Dialog open={manageEventDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-white border border-gray-300 text-gray-900 shadow-lg rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Manage Event</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-800">Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Event title" 
                      {...field} 
                      className="bg-white border border-gray-300 text-gray-900"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-800">Start</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-800">End</FormLabel>
                  <FormControl>
                    <DateTimePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-gray-800">Color</FormLabel>
                  <FormControl>
                    <ColorPicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex justify-between gap-2">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white border border-gray-300 text-gray-900 shadow-lg rounded-lg">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-gray-900">
                      Delete Event
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-700">
                      Are you sure you want to delete this event? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-gray-100 text-gray-900 border border-gray-300">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-600 text-white">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
                Update Event
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
