import { useMemo, useState } from 'react'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useUserStore } from '../../store/useUserStore'
import { getEstimatedDueDate } from '../../lib/week'
import { openGoogleCalendarEvent, DISCLAIMER } from '../../lib/calendar'
import {
  journeyEvents,
  eventDate,
  type JourneyEvent,
} from '../../content/journeyEvents'
import BottomSheet from '../../components/BottomSheet'
import PreparationDetail from '../../components/PreparationDetail'

type Filter = 'all' | 'check' | 'task' | 'milestone'

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'הכול' },
  { id: 'check', label: 'בדיקות' },
  { id: 'task', label: 'הכנות' },
  { id: 'milestone', label: 'משימות' },
]

const MONTH_ABBR = [
  'ינו׳', 'פבר׳', 'מרץ', 'אפר׳', 'מאי', 'יונ׳',
  'יול׳', 'אוג׳', 'ספט׳', 'אוק׳', 'נוב׳', 'דצמ׳',
]

function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1
  if (week <= 27) return 2
  return 3
}

function formatFullDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

function formatShortDate(date: Date): string {
  return `${date.getDate()} ${MONTH_ABBR[date.getMonth()]}`
}

type EventStatus = 'past' | 'current' | 'next' | 'future'

function JourneyScreen() {
  const week = useCurrentWeek()
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const plannedEvents = useUserStore((state) => state.plannedEvents)
  const addPlannedEvent = useUserStore((state) => state.addPlannedEvent)

  const [filter, setFilter] = useState<Filter>('all')
  const [selected, setSelected] = useState<JourneyEvent | null>(null)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')

  const estimatedDueDate = useMemo(
    () => getEstimatedDueDate(dueDate, manualWeekOverride),
    [dueDate, manualWeekOverride],
  )

  const trimester = getTrimester(week)

  const nextEventIndex = useMemo(() => {
    return journeyEvents.findIndex((event) => event.week > week)
  }, [week])

  const daysUntilFor = (event: JourneyEvent): number => {
    const ms = eventDate(estimatedDueDate, event.week).getTime() - Date.now()
    return Math.ceil(ms / (24 * 60 * 60 * 1000))
  }

  const statusFor = (event: JourneyEvent, index: number): EventStatus => {
    if (event.week === week) return 'current'
    if (event.week < week) return 'past'
    if (index === nextEventIndex) return 'next'
    return 'future'
  }

  const filteredEvents =
    filter === 'all'
      ? journeyEvents
      : journeyEvents.filter((event) => event.type === filter)

  const handleSaveDueDate = () => {
    if (dueDateInput) setDueDate(dueDateInput)
    setSettingsOpen(false)
  }

  const handleAddToCalendar = (event: JourneyEvent) => {
    openGoogleCalendarEvent({
      title: event.title,
      date: eventDate(estimatedDueDate, event.week),
      description: event.desc || event.title,
    })
    addPlannedEvent(String(event.week))
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-5 bg-[var(--bg)] px-5 pb-24 pt-5 text-[var(--text)]">
      <header className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black">🗂️ המסע שלכם</h1>
          <button
            type="button"
            onClick={() => {
              setDueDateInput(dueDate ?? '')
              setSettingsOpen(true)
            }}
            aria-label="ערוך תאריך לידה"
            style={{ minHeight: 44 }}
            className="px-2 text-xs text-[var(--text-secondary)]"
          >
            ערוך תאריך ⚙️
          </button>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          שבוע {week} · טרימסטר {trimester}
        </p>
        {dueDate && (
          <p className="text-xs text-[var(--text-secondary)]">
            תאריך לידה משוער: {formatFullDate(estimatedDueDate)}
          </p>
        )}
      </header>

      <BottomSheet open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">עדכן תאריך לידה</h2>
          <input
            type="date"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={handleSaveDueDate}
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            style={{ minHeight: 44 }}
            className={`shrink-0 rounded-[20px] border px-4 text-sm font-semibold transition-colors ${
              filter === f.id
                ? 'border-accent text-accent'
                : 'border-[var(--border)] text-[var(--text-muted)]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="relative flex flex-col gap-4 pr-2">
        <div
          className="absolute bottom-0 top-0 w-px"
          style={{ right: 15, backgroundColor: 'var(--border)' }}
          aria-hidden="true"
        />

        {filteredEvents.map((event) => {
          const index = journeyEvents.indexOf(event)
          const status = statusFor(event, index)
          const hasRealDueDate = dueDate !== null
          const dateLabel = hasRealDueDate
            ? formatShortDate(eventDate(estimatedDueDate, event.week))
            : `שבוע ${event.week}`
          const isPlanned = plannedEvents.includes(String(event.week))

          return (
            <button
              key={event.week}
              type="button"
              onClick={() => setSelected(event)}
              className="relative flex items-start gap-3 text-right"
              style={{ opacity: status === 'past' ? 0.5 : 1, minHeight: 44 }}
            >
              <span
                className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm"
                style={{
                  backgroundColor:
                    status === 'current' ? 'var(--accent-dim)' : 'var(--bg)',
                  border:
                    status === 'current'
                      ? '2px solid var(--accent)'
                      : '1px solid var(--border)',
                }}
              >
                {status === 'past' ? (
                  <span style={{ color: 'var(--color-success)' }}>✓</span>
                ) : status === 'current' ? (
                  <span className="text-accent">●</span>
                ) : (
                  <span className="text-[var(--text-muted)]">○</span>
                )}
              </span>

              <div className="flex flex-1 flex-col gap-1 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[var(--text-secondary)]">
                    {dateLabel}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{
                      backgroundColor:
                        event.badge === 'בדיקה'
                          ? 'rgba(59,130,246,0.12)'
                          : event.badge === 'הכנה'
                            ? 'rgba(139,92,246,0.12)'
                            : event.badge === 'לידה'
                              ? 'rgba(16,185,129,0.12)'
                              : 'var(--accent-dim)',
                      color:
                        event.badge === 'בדיקה'
                          ? 'var(--color-info)'
                          : event.badge === 'הכנה'
                            ? 'var(--color-knowledge)'
                            : event.badge === 'לידה'
                              ? 'var(--color-success)'
                              : 'var(--accent)',
                    }}
                  >
                    {event.badge}
                  </span>
                </div>
                <p
                  className={`text-[15px] ${
                    status === 'current' || status === 'next'
                      ? 'font-bold text-[var(--text)]'
                      : 'font-semibold text-[var(--text)]'
                  }`}
                >
                  {status === 'current' && 'השבוע · '}
                  {event.title}
                </p>
                {status === 'next' && (
                  <p className="text-xs font-semibold text-accent">
                    {daysUntilFor(event) === 0
                      ? 'היום'
                      : daysUntilFor(event) === 1
                        ? 'מחר'
                        : `בעוד ${daysUntilFor(event)} ימים`}
                  </p>
                )}
                {event.desc && (
                  <p className="text-xs text-[var(--text-secondary)]">
                    {event.desc}
                  </p>
                )}
                {isPlanned && (
                  <span className="text-[11px]" style={{ color: 'var(--color-success)' }}>
                    ✓ ביומן
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <BottomSheet open={selected !== null} onClose={() => setSelected(null)}>
        {selected &&
          (selected.preparation ? (
            <PreparationDetail
              title={selected.title}
              badge={selected.badge}
              preparation={selected.preparation}
              onAddToCalendar={() => handleAddToCalendar(selected)}
              onClose={() => setSelected(null)}
            />
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">{selected.title}</h2>
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
                >
                  {selected.badge}
                </span>
              </div>
              <p className="text-sm text-neutral-400">
                {dueDate
                  ? formatFullDate(eventDate(estimatedDueDate, selected.week))
                  : `שבוע ${selected.week}`}
              </p>
              {selected.desc && (
                <p className="text-sm leading-relaxed text-neutral-300">
                  {selected.desc}
                </p>
              )}
              <p className="text-xs leading-relaxed text-neutral-500">
                {DISCLAIMER}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCalendar(selected)}
                  style={{ minHeight: 44 }}
                  className="flex-1 rounded-xl bg-accent p-3 font-semibold text-neutral-950"
                >
                  הוסף ליומן
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  style={{ minHeight: 44 }}
                  className="flex-1 rounded-xl border border-neutral-700 p-3 font-semibold text-neutral-300"
                >
                  סגור
                </button>
              </div>
            </div>
          ))}
      </BottomSheet>
    </div>
  )
}

export default JourneyScreen
