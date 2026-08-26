import { useMemo } from 'react'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useWeekContent } from '../../hooks/useWeekContent'
import { useUserStore } from '../../store/useUserStore'
import { getEstimatedDueDate } from '../../lib/week'
import {
  TIMELINE_EVENTS,
  eventDate,
  MS_PER_DAY,
} from '../../content/timelineEvents'

const NEXT_EVENT_WINDOW_DAYS = 14

interface CardShellProps {
  emoji: string
  title: string
  children: React.ReactNode
  borderColor?: string
}

function Card({ emoji, title, children, borderColor }: CardShellProps) {
  return (
    <div
      className="flex flex-col gap-2 rounded-2xl p-4"
      style={{
        backgroundColor: '#141414',
        border: `1px solid ${borderColor ?? '#222222'}`,
      }}
    >
      <p className="text-xs font-semibold text-[var(--text-secondary)]">
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
  const { data } = useWeekContent(week)

  const estimatedDueDate = useMemo(
    () => getEstimatedDueDate(dueDate, manualWeekOverride),
    [dueDate, manualWeekOverride],
  )

  const nextEvent = useMemo(() => {
    const today = new Date()
    const upcoming = TIMELINE_EVENTS.map((event) => ({
      event,
      date: eventDate(estimatedDueDate, event.week),
    }))
      .filter(({ date }) => date.getTime() >= today.getTime())
      .sort((a, b) => a.date.getTime() - b.date.getTime())[0]

    if (!upcoming) return null

    const daysUntil = Math.ceil(
      (upcoming.date.getTime() - today.getTime()) / MS_PER_DAY,
    )
    if (daysUntil > NEXT_EVENT_WINDOW_DAYS) return null

    return { ...upcoming.event, daysUntil }
  }, [estimatedDueDate])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-3 bg-[var(--bg-base)] px-5 pb-24 pt-5 text-[var(--text-primary)]">
      <header>
        <p className="text-sm text-[var(--text-secondary)]">
          שבוע {week} — מה חשוב עכשיו
        </p>
      </header>

      {nextEvent && (
        <Card
          emoji="🔜"
          title="הדבר הבא"
          borderColor={nextEvent.type === 'medical' ? '#3B82F680' : '#F59E0B80'}
        >
          <p className="text-base font-bold">
            {nextEvent.daysUntil === 0
              ? 'היום'
              : `בעוד ${nextEvent.daysUntil} ימים`}
            {' — '}
            {nextEvent.title}
          </p>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {nextEvent.description}
          </p>
        </Card>
      )}

      <Card emoji="👩" title="מה היא עוברת עכשיו">
        <p className="text-sm leading-relaxed text-[var(--text-primary)]">
          {data.she_feels[tone]}
        </p>
      </Card>

      <Card emoji="👨" title="הדבר שלך להיום">
        <p className="text-sm leading-relaxed text-[var(--text-primary)]">
          {data.dad_tip[tone]}
        </p>
      </Card>

      <Card emoji="🤯" title="ידעת?">
        <p className="text-sm leading-relaxed text-[var(--text-primary)]">
          {data.wtf_fact[tone]}
        </p>
      </Card>
    </div>
  )
}

export default NowScreen
