import { useState } from 'react'
import { useUserStore } from '../../store/useUserStore'

interface StepWhenProps {
  onComplete: () => void
}

type Method = 'due_date' | 'current_week'

function StepWhen({ onComplete }: StepWhenProps) {
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )

  const [method, setMethod] = useState<Method | null>(null)
  const [dueDateInput, setDueDateInput] = useState('')
  const [weekSlider, setWeekSlider] = useState(20)

  const canSubmit =
    (method === 'due_date' && !!dueDateInput) || method === 'current_week'

  const handleSubmit = () => {
    if (!canSubmit) return
    if (method === 'due_date') {
      setDueDate(dueDateInput)
    } else {
      setManualWeekOverride(weekSlider)
    }
    onComplete()
  }

  return (
    <div
      className="flex h-full flex-col gap-8 px-6 pb-8 pt-14"
      style={{ backgroundColor: '#0A0A0A', color: '#fff' }}
    >
      <p
        className="text-center font-black"
        style={{ fontSize: 32, color: 'var(--accent)' }}
      >
        Aba
      </p>

      <div className="flex flex-col gap-2 text-center">
        <h1 className="font-bold" style={{ fontSize: 24, color: '#fff' }}>
          מתי הבוטן שלכם מגיע?
        </h1>
        <p style={{ fontSize: 14, color: '#555' }}>
          נשתמש בזה כדי להתאים את כל התוכן
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setMethod('due_date')}
          style={{
            minHeight: 44,
            border: `1px solid ${method === 'due_date' ? 'var(--accent)' : '#333'}`,
            backgroundColor: '#111',
          }}
          className="rounded-xl p-4 text-right text-white"
        >
          יש לי תאריך לידה משוער
        </button>
        {method === 'due_date' && (
          <input
            type="date"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            style={{ minHeight: 48 }}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-4 text-lg text-neutral-100 focus:border-accent focus:outline-none"
          />
        )}

        <button
          type="button"
          onClick={() => setMethod('current_week')}
          style={{
            minHeight: 44,
            border: `1px solid ${method === 'current_week' ? 'var(--accent)' : '#333'}`,
            backgroundColor: '#111',
          }}
          className="rounded-xl p-4 text-right text-white"
        >
          אני יודע באיזה שבוע
        </button>
        {method === 'current_week' && (
          <div className="flex flex-col gap-3 rounded-xl bg-neutral-900 p-4">
            <div className="text-center text-lg font-semibold text-accent">
              שבוע {weekSlider}
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={weekSlider}
              onChange={(e) => setWeekSlider(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        )}
      </div>

      <div className="mt-auto">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            minHeight: 52,
            backgroundColor: 'var(--accent)',
            color: '#0A0A0A',
            borderRadius: 50,
          }}
          className="w-full font-bold disabled:opacity-40"
        >
          יאללה, נתחיל →
        </button>
      </div>
    </div>
  )
}

export default StepWhen
