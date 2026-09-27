export type Tone = 'bro' | 'tachles' | 'deep' | 'doctor'

export interface Appointment {
  date: string
  time: string
  location: string
  status: 'scheduled' | 'done'
}

export interface UserState {
  tone: Tone
  is_first_baby: boolean
  due_date: string | null
  manual_week_override: number | null
  completed_action_ids: string[]
  onboarding_completed: boolean
  notification_preference: boolean
  revealedWeeks: number[]
  completedTasks: string[]
  plannedEvents: string[]
  currentTaskIndex: number
  appointments: Record<string, Appointment>
}
