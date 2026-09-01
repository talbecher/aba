import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/useUserStore'
import { medicalDictionary } from '../../content/medical-dictionary'

function DictionaryScreen() {
  const navigate = useNavigate()
  const completedTasks = useUserStore((state) => state.completedTasks)
  const toggleCompletedTask = useUserStore((state) => state.toggleCompletedTask)

  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = query.trim()
    if (!q) return medicalDictionary
    return medicalDictionary.filter(
      (t) => t.term.includes(q) || t.dugri.includes(q),
    )
  }, [query])

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-4 bg-[var(--bg)] px-5 pb-10 pt-5 text-[var(--text)]">
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
        <h1 className="text-lg font-bold">🔍 מילון</h1>
      </header>

      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="חפש מונח... GBS, אפידורל, שקיפות"
        style={{ minHeight: 48, fontSize: 16 }}
        className="w-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:border-accent focus:outline-none"
      />

      {filtered.length === 0 ? (
        <p
          className="mt-8 text-center text-sm leading-relaxed"
          style={{ color: 'var(--text-secondary)' }}
        >
          לא מצאנו את המונח. אם שמעת אותו אצל הרופא — כנראה שזה בסדר.
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((entry) => {
            const isOpen = openId === entry.id
            const missionId = `dict-mission-${entry.id}`
            const missionDone = completedTasks.includes(missionId)

            return (
              <div
                key={entry.id}
                className="rounded-2xl p-4"
                style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-card)' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : entry.id)}
                  aria-expanded={isOpen}
                  style={{ minHeight: 44 }}
                  className="flex w-full items-center justify-between gap-2 text-right"
                >
                  <span className="flex flex-col items-start gap-1">
                    <span className="font-bold" style={{ fontSize: 16 }}>
                      {entry.term}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px]"
                      style={{ color: '#555', backgroundColor: 'var(--bg-elevated)' }}
                    >
                      {entry.source}
                    </span>
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      color: 'var(--text-secondary)',
                      transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                      transition: 'transform 200ms ease',
                    }}
                  >
                    ‹
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 flex flex-col gap-3">
                    <div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                        ההגדרה הרפואית
                      </p>
                      <p className="mt-1" style={{ fontSize: 13, color: '#888', lineHeight: 1.5 }}>
                        {entry.clinical}
                      </p>
                    </div>

                    <div style={{ borderRight: '3px solid var(--accent)', paddingRight: 12 }}>
                      <p className="text-xs font-semibold text-accent">בגובה העיניים</p>
                      <p
                        className="mt-1 font-bold"
                        style={{ fontSize: 16, color: '#fff', lineHeight: 1.5 }}
                      >
                        {entry.dugri}
                      </p>
                    </div>

                    <div
                      className="rounded-xl p-3"
                      style={{ backgroundColor: '#1a1000', border: '1px solid #F59E0B33' }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-xs font-semibold text-accent">המשימה שלך</p>
                          <p
                            className="mt-1"
                            style={{
                              fontSize: 14,
                              lineHeight: 1.5,
                              color: missionDone ? 'var(--text-secondary)' : 'var(--text)',
                              textDecoration: missionDone ? 'line-through' : 'none',
                            }}
                          >
                            {entry.mission}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleCompletedTask(missionId)}
                          aria-label={
                            missionDone ? `בטל סימון: ${entry.mission}` : `סמן כבוצע: ${entry.mission}`
                          }
                          aria-pressed={missionDone}
                          style={{ minHeight: 44, minWidth: 44 }}
                          className="flex shrink-0 items-center justify-center"
                        >
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              width: 28,
                              height: 28,
                              borderRadius: '50%',
                              border: `2px solid ${missionDone ? 'var(--color-success)' : 'var(--text-muted)'}`,
                              backgroundColor: missionDone ? 'var(--color-success)' : 'transparent',
                              transition: 'background-color 250ms ease, border-color 250ms ease',
                            }}
                          >
                            <span
                              style={{
                                display: 'inline-block',
                                color: '#0A0A0A',
                                fontSize: 15,
                                fontWeight: 900,
                                transform: missionDone ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-45deg)',
                                transition: 'transform 350ms cubic-bezier(.34,1.56,.64,1)',
                              }}
                            >
                              ✓
                            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DictionaryScreen
