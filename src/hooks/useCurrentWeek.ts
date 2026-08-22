import { getDueWeek } from '../lib/week'
import { useUserStore } from '../store/useUserStore'

export function useCurrentWeek(): number {
  const dueDate = useUserStore((state) => state.due_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  return getDueWeek(dueDate, manualWeekOverride)
}
