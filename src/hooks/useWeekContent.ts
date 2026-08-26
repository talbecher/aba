import type { WeekData, WeekOverview } from '../types/content'
import { allWeeks } from '../content/week-content-all'
import { sizeComparisons } from '../content/sizeComparisons'

export interface WeekContent {
  week: number
  overview: WeekOverview
  data: WeekData
}

const TOTAL_WEEKS = 40
const FALLBACK_SIZE_WEEK = 18

export function useWeekContent(week: number): WeekContent {
  const clampedWeek = Math.min(TOTAL_WEEKS, Math.max(1, week))
  const data = allWeeks[clampedWeek]

  const sizeComparison =
    sizeComparisons.find((comparison) => comparison.week === clampedWeek) ??
    sizeComparisons.find(
      (comparison) => comparison.week === FALLBACK_SIZE_WEEK,
    )!

  const overview: WeekOverview = {
    week: clampedWeek,
    size_item: sizeComparison.size_item,
    size_punchline: sizeComparison.size_punchline,
    size_value: sizeComparison.size_value,
    size_display: sizeComparison.size_display,
    emoji: sizeComparison.emoji,
    severity: data.severity,
  }

  return { week: clampedWeek, overview, data }
}
