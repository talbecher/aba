import { useMemo } from 'react'
import { useUserStore } from '../store/useUserStore'
import { getEstimatedDueDate } from '../lib/week'
import { journeyEvents, eventDate, type JourneyEvent } from '../content/journeyEvents'

const NEXT_EVENT_WINDOW_DAYS = 21
const MS_PER_DAY = 24 * 60 * 60 * 1000
const UP_NEXT_COUNT = 2

export interface JourneyPreviewEvent extends JourneyEvent {
  daysUntil: number
  date: Date
}

export interface JourneyPreview {
  estimatedDueDate: Date
  next: JourneyPreviewEvent | null
  upNext: JourneyPreviewEvent[]
}

export function useJourneyPreview(): JourneyPreview {
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)

  const estimatedDueDate = useMemo(
    () => getEstimatedDueDate(dueDate, manualWeekOverride),
    [dueDate, manualWeekOverride],
  )

  return useMemo(() => {
    const today = new Date()

    const futureEvents = journeyEvents
      .map((event) => {
        const date = eventDate(estimatedDueDate, event.week)
        const daysUntil = Math.ceil(
          (date.getTime() - today.getTime()) / MS_PER_DAY,
        )
        return { ...event, date, daysUntil }
      })
      .filter((event) => event.date.getTime() >= today.getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    const nextCandidate = futureEvents[0] ?? null
    const next =
      nextCandidate && nextCandidate.daysUntil <= NEXT_EVENT_WINDOW_DAYS
        ? nextCandidate
        : null

    const upNextStart = next ? 1 : 0
    const upNext = futureEvents.slice(upNextStart, upNextStart + UP_NEXT_COUNT)

    return { estimatedDueDate, next, upNext }
  }, [estimatedDueDate])
}
