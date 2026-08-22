import type {
  Action,
  Fact,
  RedFlag,
  ToneVariants,
  WeekOverview,
  WowFact,
} from '../types/content'
import type { Tone } from '../types/user'
import {
  week18Actions,
  week18DailyLine,
  week18Experience,
  week18Facts,
  week18Next,
  week18Overview,
  week18RedFlag,
  week18Wow,
} from '../content/week18'
import { sizeComparisons } from '../content/sizeComparisons'

export interface WeekContent {
  overview: WeekOverview
  facts: Fact[]
  experience: Fact
  actions: Action[]
  wow: WowFact
  next: Fact
  redFlag: RedFlag
  dailyLine: ToneVariants
  banner: string | null
}

const FULL_CONTENT_WEEK = 18
const COMING_SOON_BANNER = 'תוכן מלא מגיע בקרוב'

export function useWeekContent(week: number, _tone: Tone): WeekContent {
  if (week === FULL_CONTENT_WEEK) {
    return {
      overview: week18Overview,
      facts: week18Facts,
      experience: week18Experience,
      actions: week18Actions,
      wow: week18Wow,
      next: week18Next,
      redFlag: week18RedFlag,
      dailyLine: week18DailyLine,
      banner: null,
    }
  }

  const sizeComparison =
    sizeComparisons.find((comparison) => comparison.week === week) ??
    sizeComparisons.find((comparison) => comparison.week === FULL_CONTENT_WEEK)!

  const overview: WeekOverview = {
    ...week18Overview,
    week,
    size_item: sizeComparison.size_item,
    size_punchline: sizeComparison.size_punchline,
    size_value: sizeComparison.size_value,
    size_display: sizeComparison.size_display,
    emoji: sizeComparison.emoji,
  }

  return {
    overview,
    facts: week18Facts,
    experience: week18Experience,
    actions: week18Actions,
    wow: week18Wow,
    next: week18Next,
    redFlag: week18RedFlag,
    dailyLine: week18DailyLine,
    banner: COMING_SOON_BANNER,
  }
}
