import { useEffect, useMemo, useRef, useState } from 'react'
import { useUserStore } from '../../store/useUserStore'
import { getEstimatedDueDate } from '../../lib/week'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import BottomSheet from '../../components/BottomSheet'
import {
  TIMELINE_EVENTS,
  eventDate,
  type EventType,
  type TimelineEvent,
} from '../../content/timelineEvents'

const MONTH_NAMES = [
  'ינואר',
  'פברואר',
  'מרץ',
  'אפריל',
  'מאי',
  'יוני',
  'יולי',
  'אוגוסט',
  'ספטמבר',
  'אוקטובר',
  'נובמבר',
  'דצמבר',
]

const MONTH_ABBR = [
  'ינו׳',
  'פבר׳',
  'מרץ',
  'אפר׳',
  'מאי',
  'יונ׳',
  'יול׳',
  'אוג׳',
  'ספט׳',
  'אוק׳',
  'נוב׳',
  'דצמ׳',
]

function formatEventDate(date: Date): string {
  return `${date.getDate()} ${MONTH_ABBR[date.getMonth()]}`
}

const TYPE_STYLE: Record<
  EventType,
  { border: string; bg: string; text: string }
> = {
  medical: {
    border: 'border-blue-500/30',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
  },
  milestone: {
    border: 'border-accent/30',
    bg: 'bg-accent/10',
    text: 'text-accent',
  },
  action: {
    border: 'border-neutral-600/30',
    bg: 'bg-[var(--bg-card-elevated)]',
    text: 'text-[var(--text-secondary)]',
  },
}

interface MonthColumn {
  key: string
  year: number
  month: number
  events: (TimelineEvent & { date: Date })[]
}

function TimelineScreen() {
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const currentWeek = useCurrentWeek()

  const estimatedDueDate = useMemo(
    () => getEstimatedDueDate(dueDate, manualWeekOverride),
    [dueDate, manualWeekOverride],
  )

  const columns = useMemo<MonthColumn[]>(() => {
    const datedEvents = TIMELINE_EVENTS.map((event) => ({
      ...event,
      date: eventDate(estimatedDueDate, event.week),
    })).sort((a, b) => a.date.getTime() - b.date.getTime())

    const map = new Map<string, MonthColumn>()
    for (const event of datedEvents) {
      const year = event.date.getFullYear()
      const month = event.date.getMonth()
      const key = `${year}-${month}`
      if (!map.has(key)) map.set(key, { key, year, month, events: [] })
      map.get(key)!.events.push(event)
    }
    return [...map.values()]
  }, [estimatedDueDate])

  const hasRealDueDate = dueDate !== null
  const [selected, setSelected] = useState<TimelineEvent | null>(null)
  const currentColumnRef = useRef<HTMLDivElement>(null)

  const currentColumnKey = useMemo(() => {
    const today = new Date()
    const inCurrentMonth = columns.find(
      (col) => col.year === today.getFullYear() && col.month === today.getMonth(),
    )
    return inCurrentMonth?.key ?? columns[0]?.key
  }, [columns])

  useEffect(() => {
    currentColumnRef.current?.scrollIntoView({
      inline: 'start',
      block: 'nearest',
    })
  }, [currentColumnKey])

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[390px] bg-[var(--bg-base)] pb-24 text-[var(--text-primary)]">
      <header className="p-5">
        <h1 className="text-xl font-bold">📅 הדרך</h1>
        <div className="mt-2 flex gap-3 text-[11px] text-[var(--text-secondary)]">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-400" /> רפואי
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-accent" /> אבן דרך
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-neutral-500" /> משימה
          </span>
        </div>
      </header>

      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4">
        {columns.map((col) => (
          <div
            key={col.key}
            ref={col.key === currentColumnKey ? currentColumnRef : undefined}
            className="flex w-[200px] shrink-0 snap-start flex-col gap-2"
          >
            <h2 className="mb-1 text-sm font-bold text-[var(--text-secondary)]">
              {MONTH_NAMES[col.month]} {col.year}
            </h2>
            {col.events.map((event, i) => {
              const isCurrent = event.week === currentWeek
              const style = TYPE_STYLE[event.type]
              return (
                <button
                  key={`${event.week}-${event.title}-${i}`}
                  type="button"
                  onClick={() => setSelected(event)}
                  className={`flex items-start gap-2 rounded-2xl border p-3 text-right ${
                    isCurrent
                      ? 'border-2 border-accent bg-accent/10'
                      : `${style.border} ${style.bg}`
                  }`}
                >
                  <span className="text-lg">{event.icon}</span>
                  <span className="flex flex-col">
                    <span className="text-xs text-[var(--text-muted)]">
                      {hasRealDueDate
                        ? formatEventDate(event.date)
                        : `שבוע ${event.week}`}
                    </span>
                    <span
                      className={`text-sm font-semibold ${isCurrent ? 'text-accent' : style.text}`}
                    >
                      {event.title}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <BottomSheet open={selected !== null} onClose={() => setSelected(null)}>
        {selected && (
          <div className="flex flex-col gap-3">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <span>{selected.icon}</span>
              <span>{selected.title}</span>
            </h2>
            <p className="text-sm text-neutral-400">
              {hasRealDueDate
                ? `${formatEventDate(eventDate(estimatedDueDate, selected.week))} · שבוע ${selected.week}`
                : `שבוע ${selected.week}`}
            </p>
            <p className="text-sm leading-relaxed text-neutral-300">
              {selected.description}
            </p>
          </div>
        )}
      </BottomSheet>
    </div>
  )
}

export default TimelineScreen
