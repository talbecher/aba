import type { JourneyPreparation } from '../content/journeyEvents'
import { DISCLAIMER } from '../lib/calendar'

interface PreparationDetailProps {
  title: string
  badge?: string
  preparation: JourneyPreparation
  onAddToCalendar: () => void
  onClose: () => void
}

function PreparationDetail({
  title,
  badge,
  preparation,
  onAddToCalendar,
  onClose,
}: PreparationDetailProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold">{title}</h2>
        {badge && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: 'var(--accent-dim)', color: 'var(--accent)' }}
          >
            {badge}
          </span>
        )}
      </div>

      <p className="text-sm leading-relaxed text-neutral-300">
        {preparation.what}
      </p>
      <p className="text-sm leading-relaxed text-neutral-300">
        {preparation.why}
      </p>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-[var(--text)]">מה להכין:</p>
        <p className="text-sm leading-relaxed text-neutral-300">
          {preparation.prepare}
        </p>
      </div>

      {preparation.window && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[var(--text)]">חלון זמן:</p>
          <p className="text-sm leading-relaxed text-neutral-300">
            {preparation.window}
          </p>
        </div>
      )}

      {preparation.partner && (
        <p className="text-sm font-semibold" style={{ color: 'var(--color-success)' }}>
          כדאי שתבוא 👍
        </p>
      )}

      {preparation.questions && preparation.questions.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-[var(--text)]">שאלות לרופא:</p>
          <ul className="flex flex-col gap-1">
            {preparation.questions.map((q) => (
              <li key={q} className="text-sm leading-relaxed text-neutral-300">
                – {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="text-xs leading-relaxed text-neutral-500">
        {preparation.disclaimer ?? DISCLAIMER}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onAddToCalendar}
          style={{ minHeight: 44 }}
          className="flex-1 rounded-xl bg-accent p-3 font-semibold text-neutral-950"
        >
          הוסף ליומן
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{ minHeight: 44 }}
          className="flex-1 rounded-xl border border-neutral-700 p-3 font-semibold text-neutral-300"
        >
          סגור
        </button>
      </div>
    </div>
  )
}

export default PreparationDetail
