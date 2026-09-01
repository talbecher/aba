import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { redFlags, type RedFlag } from '../../content/red-flags'

const urgencyBorder: Record<RedFlag['urgency'], string> = {
  immediate: '1px solid #EF444466',
  same_day: '1px solid #F59E0B66',
  monitor: '1px solid var(--border)',
}

const guidanceText: Record<RedFlag['urgency'], string> = {
  immediate: 'פנו למיון יולדות עכשיו. לא לחכות לבוקר.',
  same_day: 'צרו קשר עם הצוות המטפל היום.',
  monitor: 'עקבו אחר השינוי. אם מחמיר — פנו לרופא.',
}

function SosScreen() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = redFlags.find((flag) => flag.id === selectedId) ?? null

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-5 bg-[var(--bg)] px-5 pb-10 pt-5 text-[var(--text)]">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="חזרה"
          style={{ minHeight: 44, minWidth: 44 }}
          className="text-xl text-[var(--text-secondary)]"
        >
          ←
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-bold">משהו לא מרגיש תקין?</h1>
          <p className="text-sm text-[var(--text-secondary)]">בחר מה קורה עכשיו</p>
        </div>
      </header>

      <div className="flex flex-col gap-3">
        {redFlags.map((flag) => (
          <button
            key={flag.id}
            type="button"
            onClick={() => setSelectedId(flag.id)}
            style={{ minHeight: 56, border: urgencyBorder[flag.urgency] }}
            className="rounded-2xl bg-[var(--bg-card)] px-4 py-4 text-right text-[16px] font-semibold leading-relaxed text-[var(--text)]"
          >
            {flag.symptom}
          </button>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
          onClick={() => setSelectedId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-[390px] flex-col gap-4 rounded-t-3xl p-5"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <p className="text-lg font-bold leading-relaxed">{selected.symptom}</p>

            <p
              className="rounded-xl px-4 py-3 text-center text-xl font-extrabold"
              style={{
                backgroundColor:
                  selected.urgency === 'immediate'
                    ? '#EF444422'
                    : selected.urgency === 'same_day'
                      ? '#F59E0B22'
                      : 'var(--bg-elevated)',
                color:
                  selected.urgency === 'immediate'
                    ? 'var(--color-danger)'
                    : selected.urgency === 'same_day'
                      ? 'var(--accent)'
                      : 'var(--text)',
              }}
            >
              {selected.action}
            </p>

            <p className="text-[16px] font-semibold leading-relaxed">
              {guidanceText[selected.urgency]}
            </p>

            <p className="text-xs text-[var(--text-secondary)]">על פי {selected.source}</p>

            <div className="flex flex-col gap-2">
              {selected.urgency === 'immediate' && (
                <>
                  <a
                    href="tel:101"
                    style={{ minHeight: 48 }}
                    className="flex items-center justify-center rounded-xl bg-accent text-center font-semibold text-neutral-950"
                  >
                    חייגו 101
                  </a>
                  <a
                    href="https://www.google.com/maps/search/מיון+יולדות"
                    target="_blank"
                    rel="noreferrer"
                    style={{ minHeight: 48, border: '1px solid var(--border)' }}
                    className="flex items-center justify-center rounded-xl text-center font-semibold text-[var(--text)]"
                  >
                    נסעו למיון
                  </a>
                </>
              )}

              {selected.urgency === 'same_day' && (
                <a
                  href="tel:*3833"
                  style={{ minHeight: 48 }}
                  className="flex items-center justify-center rounded-xl bg-accent text-center font-semibold text-neutral-950"
                >
                  חייגו לקופה *3833
                </a>
              )}

              {selected.urgency === 'monitor' && (
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  style={{ minHeight: 48, border: '1px solid var(--border)' }}
                  className="rounded-xl text-center font-semibold text-[var(--text)]"
                >
                  הבנתי, אעקוב
                </button>
              )}
            </div>

            <p className="text-center text-[11px] leading-relaxed text-[var(--text-muted)]">
              מידע זה אינו תחליף לייעוץ רפואי מקצועי.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SosScreen
