import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useWeekContent } from '../../hooks/useWeekContent'
import { useUserStore } from '../../store/useUserStore'
import { nowContent } from '../../content/now-content'
import BottomSheet from '../../components/BottomSheet'
import type { Tone } from '../../types/user'

const TOTAL_WEEKS = 40
const DEFAULT_TONE: Tone = 'bro'

function NowScreen() {
  const navigate = useNavigate()
  const week = useCurrentWeek()
  const dueDate = useUserStore((state) => state.due_date)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const { csv, data } = useWeekContent(week)
  const rich = nowContent[week] ?? null

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [dueDateInput, setDueDateInput] = useState(dueDate ?? '')
  const [detailsOpen, setDetailsOpen] = useState(false)

  const remainingWeeks = TOTAL_WEEKS - week
  const percent = Math.round((week / TOTAL_WEEKS) * 100)

  useEffect(() => {
    setDetailsOpen(false)
  }, [week])

  const handleSaveDueDate = () => {
    if (dueDateInput) setDueDate(dueDateInput)
    setSettingsOpen(false)
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-4 bg-[var(--bg)] px-5 pb-24 pt-5 text-[var(--text)]">
      <header className="flex flex-col gap-2">
        <p className="text-[13px] text-[var(--text-secondary)]">
          שבוע {week} מתוך {TOTAL_WEEKS}
        </p>
        <p style={{ fontSize: 12, color: '#555' }}>נותרו {remainingWeeks} שבועות</p>
        <div
          className="h-[3px] w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: `${percent}%`, backgroundColor: 'var(--color-action)' }}
          />
        </div>
      </header>

      {!dueDate && (
        <button
          type="button"
          onClick={() => {
            setDueDateInput(dueDate ?? '')
            setSettingsOpen(true)
          }}
          style={{ minHeight: 44 }}
          className="rounded-xl bg-[var(--bg-card)] px-3 text-right text-xs text-[var(--text-secondary)]"
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
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>
        </div>
      </BottomSheet>

      {rich ? (
        <>
          <p className="text-xl font-black">
            שבוע {week} — {rich.dad.focus}
          </p>

          {/* HERO — הדבר שלך עכשיו */}
          <section
            style={{
              backgroundColor: '#1a1000',
              border: '1px solid #F59E0B44',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <p
              style={{
                fontSize: 11,
                color: '#F59E0B',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              הדבר שלך עכשיו
            </p>
            <p style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>{rich.dad.focus}</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: '#fff' }}>{rich.dad.action}</p>
          </section>

          {/* she */}
          <section
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <h2 className="mb-2 text-sm font-semibold">מה היא עוברת</h2>
            <div className="flex flex-col gap-3">
              {rich.she.symptoms.map((symptom) => (
                <div key={symptom.text}>
                  <p className="text-sm font-bold" style={{ color: '#fff' }}>
                    {symptom.action}
                  </p>
                  <p className="mt-0.5 text-sm" style={{ color: '#666' }}>
                    למה: {symptom.text}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* baby */}
          <section
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <h2 className="mb-2 text-sm font-semibold">מה קורה לבוטן</h2>
            <p className="font-bold" style={{ color: '#fff' }}>{rich.baby.title}</p>
            <p className="mt-1 italic" style={{ fontSize: 14, color: '#888' }}>
              {rich.baby.aba_line}
            </p>

            {detailsOpen && (
              <p className="mt-2" style={{ fontSize: 14, color: '#888', lineHeight: 1.6 }}>
                {rich.baby.detail}
              </p>
            )}
            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              className="mt-2 text-xs font-semibold text-accent"
            >
              {detailsOpen ? 'הצג פחות ↑' : 'עוד פרטים ↓'}
            </button>
          </section>

          {/* fact — שורה, לא section מלא */}
          <div className="flex flex-col gap-1 px-1">
            <p style={{ fontSize: 13, color: '#555' }}>{rich.fact.text}</p>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/did-you-know')}
                className="font-semibold"
                style={{ fontSize: 12, color: 'var(--color-knowledge)' }}
              >
                עוד עובדות →
              </button>
              <p style={{ fontSize: 11, color: '#333' }}>{rich.fact.source}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* 1. מה קורה השבוע */}
          <section
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <h2 className="mb-2 text-sm font-semibold">מה קורה השבוע</h2>
            <p className="font-bold" style={{ fontSize: 16 }}>
              {csv.baby_content.title}
            </p>
            <p className="mt-1" style={{ fontSize: 14, color: '#888' }}>
              {csv.baby_content.plain}
            </p>
            <p className="mt-1 italic" style={{ fontSize: 14, color: '#666' }}>
              {csv.baby_content.aba_line}
            </p>

            {detailsOpen && (
              <div className="mt-3 flex flex-col gap-2 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.6 }}>
                  {csv.baby_summary}
                </p>
                {csv.baby_milestones.length > 0 && (
                  <ul className="flex flex-col gap-1" style={{ color: '#888' }}>
                    {csv.baby_milestones.map((milestone) => (
                      <li key={milestone} className="text-sm">
                        • {milestone}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => setDetailsOpen((v) => !v)}
              className="mt-2 text-xs font-semibold text-accent"
            >
              {detailsOpen ? 'הצג פחות ↑' : 'עוד פרטים ↓'}
            </button>
          </section>

          {/* 2. עובדה קצרה + קישור לידע */}
          <section
            className="rounded-2xl p-4"
            style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <p style={{ fontSize: 14, color: '#888' }}>{data.wtf_fact[DEFAULT_TONE]}</p>
            <button
              type="button"
              onClick={() => navigate('/did-you-know')}
              className="mt-2 text-xs font-semibold"
              style={{ color: 'var(--color-knowledge)' }}
            >
              עוד עובדות →
            </button>
          </section>
        </>
      )}
    </div>
  )
}

export default NowScreen
