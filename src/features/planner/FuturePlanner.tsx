import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { getEstimatedDueDate, getWeekAtDate } from '../../lib/week'
import { nowContent } from '../../content/now-content'

const TOTAL_WEEKS = 40
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000

function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function formatFullDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

type Result =
  | { kind: 'past' }
  | { kind: 'born' }
  | { kind: 'week'; week: number; date: Date }

function FuturePlanner() {
  const navigate = useNavigate()
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)

  const today = new Date()
  const todayIso = toISODate(today)
  const effectiveDueDate = getEstimatedDueDate(dueDate, manualWeekOverride)
  const maxDate = dueDate
    ? effectiveDueDate
    : new Date(today.getTime() + TOTAL_WEEKS * MS_PER_WEEK)

  const [targetInput, setTargetInput] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const handleCheck = () => {
    if (!targetInput) return

    if (todayIso > targetInput) {
      setResult({ kind: 'past' })
      return
    }

    const target = new Date(targetInput)
    if (target.getTime() > effectiveDueDate.getTime()) {
      setResult({ kind: 'born' })
      return
    }

    setResult({ kind: 'week', week: getWeekAtDate(target, effectiveDueDate), date: target })
  }

  const rich = result?.kind === 'week' ? (nowContent[result.week] ?? null) : null

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-5 bg-[var(--bg)] px-5 pb-24 pt-5 text-[var(--text)]">
      <header className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black">מה יהיה אז?</h1>
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="חזרה"
            style={{ minHeight: 44 }}
            className="px-2 text-xs text-[var(--text-secondary)]"
          >
            ← חזרה
          </button>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">בחר תאריך בעתיד ותדע למה לצפות</p>
      </header>

      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4">
        <input
          type="date"
          min={todayIso}
          max={toISODate(maxDate)}
          value={targetInput}
          onChange={(e) => {
            setTargetInput(e.target.value)
            setResult(null)
          }}
          className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
        />
        <button
          type="button"
          onClick={handleCheck}
          disabled={!targetInput}
          style={{ minHeight: 44 }}
          className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950 disabled:opacity-40"
        >
          בדוק →
        </button>
      </div>

      {result?.kind === 'past' && (
        <p className="text-sm text-[var(--text-secondary)]">התאריך הזה כבר עבר.</p>
      )}

      {result?.kind === 'born' && (
        <div
          className="rounded-2xl p-6 text-center"
          style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
        >
          <p className="text-lg font-bold">התינוק כבר איתכם! 👶</p>
        </div>
      )}

      {result?.kind === 'week' && (
        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <p style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>
              ב-{formatFullDate(result.date)} תהיו בשבוע {result.week}
            </p>
          </div>

          {rich ? (
            <>
              <p className="text-lg font-black">{rich.headline}</p>

              <section
                className="rounded-2xl p-4"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
              >
                <h2 className="mb-2 text-sm font-semibold">מה קורה לבוטן</h2>
                <p className="font-bold" style={{ color: '#fff' }}>{rich.baby.title}</p>
                <p className="mt-1 italic" style={{ fontSize: 14, color: '#888' }}>
                  {rich.baby.aba_line}
                </p>
              </section>

              <section
                className="rounded-2xl p-4"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
              >
                <h2 className="mb-2 text-sm font-semibold">מה היא עוברת</h2>
                <ul className="flex flex-col gap-1">
                  {rich.she.symptoms.map((symptom) => (
                    <li key={symptom.text} className="text-sm" style={{ color: '#888' }}>
                      – {symptom.text}
                    </li>
                  ))}
                </ul>
              </section>

              <p style={{ fontSize: 13, color: '#555' }}>{rich.fact.text}</p>
            </>
          ) : (
            <p className="text-sm text-[var(--text-secondary)]">עוד אין תוכן מפורט לשבוע הזה.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default FuturePlanner
