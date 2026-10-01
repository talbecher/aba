import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { getDueWeek } from '../../lib/week'
import { useJourneyPreview } from '../../hooks/useJourneyPreview'
import { useUserStore } from '../../store/useUserStore'
import { openGoogleCalendarEvent } from '../../lib/calendar'
import {
  journeyEvents,
  eventId,
  buildCalendarDescription,
  type JourneyEvent,
} from '../../content/journeyEvents'
import type { Appointment } from '../../types/user'
import BottomSheet from '../../components/BottomSheet'
import PreparationDetail from '../../components/PreparationDetail'
import WeeklyReveal from '../reveal/WeeklyReveal'
import BotanDailyCard from './BotanDailyCard'
import NextActionCard from './NextActionCard'

const MS_PER_DAY = 24 * 60 * 60 * 1000

function formatFullDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

const TOTAL_WEEKS = 40

function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1
  if (week <= 27) return 2
  return 3
}

function HomeScreen() {
  const navigate = useNavigate()
  const week = useCurrentWeek()
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )
  const addPlannedEvent = useUserStore((state) => state.addPlannedEvent)
  const appointments = useUserStore((state) => state.appointments)
  const showManualWeekNotice = !dueDate && manualWeekOverride !== null
  const { next } = useJourneyPreview()

  const nextAppointment = useMemo(() => {
    const now = Date.now()
    type ScheduledEntry = { event: JourneyEvent; appt: Appointment; date: Date }
    const upcoming: ScheduledEntry[] = []
    for (const event of journeyEvents) {
      const appt = appointments[eventId(event)]
      if (!appt || appt.status !== 'scheduled') continue
      const date = new Date(`${appt.date}T${appt.time || '00:00'}`)
      if (date.getTime() < now) continue
      upcoming.push({ event, appt, date })
    }
    upcoming.sort((a, b) => a.date.getTime() - b.date.getTime())
    return upcoming[0] ?? null
  }, [appointments])

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settingsMode, setSettingsMode] = useState<'date' | 'week'>(dueDate ? 'date' : 'week')
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')
  const [weekSlider, setWeekSlider] = useState(manualWeekOverride ?? week)
  const dueDateInputWeek = dueDateInput ? getDueWeek(dueDateInput, null) : null
  const [prepOpen, setPrepOpen] = useState(false)

  const trimester = getTrimester(week)
  const percent = Math.round((week / TOTAL_WEEKS) * 100)
  const remainingWeeks = TOTAL_WEEKS - week

  const handleSaveWeek = () => {
    if (settingsMode === 'date') {
      if (!dueDateInput) return
      setDueDate(dueDateInput)
      setManualWeekOverride(null)
    } else {
      setManualWeekOverride(weekSlider)
      setDueDate(null)
    }
    setSettingsOpen(false)
  }

  const handleAddNextToCalendar = () => {
    if (!next) return
    openGoogleCalendarEvent({
      title: next.title,
      date: next.date,
      description: next.desc || next.title,
    })
    addPlannedEvent(String(next.week))
  }

  const handleWhatToKnow = () => {
    if (next?.preparation) {
      setPrepOpen(true)
    } else {
      navigate('/journey')
    }
  }

  const [appointmentPrepOpen, setAppointmentPrepOpen] = useState(false)

  const handleAppointmentAddToCalendar = () => {
    if (!nextAppointment) return
    openGoogleCalendarEvent({
      title: nextAppointment.event.title,
      date: new Date(`${nextAppointment.appt.date}T00:00:00`),
      time: nextAppointment.appt.time,
      location: nextAppointment.appt.location,
      description: buildCalendarDescription(nextAppointment.event),
    })
    addPlannedEvent(String(nextAppointment.event.week))
  }

  const appointmentDaysUntil = nextAppointment
    ? Math.ceil((nextAppointment.date.getTime() - Date.now()) / MS_PER_DAY)
    : 0

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-4 bg-[var(--bg)] pb-24 text-[var(--text)]">
      <header className="flex flex-col gap-2 px-5 pt-4 pb-2">
        <div className="grid grid-cols-3 items-center">
          <div className="flex items-center gap-1 justify-self-start">
            <button
              type="button"
              onClick={() => navigate('/sos')}
              aria-label="קרה משהו? SOS"
              style={{ minHeight: 44, minWidth: 44 }}
              className="flex items-center justify-center text-lg"
            >
              <span style={{ color: 'var(--color-danger)' }}>🚨</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDueDateInput(dueDate ?? '')
                setWeekSlider(manualWeekOverride ?? week)
                setSettingsMode(dueDate ? 'date' : 'week')
                setSettingsOpen(true)
              }}
              aria-label="עדכן שבוע"
              style={{ minHeight: 44, minWidth: 44 }}
              className="flex items-center justify-center text-lg text-[var(--text-secondary)]"
            >
              ⚙️
            </button>
          </div>
          <p
            className="justify-self-center text-accent"
            style={{ fontSize: 16, fontWeight: 900 }}
          >
            Aba
          </p>
          <button
            type="button"
            onClick={() => navigate('/dictionary')}
            style={{ minHeight: 44 }}
            className="justify-self-end text-xs font-semibold text-[var(--text-secondary)]"
          >
            🔍 מילון
          </button>
        </div>

        <p className="text-center" style={{ fontSize: 12, color: '#555' }}>
          שבוע {week} מתוך {TOTAL_WEEKS} · טרימסטר {trimester} · נותרו{' '}
          {remainingWeeks} שבועות
        </p>

        <div
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              backgroundColor: 'var(--color-action)',
            }}
          />
        </div>

        {showManualWeekNotice && (
          <p className="text-center text-xs text-[var(--text-muted)]">
            תוכן מוצג לשבוע {week} — עדכן שבוע בהגדרות
          </p>
        )}
      </header>

      <BottomSheet open={settingsOpen} onClose={() => setSettingsOpen(false)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-bold">עדכן שבוע</h2>
          <p className="text-sm text-neutral-400">השבוע הנוכחי: {week}</p>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSettingsMode('date')}
              style={{ minHeight: 44 }}
              className={`flex-1 rounded-xl border p-3 text-sm font-semibold ${
                settingsMode === 'date'
                  ? 'border-accent text-accent'
                  : 'border-neutral-700 text-neutral-400'
              }`}
            >
              {settingsMode === 'date' ? '◉' : '○'} תאריך לידה משוער
            </button>
            <button
              type="button"
              onClick={() => setSettingsMode('week')}
              style={{ minHeight: 44 }}
              className={`flex-1 rounded-xl border p-3 text-sm font-semibold ${
                settingsMode === 'week'
                  ? 'border-accent text-accent'
                  : 'border-neutral-700 text-neutral-400'
              }`}
            >
              {settingsMode === 'week' ? '◉' : '○'} אני יודע את השבוע
            </button>
          </div>

          {settingsMode === 'date' ? (
            <div className="flex flex-col gap-2">
              <input
                type="date"
                value={dueDateInput}
                onChange={(e) => setDueDateInput(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
              />
              {dueDateInputWeek !== null && (
                <p className="text-sm text-neutral-400">
                  לפי התאריך — שבוע {dueDateInputWeek}
                </p>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="text-center text-lg font-semibold text-accent">
                שבוע {weekSlider}
              </div>
              <input
                type="range"
                min={1}
                max={40}
                value={weekSlider}
                onChange={(e) => setWeekSlider(Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveWeek}
            disabled={settingsMode === 'date' && !dueDateInput}
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950 disabled:opacity-40"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      {next?.preparation && (
        <BottomSheet open={prepOpen} onClose={() => setPrepOpen(false)}>
          <PreparationDetail
            title={next.title}
            badge={next.badge}
            preparation={next.preparation}
            onAddToCalendar={handleAddNextToCalendar}
            onClose={() => setPrepOpen(false)}
          />
        </BottomSheet>
      )}

      {nextAppointment?.event.preparation && (
        <BottomSheet open={appointmentPrepOpen} onClose={() => setAppointmentPrepOpen(false)}>
          <PreparationDetail
            title={nextAppointment.event.title}
            badge={nextAppointment.event.badge}
            preparation={nextAppointment.event.preparation}
            onAddToCalendar={handleAppointmentAddToCalendar}
            onClose={() => setAppointmentPrepOpen(false)}
          />
        </BottomSheet>
      )}

      <WeeklyReveal />

      <BotanDailyCard />

      <section
        className="mx-5 rounded-2xl p-4"
        style={{ border: '1px solid #3B82F644', backgroundColor: '#0d1117' }}
      >
        {nextAppointment ? (
          <>
            <div className="mb-2 flex items-center justify-between">
              <h2
                className="text-sm font-semibold"
                style={{ color: 'var(--color-info)' }}
              >
                📍 באופק
              </h2>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: 'rgba(59,130,246,0.12)',
                  color: 'var(--color-info)',
                }}
              >
                {nextAppointment.event.badge}
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#888' }}>
              {appointmentDaysUntil === 0
                ? 'היום'
                : appointmentDaysUntil === 1
                  ? 'מחר'
                  : `בעוד ${appointmentDaysUntil} ימים`}
            </p>
            <p className="mt-1" style={{ fontSize: 18, fontWeight: 700 }}>
              הבא שלכם: {nextAppointment.event.title}
            </p>
            <p className="mt-1" style={{ fontSize: 14, color: '#888' }}>
              📅 {formatFullDate(nextAppointment.date)} · {nextAppointment.appt.time}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setAppointmentPrepOpen(true)}
                style={{
                  minHeight: 44,
                  backgroundColor: 'var(--color-info)',
                  color: '#0A0A0A',
                }}
                className="flex-1 rounded-xl text-sm font-semibold"
              >
                מה צריך לדעת לפני?
              </button>
            </div>
          </>
        ) : next ? (
          <>
            <div className="mb-2 flex items-center justify-between">
              <h2
                className="text-sm font-semibold"
                style={{ color: 'var(--color-info)' }}
              >
                📍 באופק
              </h2>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  backgroundColor: 'rgba(59,130,246,0.12)',
                  color: 'var(--color-info)',
                }}
              >
                {next.badge}
              </span>
            </div>
            <p style={{ fontSize: 12, color: '#888' }}>
              {next.daysUntil === 0
                ? 'היום'
                : next.daysUntil === 1
                  ? 'מחר'
                  : next.daysUntil > 21
                    ? `בעוד ${Math.round(next.daysUntil / 7)} שבועות`
                    : `בעוד ${next.daysUntil} ימים`}
            </p>
            <p className="mt-1" style={{ fontSize: 18, fontWeight: 700 }}>
              {next.title}
            </p>
            {next.desc && (
              <p
                className="mt-1 truncate"
                style={{ fontSize: 14, color: '#888' }}
              >
                {next.desc}
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={handleWhatToKnow}
                style={{
                  minHeight: 44,
                  backgroundColor: 'var(--color-info)',
                  color: '#0A0A0A',
                }}
                className="flex-1 rounded-xl text-sm font-semibold"
              >
                {next.type === 'task' ? 'פתח הכנה' : 'מה צריך לדעת'}
              </button>
              <button
                type="button"
                onClick={handleAddNextToCalendar}
                style={{ minHeight: 44, borderColor: '#333', color: '#888' }}
                className="flex-1 rounded-xl border text-sm font-semibold"
              >
                הוסף ליומן
              </button>
            </div>
          </>
        ) : (
          <p className="py-2 text-center" style={{ fontSize: 14, color: '#888' }}>
            כל האירועים הגדולים מאחוריכם.
          </p>
        )}

        <button
          type="button"
          onClick={() => navigate('/journey')}
          className="mt-3 text-xs font-semibold"
          style={{ color: 'var(--color-info)' }}
        >
          פתח את כל המסע →
        </button>
      </section>

      <NextActionCard />

      <p style={{ fontSize: 12, color: '#444', textAlign: 'center' }}>
        השבוע הבא: משהו קטן יותר ממה שאתה חושב. נפתח בעוד 7 ימים.
      </p>
    </div>
  )
}

export default HomeScreen
