import { useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { getDueWeek } from '../lib/week'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const TOTAL_WEEKS = 40

type Method = 'edd' | 'lmp' | 'manual'

interface WeekSourceSettingsProps {
  onSaved: () => void
}

function formatFullDate(date: Date): string {
  const d = String(date.getDate()).padStart(2, '0')
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const y = date.getFullYear()
  return `${d}.${m}.${y}`
}

function WeekSourceSettings({ onSaved }: WeekSourceSettingsProps) {
  const dueDate = useUserStore((state) => state.due_date)
  const lmpDate = useUserStore((state) => state.lmp_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  const manualDayOverride = useUserStore((state) => state.manual_day_override)
  const setDueDate = useUserStore((state) => state.setDueDate)
  const setLmpDate = useUserStore((state) => state.setLmpDate)
  const setManualWeekOverride = useUserStore((state) => state.setManualWeekOverride)
  const setManualDayOverride = useUserStore((state) => state.setManualDayOverride)

  const [method, setMethod] = useState<Method>(
    dueDate ? 'edd' : lmpDate ? 'lmp' : 'manual',
  )
  const [eddInput, setEddInput] = useState(dueDate ?? '')
  const [lmpInput, setLmpInput] = useState(lmpDate ?? '')
  const [weekInput, setWeekInput] = useState(manualWeekOverride ?? 20)
  const [dayInput, setDayInput] = useState(manualDayOverride ?? 1)

  const eddPreviewWeek = eddInput ? getDueWeek(eddInput, null) : null

  const lmpPreview = (() => {
    if (!lmpInput) return null
    const lmp = new Date(lmpInput)
    if (Number.isNaN(lmp.getTime())) return null

    const edd = new Date(lmp.getTime() + 280 * MS_PER_DAY)

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const lmpMidnight = new Date(lmp)
    lmpMidnight.setHours(0, 0, 0, 0)
    const daysSince = Math.floor((today.getTime() - lmpMidnight.getTime()) / MS_PER_DAY)
    const week = Math.min(TOTAL_WEEKS, Math.max(1, Math.floor(daysSince / 7) + 1))

    return { edd, week }
  })()

  const canSave =
    (method === 'edd' && !!eddInput) ||
    (method === 'lmp' && !!lmpInput) ||
    method === 'manual'

  const handleSave = () => {
    if (method === 'edd') {
      if (!eddInput) return
      setDueDate(eddInput)
    } else if (method === 'lmp') {
      if (!lmpInput) return
      setLmpDate(lmpInput)
    } else {
      setManualWeekOverride(weekInput)
      setManualDayOverride(dayInput)
    }
    onSaved()
  }

  const methodLabel: Record<Method, string> = {
    edd: 'תאריך לידה משוער (EDD)',
    lmp: 'תאריך וסת אחרונה — הכי מדויק',
    manual: 'אני יודע את השבוע והיום',
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">איך לחשב את השבוע</h2>

      <div className="flex flex-col gap-2">
        {(['edd', 'lmp', 'manual'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            style={{ minHeight: 44 }}
            className={`rounded-xl border p-3 text-right text-sm font-semibold ${
              method === m
                ? 'border-accent text-accent'
                : 'border-neutral-700 text-neutral-400'
            }`}
          >
            {method === m ? '◉' : '○'} {methodLabel[m]}
          </button>
        ))}
      </div>

      {method === 'edd' && (
        <div className="flex flex-col gap-2">
          <input
            type="date"
            dir="ltr"
            value={eddInput}
            onChange={(e) => setEddInput(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />
          {eddPreviewWeek !== null && (
            <p className="text-sm text-neutral-400">שבוע משוער כיום: {eddPreviewWeek}</p>
          )}
        </div>
      )}

      {method === 'lmp' && (
        <div className="flex flex-col gap-2">
          <input
            type="date"
            dir="ltr"
            value={lmpInput}
            onChange={(e) => setLmpInput(e.target.value)}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 p-3 text-neutral-100 focus:border-accent focus:outline-none"
          />
          {lmpPreview && (
            <p className="text-sm text-neutral-400">
              תאריך לידה משוער: {formatFullDate(lmpPreview.edd)} · שבוע נוכחי: {lmpPreview.week}
            </p>
          )}
        </div>
      )}

      {method === 'manual' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="text-center text-lg font-semibold text-accent">
              שבוע {weekInput}
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={weekInput}
              onChange={(e) => setWeekInput(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-center text-sm text-neutral-400">יום {dayInput} בשבוע</div>
            <input
              type="range"
              min={1}
              max={7}
              value={dayInput}
              onChange={(e) => setDayInput(Number(e.target.value))}
              className="w-full accent-accent"
            />
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={handleSave}
        disabled={!canSave}
        style={{ minHeight: 44 }}
        className="w-full rounded-xl bg-accent p-3 font-semibold text-neutral-950 disabled:opacity-40"
      >
        שמור
      </button>
    </div>
  )
}

export default WeekSourceSettings
