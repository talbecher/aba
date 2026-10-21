import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { getWeekAndDay } from '../../lib/week'
import { getWeeklyHighlight } from '../../lib/weeklyHighlight'
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
import WeekSourceSettings from '../../components/WeekSourceSettings'
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
  const lmpDate = useUserStore((state) => state.lmp_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const manualDayOverride = useUserStore((state) => state.manual_day_override)
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
  const [prepOpen, setPrepOpen] = useState(false)

  const trimester = getTrimester(week)
  const percent = Math.round((week / TOTAL_WEEKS) * 100)
  const remainingWeeks = TOTAL_WEEKS - week
  const weekDay = getWeekAndDay(dueDate, lmpDate, manualWeekOverride, manualDayOverride)
  const highlight = weekDay ? getWeeklyHighlight(weekDay.week) : null

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
              onClick={() => setSettingsOpen(true)}
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
          טרימסטר {trimester} · נותרו {remainingWeeks} שבועות
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
        <WeekSourceSettings onSaved={() => setSettingsOpen(false)} />
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

      {weekDay && (
        <div className="flex flex-col items-center px-5">
          <p className="mb-1 text-xs tracking-wide text-[var(--text-muted)]">
            ההריון שלכם היום
          </p>
          <div className="flex items-baseline gap-1.5" dir="rtl">
            <span className="text-4xl font-bold text-accent">שבוע {weekDay.week}</span>
            {weekDay.dayInWeek > 0 && (
              <>
                <span className="text-2xl font-light text-[var(--text-muted)]">+</span>
                <span className="text-3xl font-semibold text-[var(--text-muted)]">
                  {weekDay.dayInWeek}
                </span>
              </>
            )}
          </div>
          {weekDay.dayInWeek > 0 && (
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              יום {weekDay.dayInWeek} מתוך 7 בשבוע זה
            </p>
          )}
        </div>
      )}

      {highlight && (
        <div
          className="mx-5 rounded-2xl p-4"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
        >
          <p className="mb-1 text-xs text-[var(--text-muted)]">מה קורה אצלי השבוע</p>
          <p className="text-sm leading-relaxed text-[var(--text)]" dir="rtl">
            {highlight}
          </p>
        </div>
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

      <button
        type="button"
        onClick={() => navigate('/planner')}
        style={{ minHeight: 44, border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
        className="mx-5 flex items-center justify-between rounded-2xl p-4 text-sm font-semibold text-[var(--text)]"
      >
        <span>📅 מה יהיה אז?</span>
        <span className="text-[var(--text-secondary)]">←</span>
      </button>

      <p style={{ fontSize: 12, color: '#444', textAlign: 'center' }}>
        השבוע הבא: משהו קטן יותר ממה שאתה חושב. נפתח בעוד 7 ימים.
      </p>
    </div>
  )
}

export default HomeScreen
