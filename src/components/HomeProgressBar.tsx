const TOTAL_WEEKS = 40

function getTrimester(week: number): 1 | 2 | 3 {
  if (week <= 13) return 1
  if (week <= 27) return 2
  return 3
}

interface HomeProgressBarProps {
  week: number
}

function HomeProgressBar({ week }: HomeProgressBarProps) {
  const clampedWeek = Math.min(TOTAL_WEEKS, Math.max(1, week))
  const percent = Math.round((clampedWeek / TOTAL_WEEKS) * 100)
  const trimester = getTrimester(clampedWeek)
  const remaining = TOTAL_WEEKS - clampedWeek

  return (
    <div className="flex flex-col justify-center gap-2 px-5 py-4">
      <div
        className="h-[6px] w-full overflow-hidden rounded-full"
        style={{ backgroundColor: 'var(--bg-elevated)' }}
      >
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="text-[12px] text-[var(--text-secondary)]">
        שבוע {clampedWeek} מתוך {TOTAL_WEEKS} · טרימסטר {trimester} · נותרו{' '}
        {remaining} שבועות
      </p>
    </div>
  )
}

export default HomeProgressBar
