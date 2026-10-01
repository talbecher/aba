import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { journeyEvents } from '../../content/journeyEvents'

function NextActionCard() {
  const currentWeek = useCurrentWeek()

  const upcoming = journeyEvents.find((event) => event.week >= currentWeek)
  if (!upcoming) return null

  const isThisWeek = upcoming.week === currentWeek
  const weeksAway = upcoming.week - currentWeek
  const body = upcoming.preparation?.what ?? upcoming.preparation?.why

  return (
    <section
      className="mx-5 rounded-2xl p-4"
      style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">⚡</span>
          <span className="text-sm font-semibold text-[var(--text)]">הדבר שלך עכשיו</span>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
          style={{
            backgroundColor: isThisWeek ? 'var(--accent-dim)' : 'var(--bg-elevated)',
            color: isThisWeek ? 'var(--accent)' : 'var(--text-muted)',
          }}
        >
          {isThisWeek ? 'השבוע' : `בעוד ${weeksAway} שבועות`}
        </span>
      </div>

      <p className="mb-1 text-sm font-semibold text-[var(--text)]">{upcoming.title}</p>
      {body && (
        <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{body}</p>
      )}
    </section>
  )
}

export default NextActionCard
