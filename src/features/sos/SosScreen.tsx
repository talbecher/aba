import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sosAlerts } from '../../content/sosAlerts'

function SosScreen() {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selected = sosAlerts.find((alert) => alert.id === selectedId) ?? null

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col gap-5 bg-[var(--bg)] px-5 pb-10 pt-5 text-[var(--text)]">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          aria-label="חזרה"
          className="text-xl text-[var(--text-secondary)]"
        >
          ←
        </button>
        <h1 className="text-lg font-bold">משהו לא מרגיש תקין?</h1>
      </header>

      {!selected && (
        <div className="flex flex-col gap-3">
          {sosAlerts.map((alert) => (
            <button
              key={alert.id}
              type="button"
              onClick={() => setSelectedId(alert.id)}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] px-4 py-4 text-right text-[16px] font-semibold text-[var(--text)]"
            >
              {alert.label}
            </button>
          ))}
        </div>
      )}

      {selected && (
        <div className="flex flex-col gap-5">
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="self-start text-sm text-[var(--text-secondary)]"
          >
            ← חזרה לרשימה
          </button>

          <div
            className="flex flex-col gap-3 rounded-2xl p-5"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <p className="text-base font-bold">{selected.label}</p>
            <p className="text-[16px] leading-relaxed">{selected.text}</p>
            <p className="text-[16px] font-bold text-accent">
              פנו עכשיו לצוות המטפל.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="tel:101"
              className="rounded-xl bg-accent p-3 text-center font-semibold text-neutral-950"
            >
              חייגו 101
            </a>
            <button
              type="button"
              className="rounded-xl border border-[var(--border)] p-3 text-center font-semibold text-[var(--text)]"
            >
              מוקד קופת חולים
            </button>
            <p className="text-center text-xs text-[var(--text-muted)]">
              מספר המוקד תלוי בקופת החולים שלכם — כדאי לשמור אותו מראש באנשי הקשר.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SosScreen
