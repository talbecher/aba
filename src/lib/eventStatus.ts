import type { Appointment } from '../types/user'

export type AppointmentStatus =
  | 'not_yet'
  | 'to_schedule'
  | 'scheduled'
  | 'soon'
  | 'done'

const MS_PER_DAY = 24 * 60 * 60 * 1000
const NOT_YET_THRESHOLD_DAYS = 21
const SOON_THRESHOLD_DAYS = 7

export function getAppointmentStatus(
  eventDateForWeek: Date,
  appointment: Appointment | undefined,
): AppointmentStatus {
  if (appointment?.status === 'done') return 'done'

  if (appointment) {
    const apptDateTime = new Date(`${appointment.date}T${appointment.time || '00:00'}`)
    const daysUntilAppt = Math.ceil(
      (apptDateTime.getTime() - Date.now()) / MS_PER_DAY,
    )
    return daysUntilAppt <= SOON_THRESHOLD_DAYS ? 'soon' : 'scheduled'
  }

  const daysUntilEvent = Math.ceil(
    (eventDateForWeek.getTime() - Date.now()) / MS_PER_DAY,
  )
  return daysUntilEvent > NOT_YET_THRESHOLD_DAYS ? 'not_yet' : 'to_schedule'
}
