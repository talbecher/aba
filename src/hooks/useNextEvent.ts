import { useMemo } from 'react'
import { useUserStore } from '../store/useUserStore'
import { getEstimatedDueDate } from '../lib/week'
import { journeyEvents, eventDate, type JourneyEvent } from '../content/journeyEvents'

const NEXT_EVENT_WINDOW_DAYS = 21
const MS_PER_DAY = 24 * 60 * 60 * 1000

export interface NextEvent extends JourneyEvent {
  daysUntil: number
}

export function useNextEvent(): NextEvent | null {
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)

  const estimatedDueDate = useMemo(
    () => getEstimatedDueDate(dueDate, manualWeekOverride),
    [dueDate, manualWeekOverride],
  )

  return useMemo(() => {
    const today = new Date()
    const upcoming = journeyEvents
      .map((event) => ({ event, date: eventDate(estimatedDueDate, event.week) }))
      .filter(({ date }) => date.getTime() >= today.getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

    if (!upcoming) return null

    const daysUntil = Math.ceil(
      (upcoming.date.getTime() - today.getTime()) / MS_PER_DAY,
    )
    if (daysUntil > NEXT_EVENT_WINDOW_DAYS) return null

    return { ...upcoming.event, daysUntil }
  }, [estimatedDueDate])
}
