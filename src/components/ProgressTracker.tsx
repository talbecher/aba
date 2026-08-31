const TOTAL_WEEKS = 40
const MILESTONE_WEEKS = [12, 20, 24, 28, 36, 40] as const

const MILESTONE_LABELS: Record<number, string> = {
  12: 'סוף טרימסטר 1',
  20: 'סקירת מחצית',
  24: 'סוכר הריון',
  28: 'טרימסטר 3',
  36: 'בדיקת GBS',
  40: 'תאריך לידה משוער',
}

type MilestoneStatus = 'passed' | 'next' | 'future'

function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1
  if (week <= 27) return 2
  return 3
}

interface ProgressTrackerProps {
  week: number
}

function ProgressTracker({ week }: ProgressTrackerProps) {
  const clampedWeek = Math.min(TOTAL_WEEKS, Math.max(1, week))
  const percent = Math.round((clampedWeek / TOTAL_WEEKS) * 100)
  const remaining = TOTAL_WEEKS - clampedWeek
  const trimester = getTrimester(clampedWeek)
  const nextMilestone =
    MILESTONE_WEEKS.find((m) => m >= clampedWeek) ?? null

  return (
    <section
      className="flex flex-col gap-4 rounded-2xl p-4"
      style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-[40px] font-black leading-none text-accent">
          {percent}%
        </p>
        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-[3px]">
        {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((w) => {
          const isCurrent = w === clampedWeek
          const isPast = w < clampedWeek
          return (
            <span
              key={w}
              title={`שבוע ${w}`}
              className="rounded-full"
              style={{
                width: isCurrent ? 8 : 6,
                height: isCurrent ? 8 : 6,
                backgroundColor:
                  isCurrent || isPast ? 'var(--accent)' : 'var(--bg-elevated)',
                opacity: isCurrent ? 1 : isPast ? 0.7 : 0.5,
                border: isCurrent ? 'none' : '1px solid var(--border)',
              }}
            />
          )
        })}
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div
          className="flex flex-col items-center gap-1 rounded-xl p-3"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <p className="text-[20px] font-bold text-accent">{clampedWeek}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">שבוע</p>
        </div>
        <div
          className="flex flex-col items-center gap-1 rounded-xl p-3"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <p className="text-[20px] font-bold text-accent">{remaining}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">נותרו</p>
        </div>
        <div
          className="flex flex-col items-center gap-1 rounded-xl p-3"
          style={{ backgroundColor: 'var(--bg-elevated)' }}
        >
          <p className="text-[20px] font-bold text-accent">{trimester}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">טרימסטר</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {MILESTONE_WEEKS.map((m) => {
          const status: MilestoneStatus =
            m < clampedWeek ? 'passed' : m === nextMilestone ? 'next' : 'future'
          const marker =
            status === 'passed' ? '✓' : status === 'next' ? '→' : ''

          return (
            <div
              key={m}
              className="flex items-center justify-between rounded-lg px-3 py-2"
              style={{
                backgroundColor:
                  status === 'next' ? 'var(--accent-dim)' : 'transparent',
                opacity: status === 'future' ? 0.5 : 1,
              }}
            >
              <span
                className="text-sm font-medium"
                style={{
                  color: status === 'next' ? 'var(--accent)' : 'var(--text)',
                }}
              >
                שבוע {m} — {MILESTONE_LABELS[m]}
              </span>
              <span
                className="text-sm font-bold"
                style={{
                  color:
                    status === 'future' ? 'var(--text-muted)' : 'var(--accent)',
                }}
              >
                {marker}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default ProgressTracker
