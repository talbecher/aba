import { getDueWeek, resolveDueDateInput } from '../lib/week'
import { useUserStore } from '../store/useUserStore'

export function useCurrentWeek(): number {
  const dueDate = useUserStore((state) => state.due_date)
  const lmpDate = useUserStore((state) => state.lmp_date)
  const manualWeekOverride = useUserStore((state) => state.manual_week_override)
  return getDueWeek(resolveDueDateInput(dueDate, lmpDate), manualWeekOverride)
}
