import { useNavigate } from 'react-router-dom'
import { useCurrentWeek } from '../../hooks/useCurrentWeek'
import { useUserStore } from '../../store/useUserStore'
import { sizeComparisons } from '../../content/sizeComparisons'

interface Milestone {
  emoji: string
  title: string
}

const MILESTONES: Record<number, Milestone> = {
  1: { emoji: '', title: 'הריון מתחיל' },
  12: { emoji: '🎉', title: 'סוף טרימסטר ראשון' },
  20: { emoji: '🩺', title: 'סקירת מחצית' },
  28: { emoji: '🎈', title: 'טרימסטר שלישי' },
  36: { emoji: '🏥', title: 'להתכונן ללידה' },
  40: { emoji: '👶', title: 'יום הלידה' },
}

const WEEKS = Array.from({ length: 40 }, (_, i) => i + 1)

function TimelineScreen() {
  const navigate = useNavigate()
  const currentWeek = useCurrentWeek()
  const setManualWeekOverride = useUserStore(
    (state) => state.setManualWeekOverride,
  )

  const handleSelectWeek = (week: number) => {
    setManualWeekOverride(week)
    navigate('/home')
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[390px] bg-white pb-24 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="p-4">
        <h1 className="text-xl font-bold">📅 הדרך</h1>
      </header>

      <div className="flex flex-col gap-2 px-4">
        {WEEKS.map((week) => {
          const milestone = MILESTONES[week]
          const isCurrent = week === currentWeek
          const isPast = week < currentWeek
          const opacityClass = isPast && !isCurrent ? 'opacity-40' : ''

          if (milestone) {
            return (
              <button
                key={week}
                type="button"
                onClick={() => handleSelectWeek(week)}
                className={`flex items-center gap-3 rounded-2xl border-2 p-4 text-right ${opacityClass} ${
                  isCurrent
                    ? 'border-accent bg-accent/10'
                    : 'border-neutral-700 bg-neutral-900'
                }`}
              >
                {milestone.emoji && (
                  <span className="text-2xl">{milestone.emoji}</span>
                )}
                <span className="flex flex-col">
                  <span
                    className={`text-xs ${isCurrent ? 'text-accent' : 'text-neutral-400'}`}
                  >
                    שבוע {week}
                  </span>
                  <span className="text-base font-bold">{milestone.title}</span>
                </span>
              </button>
            )
          }

          const sizeItem =
            sizeComparisons.find((c) => c.week === week)?.size_item ?? ''

          return (
            <button
              key={week}
              type="button"
              onClick={() => handleSelectWeek(week)}
              className={`flex items-center justify-between rounded-xl border px-3 py-2 text-sm ${opacityClass} ${
                isCurrent
                  ? 'border-accent bg-accent/10'
                  : 'border-neutral-800 bg-neutral-900'
              }`}
            >
              <span
                className={isCurrent ? 'font-bold text-accent' : 'text-neutral-400'}
              >
                שבוע {week}
              </span>
              <span className={isCurrent ? 'font-semibold' : ''}>
                {sizeItem}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TimelineScreen
