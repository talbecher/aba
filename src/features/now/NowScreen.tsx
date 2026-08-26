import { useMemo, useState } from 'react'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useWeekContent } from '../../hooks/useWeekContent'
import { useUserStore } from '../../store/useUserStore'
import { getEstimatedDueDate } from '../../lib/week'
import BottomSheet from '../../components/BottomSheet'

const NEXT_EVENT_WINDOW_DAYS = 21
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
const MS_PER_DAY = 24 * 60 * 60 * 1000
const TOTAL_PREGNANCY_WEEKS = 40

interface NowEvent {
  week: number
  title: string
  desc: string
}

const events: NowEvent[] = [
  { week: 6, title: 'אולטרסאונד ראשון', desc: 'הפעם הראשונה שרואים את הבוטן. תבוא.' },
  { week: 11, title: 'בדיקת שקיפות עורפית', desc: 'בדיקת NT. חשובה. תוודא שיש תור.' },
  { week: 12, title: 'סוף טרימסטר ראשון', desc: 'הסיכון יורד. אפשר לבשר.' },
  { week: 16, title: 'בדיקת AFP', desc: 'בדיקת דם לאיתור חריגות. שאל את הרופא.' },
  { week: 20, title: 'סקירת מחצית', desc: 'הבדיקה הכי חשובה. 20+ פרמטרים. תבוא מוכן.' },
  { week: 24, title: 'בדיקת סוכר הריון', desc: 'GDM screening. שגרתי. תוודא שנקבע.' },
  { week: 28, title: 'טרימסטר שלישי מתחיל', desc: 'ביקורים כל שבועיים מעכשיו.' },
  { week: 36, title: 'בדיקת GBS', desc: 'חיידק שנבדק לפני לידה. לא מחלה — בדיקה.' },
  { week: 37, title: 'Full Term', desc: 'מוכן לגמרי. בכל רגע.' },
  { week: 40, title: 'תאריך לידה משוער', desc: 'הוא/היא מגיעים. בכל רגע.' },
]

function eventDate(dueDate: Date, week: number): Date {
  return new Date(
    dueDate.getTime() - (TOTAL_PREGNANCY_WEEKS - week) * MS_PER_WEEK,
  )
}

interface CardShellProps {
  emoji: string
  title: string
  labelColor: string
  borderColor: string
  children: React.ReactNode
}

function Card({ emoji, title, labelColor, borderColor, children }: CardShellProps) {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl p-4"
      style={{ backgroundColor: 'var(--bg-card)', border: `1px solid ${borderColor}` }}
    >
      <p className="text-[12px] font-semibold" style={{ color: labelColor }}>
        {emoji} {title}
      </p>
      {children}
    </div>
  )
}

function NowScreen() {
  const week = useCurrentWeek()
  const tone = useUserStore((state) => state.tone)
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const { data } = useWeekContent(week)

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')

  const estimatedDueDate = useMemo(
    () => getEstimatedDueDate(dueDate, manualWeekOverride),
    [dueDate, manualWeekOverride],
  )

  const nextEvent = useMemo(() => {
    const today = new Date()
    const upcoming = events
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

  const handleSaveDueDate = () => {
    if (dueDateInput) setDueDate(dueDateInput)
    setSettingsOpen(false)
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-3 bg-[var(--bg)] px-5 pb-24 pt-5 text-[var(--text)]">
      <header>
        <p className="text-[13px] text-[var(--text-secondary)]">
          שבוע {week} — מה חשוב עכשיו
        </p>
      </header>

      {!dueDate && (
        <button
          type="button"
          onClick={() => {
            setDueDateInput(dueDate ?? '')
            setSettingsOpen(true)
          }}
          className="rounded-xl bg-[var(--bg-card)] px-3 py-2 text-right text-xs text-[var(--text-secondary)]"
        >
          הוסף תאריך לידה להתאמה אישית ⚙️
        </button>
      )}

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
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      {nextEvent && (
        <Card
          emoji="🔜"
          title="הדבר הבא"
          labelColor="#3B82F6"
          borderColor="#3B82F6"
        >
          <p className="text-base font-bold">
            {nextEvent.daysUntil === 0
              ? 'היום'
              : `בעוד ${nextEvent.daysUntil} ימים`}
            {' — '}
            {nextEvent.title}
          </p>
          <p className="text-[16px] leading-relaxed" style={{ color: '#dddddd' }}>
            {nextEvent.desc}
          </p>
        </Card>
      )}

      <Card
        emoji="👩"
        title="מה היא עוברת עכשיו"
        labelColor="#EC4899"
        borderColor="#EC489933"
      >
        <p className="text-[16px] leading-relaxed" style={{ color: '#dddddd' }}>
          {data.she_feels[tone]}
        </p>
      </Card>

      <Card
        emoji="👨"
        title="הדבר שלך להיום"
        labelColor="#F59E0B"
        borderColor="#F59E0B33"
      >
        <p className="text-[16px] leading-relaxed" style={{ color: '#dddddd' }}>
          {data.dad_tip[tone]}
        </p>
      </Card>

      <Card
        emoji="🤯"
        title="ידעת השבוע?"
        labelColor="#8B5CF6"
        borderColor="#8B5CF633"
      >
        <p className="text-[16px] leading-relaxed" style={{ color: '#dddddd' }}>
          {data.wtf_fact[tone]}
        </p>
      </Card>
    </div>
  )
}

export default NowScreen
