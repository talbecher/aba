const MS_PER_DAY = 24 * 60 * 60 * 1000
const TOTAL_DAYS = 280

function clampDay(day: number): number {
  return Math.min(TOTAL_DAYS, Math.max(1, day))
}

export function getBotanDay(
  dueDate: string | null,
  manualWeekOverride: number | null,
): number | null {
  if (dueDate) {
    const due = new Date(dueDate)
    if (!Number.isNaN(due.getTime())) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      due.setHours(0, 0, 0, 0)
      const daysUntilDue = Math.round((due.getTime() - today.getTime()) / MS_PER_DAY)
      return clampDay(TOTAL_DAYS - daysUntilDue)
    }
  }

  if (manualWeekOverride !== null) {
    return clampDay((manualWeekOverride - 1) * 7 + 4)
  }

  return null
}
