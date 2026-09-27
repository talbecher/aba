import type { Appointment } from '../types/user'
import type { AppointmentStatus } from '../lib/eventStatus'

interface AppointmentStatusBadgeProps {
  status: AppointmentStatus
  appointment?: Appointment
}

const MS_PER_DAY = 24 * 60 * 60 * 1000

function formatShortDate(dateStr: string): string {
  const [, m, d] = dateStr.split('-')
  return `${d}.${m}`
}

function AppointmentStatusBadge({ status, appointment }: AppointmentStatusBadgeProps) {
  if (status === 'not_yet') return null

  if (status === 'done') {
    return (
      <span
        className="w-fit text-[11px] font-semibold"
        style={{ color: 'var(--color-success)' }}
      >
        ✓ בוצע
      </span>
    )
  }

  if (status === 'to_schedule') {
    return (
      <span
        className="w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: '#f97316' }}
      >
        צריך לקבוע
      </span>
    )
  }

  if (status === 'soon' && appointment) {
    const apptDate = new Date(`${appointment.date}T${appointment.time || '00:00'}`)
    const daysUntil = Math.max(
      0,
      Math.ceil((apptDate.getTime() - Date.now()) / MS_PER_DAY),
    )
    const label =
      daysUntil === 0 ? 'היום' : daysUntil === 1 ? 'מחר' : `בעוד ${daysUntil} ימים`
    return (
      <span
        className="w-fit animate-pulse rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ backgroundColor: 'rgba(249,115,22,0.12)', color: '#f97316' }}
      >
        {label}
      </span>
    )
  }

  if (status === 'scheduled' && appointment) {
    return (
      <span
        className="w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold"
        style={{ backgroundColor: 'rgba(59,130,246,0.12)', color: 'var(--color-info)' }}
      >
        {formatShortDate(appointment.date)}
      </span>
    )
  }

  return null
}

export default AppointmentStatusBadge
