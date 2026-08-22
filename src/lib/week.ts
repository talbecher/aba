const TOTAL_WEEKS = 40
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000
const DEFAULT_WEEK = 20
const CONCEPTION_TO_DUE_DAYS = 280

function clampWeek(week: number): number {
  return Math.min(TOTAL_WEEKS, Math.max(1, week))
}

export function getDueWeek(
  dueDate: string | null,
  manualWeekOverride: number | null,
): number {
  if (dueDate) {
    const due = new Date(dueDate)
    if (!Number.isNaN(due.getTime())) {
      const weeksUntilDue = Math.floor(
        (due.getTime() - Date.now()) / MS_PER_WEEK,
      )
      return clampWeek(TOTAL_WEEKS - weeksUntilDue)
    }
  }

  if (manualWeekOverride !== null) {
    return clampWeek(manualWeekOverride)
  }

  return DEFAULT_WEEK
}

export function calculateEddFromConception(conceptionMonth: string): string {
  const [year, month] = conceptionMonth.split('-').map(Number)
  const conceptionDate = new Date(year, month - 1, 1)
  const edd = new Date(
    conceptionDate.getTime() + CONCEPTION_TO_DUE_DAYS * 24 * 60 * 60 * 1000,
  )
  return edd.toISOString().slice(0, 10)
}
