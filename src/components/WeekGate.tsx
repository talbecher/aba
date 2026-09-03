import { useState, type ReactNode } from 'react'
import { useUserStore } from '../store/useUserStore'

type Mode = 'week' | 'date'

interface WeekGateProps {
  children: ReactNode
}

function WeekGate({ children }: WeekGateProps) {
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )

  const [mode, setMode] = useState<Mode>('week')
  const [weekSlider, setWeekSlider] = useState(20)
  const [dueDateInput, setDueDateInput] = useState('')

  if (dueDate !== null || manualWeekOverride !== null) {
    return <>{children}</>
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[390px] flex-col items-center justify-center gap-6 bg-[var(--bg)] px-6 text-[var(--text)]">
      {mode === 'week' ? (
        <>
          <h1 className="text-center text-xl font-bold">באיזה שבוע אתם?</h1>

          <div className="flex w-full flex-col gap-3">
            <div className="text-center text-2xl font-black text-accent">
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

          <button
            type="button"
            onClick={() => setManualWeekOverride(weekSlider)}
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
          >
            שמור
          </button>

          <button
            type="button"
            onClick={() => setMode('date')}
            className="text-sm text-[var(--text-secondary)]"
          >
            יש לי תאריך לידה משוער ←
          </button>
        </>
      ) : (
        <>
          <h1 className="text-center text-xl font-bold">תאריך לידה משוער</h1>

          <input
            type="date"
            value={dueDateInput}
            onChange={(e) => setDueDateInput(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />

          <button
            type="button"
            onClick={() => dueDateInput && setDueDate(dueDateInput)}
            disabled={!dueDateInput}
            style={{ minHeight: 44 }}
            className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950 disabled:opacity-40"
          >
            שמור
          </button>

          <button
            type="button"
            onClick={() => setMode('week')}
            className="text-sm text-[var(--text-secondary)]"
          >
            → חזרה לבחירת שבוע
          </button>
        </>
      )}
    </div>
  )
}

export default WeekGate
