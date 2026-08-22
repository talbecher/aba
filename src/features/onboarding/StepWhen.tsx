import { useState } from 'react'
import { calculateEddFromConception } from '../../lib/week'
import { useUserStore } from '../../store/useUserStore'

interface StepWhenProps {
  onNext: () => void
}

type Method = 'due_date' | 'current_week' | 'conception'

const SKIP_WEEK = 20

function StepWhen({ onNext }: StepWhenProps) {
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )

  const [method, setMethod] = useState<Method | null>(null)
  const [dueDateInput, setDueDateInput] = useState('')
  const [weekSlider, setWeekSlider] = useState(20)
  const [conceptionMonth, setConceptionMonth] = useState('')

  const handleDueDateConfirm = () => {
    if (!dueDateInput) return
    setDueDate(dueDateInput)
    onNext()
  }

  const handleWeekConfirm = () => {
    setManualWeekOverride(weekSlider)
    onNext()
  }

  const handleConceptionConfirm = () => {
    if (!conceptionMonth) return
    setDueDate(calculateEddFromConception(conceptionMonth))
    onNext()
  }

  const handleSkip = () => {
    setManualWeekOverride(SKIP_WEEK)
    onNext()
  }

  return (
    <div className="flex h-full flex-col justify-between p-6">
      <div className="flex flex-col gap-4 pt-12">
        <h1 className="text-2xl font-bold">מתי אתם צפויים להיפגש?</h1>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => setMethod('due_date')}
            className={`rounded-xl border p-4 text-right ${
              method === 'due_date'
                ? 'border-accent'
                : 'border-neutral-700 bg-neutral-900'
            }`}
          >
            תאריך לידה משוער
          </button>
          {method === 'due_date' && (
            <div className="flex flex-col gap-3 rounded-xl bg-neutral-900 p-4">
              <input
                type="date"
                value={dueDateInput}
                onChange={(e) => setDueDateInput(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-4 text-lg text-neutral-100 focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={handleDueDateConfirm}
                disabled={!dueDateInput}
                className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950 disabled:opacity-40"
              >
                אישור
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMethod('current_week')}
            className={`rounded-xl border p-4 text-right ${
              method === 'current_week'
                ? 'border-accent'
                : 'border-neutral-700 bg-neutral-900'
            }`}
          >
            שבוע נוכחי
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
              <button
                type="button"
                onClick={handleWeekConfirm}
                className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950"
              >
                אישור
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMethod('conception')}
            className={`rounded-xl border p-4 text-right ${
              method === 'conception'
                ? 'border-accent'
                : 'border-neutral-700 bg-neutral-900'
            }`}
          >
            תאריך כניסה להריון
          </button>
          {method === 'conception' && (
            <div className="flex flex-col gap-3 rounded-xl bg-neutral-900 p-4">
              <input
                type="month"
                value={conceptionMonth}
                onChange={(e) => setConceptionMonth(e.target.value)}
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-4 text-lg text-neutral-100 focus:border-accent focus:outline-none"
              />
              <button
                type="button"
                onClick={handleConceptionConfirm}
                disabled={!conceptionMonth}
                className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950 disabled:opacity-40"
              >
                אישור
              </button>
            </div>
          )}
        </div>

        <p className="text-sm text-neutral-400">
          לא חייב עכשיו — אפשר להוסיף אחר כך
        </p>
      </div>

      <button
        type="button"
        onClick={handleSkip}
        className="w-full rounded-xl border border-neutral-700 p-4 text-neutral-300"
      >
        אשאל אותה ואעדכן מאוחר יותר
      </button>
    </div>
  )
}

export default StepWhen
